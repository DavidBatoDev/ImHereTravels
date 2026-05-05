/* -------------------------------------------------------------------------- */
/* Metadata                                                                    */
/* -------------------------------------------------------------------------- */

export const personalizedToursMetadata = {
  title: "Personalized Tour | I'm Here Travels",
  description:
    "Create your own adventure with I'm Here Travels. Tell us your dream destination, dates, and travel style and our team will craft a personalized proposal just for you.",
};

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

export const personalizedToursHero = {
  image: "/figma/dest-philippines-sunset.jpg",
  title: "Personalized Tour",
};

/* -------------------------------------------------------------------------- */
/* Form                                                                        */
/* -------------------------------------------------------------------------- */

export const personalizedToursForm = {
  heading: "Create your own adventure",
  body:
    "Looking for something different? You can use our wireframes as a guide or create your own dream itinerary with us, every step of the way. Explore the world like no one else and we'll help you plan your next unique adventure.",
  fields: {
    destination: {
      label: "Where's your dream destination? *",
      placeholder: "Place *",
    },
    travelDate: {
      label: "When do you like to go? *",
      placeholder: "DD MMMM YYYY",
    },
    tripLength: {
      label: "How long? (Minimum 3 nights) *",
      placeholder: "Eg. 5 nights, or 1 week",
    },
    travellers: {
      label: "How many are traveling? (Minimum 4 people) *",
      placeholder: "10",
    },
    budgetPerPerson: {
      label: "What's your preferred budget per person?",
      placeholder: "40,000",
    },
    tourVision: {
      label: "How do you imagine your tour? *",
      placeholder:
        "Got any must-haves for your ideal itinerary? How about your accommodation style preferences or any special interests your group has?",
      helper:
        "If there's a trip on our website that caught your eye, just drop us the name or link! Or, if you've got your own itinerary in mind, email us. Our team will team up with you and your group to whip up a proposal that suits you perfectly.",
    },
    firstName: { label: "First name *", placeholder: "First name *" },
    lastName: { label: "Last name *", placeholder: "Last name *" },
    country: { label: "Country of residence *", placeholder: "Select Country *" },
    email: { label: "Email address *", placeholder: "Email *" },
  },
  contactDetailsHeading: "Contact Details",
  nameHeading: "Name (as seen on passport)",
  privacyCheckbox: "By checking this, you agree with our privacy policy *",
  subscribeCheckbox:
    "Stay up to date on the latest news, deals and tours. Give us a little check mark if you're up for it!",
  submitLabel: "Submit",
};

/* -------------------------------------------------------------------------- */
/* Countries                                                                   */
/* -------------------------------------------------------------------------- */

export const personalizedToursCountries: ReadonlyArray<{
  value: string;
  label: string;
}> = [
  { value: "AU", label: "Australia" },
  { value: "CA", label: "Canada" },
  { value: "PH", label: "Philippines" },
  { value: "SG", label: "Singapore" },
  { value: "GB", label: "United Kingdom" },
  { value: "US", label: "United States" },
  { value: "NZ", label: "New Zealand" },
  { value: "other", label: "Other" },
];
