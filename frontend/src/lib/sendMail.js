export const sendEmail = async ({ from, to, subject, text, html, bcc, cc, sender }) => {
  return new Promise(resolve => {
    fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, from, text, html, bcc, cc, sender })
    })
      .then(info => {
        resolve({ success: true, data: info.json() })
      })
      .catch(error => {
        resolve({ success: false, error })
      })
  })
}
