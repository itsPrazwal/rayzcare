export default {
  title: "Inquire Form",
  name: "inquireForm",
  type: "document",
  fields: [
    {
      title: 'Inquire Form Text',
      name: 'description',
      type: 'localeBody',
    },
    {
      title: 'Inquire Receive Mail',
      name: 'inquireReceiveMail',
      type: 'email'
    },
    {
      title: 'Thank You Mail Text',
      name: 'thankYouMailText',
      type: 'string',
    }
  ],
};
