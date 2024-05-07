import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { twMerge } from 'tailwind-merge'

export function SelectOption(props) {
  return (
    <div
      className={clsx(twMerge('flex w-full items-center px-6', props.className), {
        'text-accent': props.selected,
        'text-gray-300': props.disabled,
        'hover:text-accent': !props.disabled
      })}
      onClick={() => !props.disabled && props.handleChange(props.value)}
    >
      {props.children}
    </div>
  )
}

export function Select({
  children,
  value,
  name,
  label,
  onChange,
  closeOnSelect = true,
  placeholder = '',
  className = ''
}) {
  const [showDropdown, setShowDropdown] = React.useState(false)
  const [selectedLabel, setSelectedLabel] = React.useState(placeholder || 'select')

  const handleChange = React.useCallback(
    value => {
      onChange({ name, value })
      closeOnSelect && setShowDropdown(false)
    },
    [closeOnSelect, name, onChange]
  )

  const childrenWithProps = React.useMemo(
    () =>
      React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            handleChange,
            selected: child.props.value === value
          })
        }
        return child
      }),
    [children, value, handleChange]
  )

  React.useEffect(() => {
    if (value) {
      React.Children.forEach(children, child => {
        if (child.props.value === value) {
          setSelectedLabel(child.props.children)
        }
      })
    } else {
      setSelectedLabel(placeholder || 'select')
    }
  }, [children, value, placeholder])

  return (
    <div className="flex flex-row items-start gap-12 sm:flex-col-reverse sm:items-start sm:gap-6 lg:gap-16">
      <label
        htmlFor={`inputText_${name}`}
        className="text-style-subtitle w-[35%] text-right text-accent sm:w-full sm:text-left lg:w-[30%]"
      >
        {label}
      </label>
      <div
        className={`relative w-[65%] cursor-pointer select-none border-b border-accent pb-4 sm:w-full lg:w-[70%] ${className}`}
      >
        <div
          className="text-style-description min-h-12 flex w-full cursor-pointer items-center justify-between gap-4 decoration-1 underline-offset-text sm:appearance-none"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span className={selectedLabel === placeholder && 'text-gray-400'}>{selectedLabel}</span>
          <svg
            width="13"
            height="8"
            viewBox="0 0 13 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L6.5 6.5L12 1" stroke="#1946AD" />
          </svg>
        </div>
        <div
          className={`z-10 ${
            showDropdown ? 'visible' : 'hidden'
          } absolute left-0 top-24 flex max-h-[200px] w-full flex-col gap-6 overflow-x-auto bg-white`}
        >
          {childrenWithProps}
        </div>
      </div>
    </div>
  )
}

SelectOption.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  className: PropTypes.string
}

Select.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  closeOnSelect: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string
}
