import mailchimp from '@mailchimp/mailchimp_marketing'

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER // e.g. us1
})

const handler = async (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  try {
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: 'subscribed'
    })

    return res.status(201).json({ error: '', status: 'success' })
  } catch (error) {
    if (error.message == 'Bad Request') {
      return res.status(500).json({ error: 'This e-mail already subscribed.' })
    } else {
      return res.status(500).json({ error: error.message || error.toString() })
    }
  }
}

export default handler
