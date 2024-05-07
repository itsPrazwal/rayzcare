import dayjs from 'dayjs'
import * as React from 'react'

import { ResponsiveImage } from '~/components/ResponsiveImage'
import { ArtworkInquiry } from '~/components/modals/ArtworkInquiry'

import { formatFraction } from '~/utils/formatFraction'

export function ArtworkCard({ artwork, inquireForm }) {
  const { title, image, dateCreation, artists, description, dateDisplay, allowInquire } = artwork

  const [showInquiryForm, setShowInquiryForm] = React.useState(false)

  const descriptionArr =
    description?.length > 0 &&
    description.reduce((acc = [], curr) => {
      if (curr.children?.length > 0) {
        curr.children.forEach(child => {
          child.text?.split('\n').forEach(item => {
            acc.push(item)
          })
        })
      }
      return acc
    }, [])

  return (
    <>
      <li className="group relative">
        {image?.asset?._ref ? (
          <div className="relative flex aspect-[1/1] items-center justify-center">
            <ResponsiveImage
              src={image}
              alt={title}
              widthDesktop={500}
              widthMobile={300}
              // aspectRatio={1 / 1}
              containerClassName="h-full w-full"
              className="object-contain object-left-bottom"
            />
          </div>
        ) : (
          <div className="flex aspect-[1/1] items-center justify-center" />
        )}
        <ul className="text-style-caption mt-5">
          {artists?.length > 0 && <li>{artists.map(artist => artist.title).join(', ')}</li>}
          <li>
            <span className="italic">{title && title.replaceAll(' x ', ' × ')}</span>
            {title && (dateDisplay || dateCreation) && ', '}
            {dateDisplay || (dateCreation && dayjs(dateCreation).get('year'))}
          </li>
          {descriptionArr &&
            descriptionArr.map((text, i) => (
              <li key={`artwork_description_${i}`} className="font-display-local">
                {formatFraction(text.replaceAll(' x ', ' × '))}
              </li>
            ))}
        </ul>
        {allowInquire && (
          <button
            className="button button-outline mt-10"
            onClick={() => {
              setShowInquiryForm(true)
            }}
          >
            inquire
          </button>
        )}
      </li>
      <ArtworkInquiry
        onClose={() => setShowInquiryForm(false)}
        showModal={showInquiryForm}
        artwork={artwork}
        inquireForm={inquireForm}
      />
    </>
  )
}
