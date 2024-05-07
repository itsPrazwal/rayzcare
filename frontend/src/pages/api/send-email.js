import { createTransport } from 'nodemailer'

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
    pass: process.env.NEXT_PUBLIC_NODEMAILER_PW
  }
})

const handler = (req, res) => {
  if (req.method === 'POST' && req.body.from) {
    transporter.sendMail(req.body, (err, info) => {
      if (err) {
        res.status(404).json(err)
      } else {
        res.status(250).json(info)
      }
    })
  }
}

export default handler
