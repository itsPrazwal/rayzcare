import * as React from 'react'

export function NewsletterSubscribe({ listID, message: successMessage }) {
  const [inputValue, setInputValue] = React.useState({ email: '', botfield: '' })
  const [message, setMessage] = React.useState('')
  const [submitted, setSubmitted] = React.useState(false)

  const handleChange = e => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value })
  }

  const subscribe = async e => {
    e.preventDefault()

    await fetch('/api/newsletter-subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listID, ...inputValue })
    })
      .then(res => res.json())
      .then(() => {
        setSubmitted(true)
        setMessage(successMessage)
        setInputValue({ email: '', botfield: '' })
      })
      .catch(() => {
        setSubmitted(false)
        setMessage('Something went wrong. Please try again.')
      })
  }

  return (
    <div className="my-8">
      {submitted === false && (
        <form onSubmit={subscribe} className={'flex flex-col gap-5'}>
          <label aria-hidden="true" className="hidden">
            Don’t fill this out
            <input hidden type="text" name="botfield" onChange={handleChange} />
          </label>
          <label aria-hidden="true" htmlFor="email" className="hidden">
            Your Email Here
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your Email Here"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            required
            onChange={handleChange}
            className="min-w-[15rem] border-b border-white bg-transparent px-6 py-4 text-center text-caption text-white outline-none"
          />

          <button type="submit" className="text-style-subtitle text-center text-white">
            Subscribe to our newsletter
          </button>
        </form>
      )}
      {<span className="mt-1">{message}</span>}
    </div>
  )
}
