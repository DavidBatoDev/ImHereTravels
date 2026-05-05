/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

export const whyUsHero = {
  image: "/figma/dest-philippines-sunrise.jpg",
  title: "Be here with us",
  cta: { label: "View Tours", href: "/tours" },
};

/* -------------------------------------------------------------------------- */
/* Intro                                                                       */
/* -------------------------------------------------------------------------- */

export const whyUsIntro = {
  heading: "Why choose I'm Here Travels?",
  body: "We're all about real connections with a focus in small group tours that are anything but ordinary. From handpicked accommodations to off-the-beaten-path excursions, we go above and beyond to create personalized adventures that are as unique as you are.",
};

/* -------------------------------------------------------------------------- */
/* Destinations section                                                        */
/* -------------------------------------------------------------------------- */

export const whyUsDestinationsSection = {
  heading: "Your next destination",
};

/* -------------------------------------------------------------------------- */
/* Reviews                                                                     */
/* -------------------------------------------------------------------------- */

export const whyUsReviewsSection = {
  heading: "What people say about us",
  readAll: "Read All Reviews",
};

export const whyUsReviews = [
  {
    stars: 5,
    date: "June 2023",
    quote:
      "It was very well organized, a good busy pace. The guides were very competent and took care of everyone and were well informed and articulate.",
    author: "Konstantin",
    tour: "Siargao Island Adventure",
    avatar: "/figma/avatar-manuel.png",
  },
  {
    stars: 5,
    date: "February 2024",
    quote:
      "An incredible experience from start to finish. The team made everything seamless and the destinations were absolutely breathtaking.",
    author: "Maria",
    tour: "Philippines Sunset Tour",
    avatar: "/figma/avatar-bella.png",
  },
  {
    stars: 5,
    date: "July 2024",
    quote:
      "Best travel experience I've ever had. Small group vibes, amazing guides, and destinations I never would have found on my own.",
    author: "James",
    tour: "Maldives Bucketlist",
    avatar: "/figma/avatar-flynn.png",
  },
];

/* -------------------------------------------------------------------------- */
/* FAQs                                                                        */
/* -------------------------------------------------------------------------- */

export const whyUsFaqsSection = {
  heading: "Philippines FAQs",
};

export const whyUsFaqs = [
  {
    q: "What is the age range of the tour?",
    a: "Our tours are open to travellers 18 and above. Some activities may have specific age or fitness requirements — please contact us for details before booking.",
  },
  {
    q: "How many people are in a group?",
    a: "We keep our groups small — typically between 10 and 20 people — to ensure a personal, social travel experience.",
  },
  {
    q: "What's included in the tour price?",
    a: "Most meals, accommodation, transport, and guided activities are included. A detailed itinerary breakdown is provided on each tour page.",
  },
  {
    q: "Can I join the tour solo?",
    a: "Absolutely! Many of our travellers join solo and leave with lifelong friends. Our small-group format is perfect for solo adventurers.",
  },
];

/* -------------------------------------------------------------------------- */
/* CTA                                                                         */
/* -------------------------------------------------------------------------- */

export const whyUsCta = {
  heading: "Have more questions?",
  body: "Let us help you, we've got your back!",
  button: { label: "Contact Us", href: "/contact-us" },
};

/* -------------------------------------------------------------------------- */
/* Instagram                                                                   */
/* -------------------------------------------------------------------------- */

export const whyUsInstagram = {
  handle: "@Imheretravels",
  profileUrl: "https://www.instagram.com/imheretravels/",
  images: Array.from({ length: 10 }).map((_, i) => ({
    src: `/tours/philippine-sunrise/community-${i + 1}.jpg`,
    alt: `I'm Here Travels community photo ${i + 1}`,
  })),
};

/* -------------------------------------------------------------------------- */
/* Newsletter                                                                  */
/* -------------------------------------------------------------------------- */

export const whyUsNewsletter = {
  heading: "Join our community",
  body: "Stay up to date on the latest news, deals and tours when you sign up.",
  image: "/figma/join-community.jpg",
  inputPlaceholder: "Enter your email",
  button: "Submit",
  privacyLabel: "By submitting you agree with our",
  privacyLink: "Privacy Policy",
};
