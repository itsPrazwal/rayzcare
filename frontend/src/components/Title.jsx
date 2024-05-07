import { twMerge } from 'tailwind-merge'

export function Title({ renderAs: As = 'h2', children, className, ...props }) {
  const BASE_STYLE = 'text-style-title'

  return (
    <As {...props} className={twMerge(BASE_STYLE, className)}>
      {children}
    </As>
  )
}
