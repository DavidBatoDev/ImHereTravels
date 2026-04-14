$ErrorActionPreference = "Stop"

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$dataDir = Join-Path $repoRoot "data"
$imagesRoot = Join-Path $repoRoot "public\images"

$usedOutputPath = Join-Path $PSScriptRoot "used-public-images-from-data-ts.txt"
$unusedOutputPath = Join-Path $PSScriptRoot "unused-public-images-from-data-ts.txt"
$missingOutputPath = Join-Path $PSScriptRoot "missing-public-image-refs-from-data-ts.txt"
$externalOutputPath = Join-Path $PSScriptRoot "external-image-refs-from-data-ts.txt"

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

function Write-Lines([string]$path, [string[]]$lines) {
  [System.IO.File]::WriteAllLines($path, $lines, $utf8NoBom)
}

function Normalize-Ref([string]$value) {
  if ([string]::IsNullOrWhiteSpace($value)) {
    return $null
  }

  $trimmed = $value.Trim()
  $noHash = $trimmed.Split("#")[0]
  $noQuery = $noHash.Split("?")[0]

  try {
    return [System.Uri]::UnescapeDataString($noQuery)
  }
  catch {
    return $noQuery
  }
}

function To-ImageRef([string]$absolutePath, [string]$imagesRootPath) {
  $relative = $absolutePath.Substring($imagesRootPath.Length).TrimStart("\", "/")
  return "/images/" + ($relative -replace "\\", "/")
}

$allPublicSet = New-Object System.Collections.Generic.HashSet[string] ([System.StringComparer]::OrdinalIgnoreCase)
$usedSet = New-Object System.Collections.Generic.HashSet[string] ([System.StringComparer]::OrdinalIgnoreCase)
$missingSet = New-Object System.Collections.Generic.HashSet[string] ([System.StringComparer]::OrdinalIgnoreCase)
$externalSet = New-Object System.Collections.Generic.HashSet[string] ([System.StringComparer]::OrdinalIgnoreCase)

Get-ChildItem -Path $imagesRoot -Recurse -File | ForEach-Object {
  [void]$allPublicSet.Add((To-ImageRef -absolutePath $_.FullName -imagesRootPath $imagesRoot))
}

function Register-LocalRef([string]$localRef) {
  if ([string]::IsNullOrWhiteSpace($localRef)) {
    return
  }

  $normalized = Normalize-Ref $localRef
  if ([string]::IsNullOrWhiteSpace($normalized)) {
    return
  }

  if (-not $normalized.StartsWith("/images/", [System.StringComparison]::OrdinalIgnoreCase)) {
    return
  }

  $normalized = "/" + $normalized.TrimStart("/")
  $normalized = $normalized -replace "\\", "/"

  if ($allPublicSet.Contains($normalized)) {
    [void]$usedSet.Add($normalized)
  }
  else {
    [void]$missingSet.Add($normalized)
  }
}

$localRefRegex = [regex]'(?i)/images/[^\s"''`)<>,]+'
$urlRegex = [regex]'(?i)https?://[^\s"''`)<>,]+\.(?:png|jpe?g|webp|svg|gif|avif|bmp|ico|tiff?|jfif)(?:\?[^\s"''`)<>,#]*)?(?:#[^\s"''`)<>,]*)?'

$dataFiles = Get-ChildItem -Path $dataDir -File -Filter "*.ts" | Sort-Object Name

foreach ($file in $dataFiles) {
  $content = [System.IO.File]::ReadAllText($file.FullName)

  foreach ($match in $localRefRegex.Matches($content)) {
    Register-LocalRef $match.Value
  }

  foreach ($match in $urlRegex.Matches($content)) {
    $rawUrl = $match.Value
    $normalizedUrl = Normalize-Ref $rawUrl

    if ([string]::IsNullOrWhiteSpace($normalizedUrl)) {
      continue
    }

    try {
      $uri = [System.Uri]$normalizedUrl
    }
    catch {
      [void]$externalSet.Add($rawUrl)
      continue
    }

    $uriHost = $uri.Host.ToLowerInvariant()
    $path = $uri.AbsolutePath
    $mappedLocal = $null

    if ($uriHost -like "*.imheretravels.com" -or $uriHost -eq "imheretravels.com") {
      if ($path.StartsWith("/wp-content/uploads/", [System.StringComparison]::OrdinalIgnoreCase)) {
        $mappedLocal = "/images" + $path
      }
    }
    elseif ($uriHost -like "*.wp.com") {
      if ($path.StartsWith("/imheretravels.com/wp-content/uploads/", [System.StringComparison]::OrdinalIgnoreCase)) {
        $mappedLocal = "/images" + $path.Substring("/imheretravels.com".Length)
      }
    }

    if ($null -ne $mappedLocal) {
      Register-LocalRef $mappedLocal
      continue
    }

    [void]$externalSet.Add($rawUrl)
  }
}

$used = @($usedSet) | Sort-Object
$unused = @($allPublicSet | Where-Object { -not $usedSet.Contains($_) } | Sort-Object)
$missing = @($missingSet) | Sort-Object
$external = @($externalSet) | Sort-Object

Write-Lines -path $usedOutputPath -lines $used
Write-Lines -path $unusedOutputPath -lines $unused
Write-Lines -path $missingOutputPath -lines $missing
Write-Lines -path $externalOutputPath -lines $external

Write-Output "Scanned TS files: $($dataFiles.Count)"
Write-Output "Used public/images refs: $($used.Count)"
Write-Output "Unused public/images files: $($unused.Count)"
Write-Output "Missing /images refs from data TS: $($missing.Count)"
Write-Output "External image refs in data TS: $($external.Count)"