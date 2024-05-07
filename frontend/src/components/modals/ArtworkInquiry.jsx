import * as React from 'react'

import { Modal } from '~/components/Modal'
import { RichText } from '~/components/RichText'
import { InputTextBox } from '~/components/form/textbox'
import { InputCheckBox, InputText } from '~/components/form/input'

import { DEFAULT_INQUIRE_FORM_TEXT } from '~/utils/constants'
import { sendInquiryMail, sendInquiryReplyMail } from '~/utils/mail'

const getInitialValue = artwork => {
  let initialMessage = "Hello, \nI'm interested in artwork."
  if (artwork) {
    if (artwork.title) {
      initialMessage = initialMessage.replace('artwork', `"${artwork.title}"`)
    }
    if (artwork.artists?.length > 0) {
      const artistStr = artwork.artists.map(artist => artist.title).join(', ')
      initialMessage = initialMessage.replace('.', ` by ${artistStr}.`)
    }
  }
  return { message: initialMessage }
}

export function ArtworkInquiry({ onClose, showModal, inquireForm, artwork }) {
  const { inquireReceiveMail, description, thankYouMailText } = inquireForm || {}

  const [formValues, setFormValues] = React.useState({})

  const [submitting, setSubmitting] = React.useState(false)

  React.useEffect(() => {
    setFormValues(getInitialValue(artwork))
  }, [artwork])

  const handleChange = ({ name, value }) => {
    setFormValues(prevState => ({ ...prevState, [name]: value }))
  }

  const handleClose = () => {
    setFormValues(getInitialValue(artwork))
    onClose()
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!submitting) {
      setSubmitting(true)

      if (formValues.subscribe) {
        fetch('/api/newsletter-subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formValues.email
          })
        })
          .then(res => {
            console.log('EMAIL SUBSCRIBED: ', res.json())
          })
          .catch(error => {
            console.log('ERROR WHILE SUBSCRIBING: ', error)
          })
      }
      const resInquiryMail = await sendInquiryMail({
        toMail: inquireReceiveMail,
        values: formValues,
        artwork
      })

      if (resInquiryMail.success) {
        await sendInquiryReplyMail({
          toMail: formValues.email,
          lastName: formValues.lastName,
          firstName: formValues.firstName,
          content: thankYouMailText
        })
        setFormValues({})
      }

      setSubmitting(false)
      handleClose()
    }
  }

  return (
    showModal && (
      <Modal onClose={handleClose} title="INQUIRE" wrapperClass="w-[40%] h-[88%]">
        <div className="text-style-description mb-20">
          {description ? <RichText value={description} /> : DEFAULT_INQUIRE_FORM_TEXT}
        </div>
        <form className="flex flex-col gap-20" onSubmit={handleSubmit}>
          <InputText
            name="firstName"
            placeholder="Your first name here"
            value={formValues.firstName}
            onChange={handleChange}
            label={'FIRST NAME'}
            required={true}
          />
          <InputText
            name="lastName"
            placeholder="Your last name here"
            value={formValues.lastName}
            onChange={handleChange}
            label={'LAST NAME'}
            required={true}
          />
          <InputText
            name="email"
            type="email"
            placeholder="email@domain.com"
            value={formValues.email}
            onChange={handleChange}
            label={'E-MAIL'}
            required={true}
          />
          <InputText
            name="phone"
            type="number"
            placeholder="(000) 000-0000"
            value={formValues.phone}
            onChange={handleChange}
            label={'PHONE'}
          />
          <InputTextBox
            name="message"
            value={formValues.message}
            onChange={handleChange}
            placeholder="Your message here"
            inputClass="border-accent mt-8"
          />
          <InputCheckBox
            value={formValues.subscribe}
            label="Yes, I'd like to receive Lévy Gorvy Dayan updates by email."
            name="subscribe"
            onChange={handleChange}
            wrapperClass="sm:items-start sm:w-full"
          />
          <div className="text-right">
            <button className="button button-outline" type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Form'}
            </button>
          </div>
        </form>
      </Modal>
    )
  )
}
