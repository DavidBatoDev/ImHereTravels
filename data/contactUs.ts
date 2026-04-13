/* -------------------------------------------------------------------------- */
/* Metadata                                                                    */
/* -------------------------------------------------------------------------- */

export const contactMetadata = {
  title: "Contact Us | I'm Here Travels",
  description:
    "Get in touch with I'm Here Travels. Send us a message or reach out via WhatsApp, Telegram, Viber, or email.",
};

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

export const contactHero = {
  image:
    "https://www.figma.com/api/mcp/asset/6b7ef215-120b-4a94-a76b-c6487505b36e",
  title: "We're here for you",
};

/* -------------------------------------------------------------------------- */
/* Contact Form                                                                */
/* -------------------------------------------------------------------------- */

export const contactForm = {
  heading: "How can we help?",
  fields: {
    firstName: "First name *",
    lastName: "Last name *",
    email: "Email *",
    phone: "Phone number *",
    message: "Message *",
  },
  checkboxes: [
    "Keep me updated on the latest news, deals and trips. You can unsubscribe at any time.",
    "By checking this, you accept our privacy policy *",
  ],
  submitLabel: "Submit",
};

/* -------------------------------------------------------------------------- */
/* Contact Links                                                               */
/* -------------------------------------------------------------------------- */

export const contactLinks = {
  heading: "Get in touch",
  items: [
    {
      label: "Whatsapp",
      href: "#whatsapp",
      type: "whatsapp" as const,
    },
    {
      label: "Telegram",
      href: "#telegram",
      type: "telegram" as const,
    },
    {
      label: "Viber",
      href: "#viber",
      type: "viber" as const,
    },
    {
      label: "sales@imheretravels.com",
      href: "mailto:sales@imheretravels.com",
      type: "email" as const,
    },
    {
      label: "+63 917 000 0000",
      href: "tel:+639170000000",
      type: "phone" as const,
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* FAQ CTA                                                                     */
/* -------------------------------------------------------------------------- */

export const contactFaqCta = {
  heading: "Read our FAQs",
  body: "Check out our FAQ's as we might already have the answer",
  button: { label: "View FAQ", href: "/faqs" },
};
