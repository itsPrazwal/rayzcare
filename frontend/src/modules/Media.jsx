import * as React from 'react'
import { Image } from '~/components/Image'
import { VideoPlayer } from '~/components/VideoPlayer'
import { Tag } from '~/components/Tag'

export default function Media({ data }) {
  const { medias, layout } = data

  return (
    <>
      {medias.map(({ _type, _key, image, video }) => (
        <React.Fragment key={_key}>
          {_type === 'image' ? (
            <div className="relative h-screen w-full">
              <Image
                src={image}
                alt={image?.caption || ''}
                background={false}
                sizes="100vw"
                className={`h-full w-full ${
                  layout === 'centered' ? '!object-contain' : '!object-cover'
                }`}
              />

              {image?.copyright && (
                <div className="absolute bottom-0 left-0 p-20">
                  <Tag isDashed>© {image.copyright}</Tag>
                </div>
              )}
            </div>
          ) : (
            <div className="relative h-screen w-full">
              <VideoPlayer video={video} className="aspect-video rounded-2xl" />

              {video?.copyright && (
                <div className="absolute bottom-0 left-0 p-20">
                  <Tag isDashed>© {video.copyright}</Tag>
                </div>
              )}
            </div>
          )}
        </React.Fragment>
      ))}
    </>
  )
}
