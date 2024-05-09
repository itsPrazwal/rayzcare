import { sendEmail } from '~/lib/sendMail'
import {
  BCC_CONTACT_MAIL,
  COMPANY_TITLE,
  DEFAULT_CONTACT_RECEIVE_MAIL,
  DEFAULT_CONTACT_THANK_YOU_MAIL,
  DEFAULT_INQUIRE_RECEIVE_MAIL,
  DEFAULT_INQUIRE_THANK_YOU_MAIL
} from '~/utils/constants'

function sendContactMail({ toMail, values }) {
  return sendEmail({
    from: `${COMPANY_TITLE} - Website - Contact <donotreply@rayzscare.com.au>`,
    to: toMail || DEFAULT_CONTACT_RECEIVE_MAIL,
    bcc: BCC_CONTACT_MAIL,
    subject: `CONTACT MESSAGE FROM - ${values.firstName} ${values.lastName}`,
    html: `
          <h3>Contact Details:</h3>
          <ul>
            <li><b>Full Name: </b>${values.firstName} ${values.lastName}</li>
            <li><b>Phone: </b>${values.phone || '-'}</li>
            <li><b>Email: </b>${values.email}</li>
          </ul>
          <h3>Address:</h3>
          <ul>
            <li>
              <b>Address1: </b>${values.address1 || '-'}
            </li>
            <li>
              <b>Address2: </b>${values.address2 || '-'}
            </li>
            <li>
              <b>City: </b>${values.city || '-'}
            </li>
            <li>
              <b>State: </b>${values.state || '-'}
            </li>
            <li>
              <b>Zip: </b>${values.zip || '-'}
            </li>
          </ul>
          <h3>Message</h3>
          <p>${values.message || '-'}</p>
          <h3>Subscribe - ${values.subscribe ? 'YES' : 'NO'}</h3>
        `
  })
}

function sendContactReplyMail({ toMail, firstName, lastName, content }) {
  return sendEmail({
    from: `${COMPANY_TITLE} <donotreply@rayzscare.com.au>`,
    to: toMail,
    subject: 'Acknowledgement of received contact message',
    html: `
      <p>Dear ${firstName} ${lastName},</p>
      <p class="margin: 10px 0;">${content || DEFAULT_CONTACT_THANK_YOU_MAIL}</p>
      <p>Best Regards,</p>
      <p>Lévy Gorvy Dayan</p>
    `
  })
}

function sendInquiryReplyMail({ toMail, firstName, lastName, content }) {
  return sendEmail({
    from: `${COMPANY_TITLE} <donotreply@rayzscare.com.au>`,
    to: toMail,
    subject: 'Acknowledgement of received inquiry',
    html: `
      <p>Dear ${firstName} ${lastName},</p>
      <p class="margin: 10px 0;">${content || DEFAULT_INQUIRE_THANK_YOU_MAIL}</p>
      <p>Best Regards,</p>
      <p>Lévy Gorvy Dayan team</p>
    `
  })
}

function sendInquiryMail({ toMail, values, artwork }) {
  return sendEmail({
    from: `${COMPANY_TITLE} - Website - inquire <donotreply@rayzscare.com.au>`,
    to: toMail || DEFAULT_INQUIRE_RECEIVE_MAIL,
    bcc: BCC_CONTACT_MAIL,
    subject: `INQUIRY FROM - ${values.firstName} ${values.lastName}`,
    html: `
          <h3>Artwork Details:</h3>
          <ul>
            <li><b>Title: </b>${artwork.title}</li>
            <li><b>Slug: </b>${artwork.slug}</li>
          </ul>
          <h3>Contact Details:</h3>
          <ul>
            <li><b>Full Name: </b>${values.firstName} ${values.lastName}</li>
            <li><b>Email: </b>${values.email}</li>
            <li><b>Phone: </b>${values.phone}</li>
          </ul>
          <h3>Message</h3>
          <p>${values.message || '-'}</p>
          <h3>Subscribe - ${values.subscribe ? 'YES' : 'NO'}</h3>
        `
  })
}

export { sendContactMail, sendContactReplyMail, sendInquiryMail, sendInquiryReplyMail }
