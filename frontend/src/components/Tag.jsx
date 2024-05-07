import { twMerge } from 'tailwind-merge'

/*
 * We use the twMerge function to merge our base style
 * with any additional classes passed in as props without styling conflicts.
 * Read more here: https://github.com/dcastil/tailwind-merge/blob/v1.9.1/docs/what-is-it-for.md
 */

export function Tag({ children, isDashed = false, isActive = false, className, ...props }) {
  const BASE_STYLE =
    'flex w-min whitespace-nowrap rounded-md border border-black bg-white px-12 py-9 text-12 uppercase'

  const BORDER_STYLE = isDashed ? 'border-dashed' : 'border-solid hover:bg-black hover:text-white'

  const ACTIVE_STYLE = isActive ? 'bg-black text-[0.75rem] text-white' : ''

  return (
    <span {...props} className={twMerge(BASE_STYLE, BORDER_STYLE, ACTIVE_STYLE, className)}>
      {children}
    </span>
  )
}
