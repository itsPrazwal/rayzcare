import { twMerge } from 'tailwind-merge'
import { RichText } from './RichText'
import { formatDate } from '~/utils/formatDate'

export function PressItem({ press, className }) {
  const { title, date, publisher, url, file } = press

  return (
    <li className={twMerge('text-style-description group relative', className)}>
      {publisher && <div className="italic">{publisher}</div>}
      {title && (
        <div>
          <RichText value={title} />
        </div>
      )}
      {date && <div>{formatDate(date)}</div>}
      {(file || url) && (
        <a
          href={file || url}
          target="_blank"
          rel="noopener noreferrer"
          className="z-1 absolute inset-0"
        ></a>
      )}
    </li>
  )
}
