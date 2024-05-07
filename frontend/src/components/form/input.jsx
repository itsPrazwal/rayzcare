import { twMerge } from 'tailwind-merge'

export function InputText({
  label,
  name,
  placeholder,
  value,
  onChange,
  inputClass,
  required,
  type = 'text',
  maxLength
}) {
  function handleChange({ target: { name, value } }) {
    if (type === 'number' && value && !/^\d+$/.test(value)) {
      return
    }

    onChange({ name, value })
  }

  return (
    <div className="flex flex-row items-center gap-12 sm:flex-col-reverse sm:items-start sm:gap-6 lg:gap-16">
      <label
        htmlFor={`inputText_${name}`}
        className="text-style-subtitle w-[35%] text-right text-accent sm:w-full sm:text-left lg:w-[30%]"
      >
        {label}
        {required && ' *'}
      </label>
      <input
        required={required}
        id={`inputText_${name}`}
        type={type === 'number' ? 'text' : type}
        name={name}
        placeholder={placeholder}
        value={value || ''}
        onChange={handleChange}
        maxLength={maxLength}
        className={twMerge(
          'w-[65%] border-b border-accent pb-4 text-caption text-black font-light outline-none sm:w-full lg:w-[70%]',
          inputClass
        )}
      />
    </div>
  )
}

export function InputCheckBox({ label, name, inputClass, wrapperClass, onChange, value }) {
  const handleChange = ({ target: { checked } }) => {
    onChange({ name, value: checked })
  }

  return (
    <div className={twMerge('flex items-center gap-10', wrapperClass)}>
      <input
        name={name}
        type="checkbox"
        id={`inputCheckbox_${name}`}
        className={twMerge(
          'h-16 w-16 cursor-pointer border border-accent accent-accent outline-none',
          inputClass
        )}
        checked={value}
        onChange={handleChange}
      />
      <label
        htmlFor={`inputCheckbox_${name}`}
        className="text-style-description cursor-pointer select-none"
      >
        {label}
      </label>
    </div>
  )
}
