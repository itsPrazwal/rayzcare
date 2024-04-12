export default {
  title: "Contact Form",
  name: "contactForm",
  type: "document",
  fields: [
    {
      title: 'Contact Form Text',
      name: 'description',
      type: 'localeBody',
    },
    {
      title: 'Contact Receive Mail',
      name: 'contactReceiveMail',
      type: 'email'
    },
    {
      title: 'Thank You Mail Text',
      name: 'thankYouMailText',
      type: 'string',
    }
  ],
};
