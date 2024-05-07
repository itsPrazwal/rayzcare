import { useState } from 'react'

import { getGlobalMeta } from '~/queries/settings'
import { getContactForm } from '~/queries/contactForm'

import { Head } from '~/components/Head'
import { Title } from '~/components/Title'
import { Layout } from '~/components/Layout'
import { RichText } from '~/components/RichText'
import { InputTextBox } from '~/components/form/textbox'
import { Select, SelectOption } from '~/components/form/select'
import { InputCheckBox, InputText } from '~/components/form/input'

import { DEFAULT_CONTACT_FORM_TEXT } from '~/utils/constants'
import { sendContactMail, sendContactReplyMail } from '~/utils/mail'

import ausStates from '../../public/json/ausStates.json'
// import countries from '../../public/json/countries.json'

export default function ContactPage({ globalMeta, contactForm }) {
  const { contactReceiveMail, description = '', thankYouMailText } = contactForm || {}

  const [formValues, setFormValues] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const handleChange = ({ name, value }) => {
    setFormValues(prevState => ({ ...prevState, [name]: value }))
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
      const resContactMail = await sendContactMail({
        toMail: contactReceiveMail,
        values: formValues
      })

      if (resContactMail.success) {
        await sendContactReplyMail({
          toMail: formValues.email,
          lastName: formValues.lastName,
          firstName: formValues.firstName,
          content: thankYouMailText
        })
        setFormValues({})
      }

      setSubmitting(false)
    }
  }

  return (
    <Layout>
      <Head global={globalMeta} pageTitle={'Contact'} />

      <div className="flex flex-col gap-30">
        <Title>Contact</Title>

        <div className="md:mx-[5%] lg:mx-[15%]">
          <div className="text-style-description mb-20">
            {description ? <RichText value={description} /> : DEFAULT_CONTACT_FORM_TEXT}
          </div>
          <form
            className="grid w-full gap-x-20 md:grid-cols-12 lg:gap-x-40"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-20 sm:mb-20 md:col-span-6 lg:gap-28">
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
                placeholder="(000) 000-0000"
                value={formValues.phone}
                onChange={handleChange}
                label={'PHONE'}
                type="number"
                maxLength={10}
              />
            </div>
            <div className="flex flex-col gap-20 md:col-span-6 lg:gap-28">
              <InputText
                name="address1"
                placeholder="Street Address"
                value={formValues.address1}
                onChange={handleChange}
                label={'ADDRESS 1'}
              />
              <InputText
                name="address2"
                placeholder="Apt, Suite, etc."
                value={formValues.address2}
                onChange={handleChange}
                label={'ADDRESS 2'}
              />
              <InputText
                name="city"
                placeholder="City Name"
                value={formValues.city}
                onChange={handleChange}
                label={'CITY'}
              />
              <Select
                onChange={handleChange}
                name={'state'}
                label={'State'}
                placeholder="Select State"
                value={formValues.state || ''}
              >
                {Object.values(ausStates).map(state => (
                  <SelectOption value={state} key={state}>
                    {state}
                  </SelectOption>
                ))}
              </Select>
              <InputText
                name="zip"
                placeholder="12345"
                value={formValues.zip}
                onChange={handleChange}
                label={'ZIP CODE'}
                type="number"
                maxLength={5}
              />
            </div>
            <div className="mt-28 md:col-span-12">
              <label className="text-style-subtitle block w-full text-accent">Message</label>
              <InputTextBox
                name="message"
                value={formValues.message}
                onChange={handleChange}
                placeholder="Your message here"
                inputClass="border-accent mt-8"
              />
            </div>
            <div className="mt-28 flex items-center justify-between sm:flex-col sm:items-end sm:gap-20 md:col-span-12">
              <InputCheckBox
                value={formValues.subscribe}
                label="Yes, I'd like to receive Rayzcare updates by email."
                name="subscribe"
                onChange={handleChange}
                wrapperClass="sm:items-start sm:w-full"
              />
              <button className="button button-outline" type="submit" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Form'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ locale, defaultLocale }) {
  const [globalMeta, contactForm] = await Promise.all([
    getGlobalMeta({ locale, defaultLocale }),
    getContactForm({ locale, defaultLocale })
  ])

  return {
    props: {
      globalMeta,
      contactForm
    }
  }
}
