/* -------------------------------------------------------------------------- */
/* Metadata                                                                    */
/* -------------------------------------------------------------------------- */

export const contactMetadata = {
  title: "Contact I'm Here Travels — Book a Tour or Get in Touch",
  description:
    "Questions about a tour? Ready to book? Reach our team via WhatsApp, Messenger, email, or phone. We're here to help you plan your next adventure.",
};

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

export const contactHero = {
  image: "/figma/join-community.jpg",
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
      href: "https://api.whatsapp.com/send?phone=639982476847",
      type: "whatsapp" as const,
      external: true,
    },
    {
      label: "Messenger",
      href: "https://www.facebook.com/profile.php?id=100089932897402",
      type: "messenger" as const,
      external: true,
    },
    {
      label: "bella@imheretravels.com",
      href: "mailto:bella@imheretravels.com",
      type: "email" as const,
    },
    {
      label: "+63 998 247 6847",
      href: "tel:+639982476847",
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
