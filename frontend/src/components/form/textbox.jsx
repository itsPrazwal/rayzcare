import { twMerge } from 'tailwind-merge'

export function InputTextBox({ name, value, onChange, placeholder, inputClass, rows = 4 }) {
  const handleChange = ({ target: { value } }) => {
    onChange({ name, value })
  }

  return (
    <textarea
      name={name}
      placeholder={placeholder}
      className={twMerge(
        'text-style-description w-full resize-none border px-12 py-8 outline-none',
        inputClass
      )}
      rows={rows}
      value={value || ''}
      onChange={handleChange}
    />
  )
}
