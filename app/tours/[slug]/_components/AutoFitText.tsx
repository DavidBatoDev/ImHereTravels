"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  minScale?: number;
};

export default function AutoFitText({
  children,
  className,
  as: Tag = "h1",
  minScale = 0.5,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const fit = () => {
      const wrapper = wrapperRef.current;
      const text = textRef.current;
      if (!wrapper || !text) return;
      text.style.transform = "";
      const available = wrapper.clientWidth;
      const natural = text.scrollWidth;
      if (natural > available && natural > 0) {
        const scale = Math.max(minScale, available / natural);
        text.style.transform = `scale(${scale})`;
      }
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [children, minScale]);

  return (
    <div ref={wrapperRef} className="w-full min-w-0 overflow-hidden">
      <Tag
        ref={textRef as React.RefObject<HTMLHeadingElement>}
        className={`${className ?? ""} origin-left whitespace-nowrap`}
      >
        {children}
      </Tag>
    </div>
  );
}
