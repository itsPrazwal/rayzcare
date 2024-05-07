import * as React from 'react'
import { Portal } from 'react-portal'
import { Image } from '~/components/Image'
import { VideoPlayer } from '~/components/VideoPlayer'
import { CarouselThumb } from '~/components/CarouselThumb'
import { Carousel } from '~/components/Carousel'
import { Modules } from '~/components/Modules'

export function ModulesThumb({ modules, module, index }) {
  const { _type, medias, image, video } = module

  const [isOpen, setIsOpen] = React.useState(false)
  const [currentIndex, setCurrentIndex] = React.useState(index)

  const onToggle = () => {
    setIsOpen(true)
    setCurrentIndex(currentIndex)
  }

  return (
    <>
      <div>
        {_type === 'moduleImage' && (
          <div>
            <Image
              src={image}
              alt={image?.caption || ''}
              width={1600}
              loading="eager"
              layout="constrained"
              sizes={'(min-width: 768px) 50vw, 100vw'}
              aspectRatio={16 / 9}
              className="rounded-2xl cursor-pointer"
              onClick={onToggle}
            />

            <div className="flex items-center justify-between text-12">
              {image?.caption && <span className="pt-10 block">{image.caption}</span>}
              <button className="ml-auto pt-10 pl-20" onClick={onToggle}>
                +
              </button>
            </div>
          </div>
        )}

        {_type === 'moduleVideo' && (
          <div>
            <VideoPlayer video={video} className="aspect-video rounded-2xl" />

            <div className="flex items-center justify-between text-12">
              {video?.caption && <span className="pt-10 block">{video.caption}</span>}
              <button className="ml-auto pt-10 pl-20" onClick={onToggle}>
                +
              </button>
            </div>
          </div>
        )}

        {_type === 'moduleSlider' && (
          <CarouselThumb onClick={onToggle}>
            {medias.map(({ _type, _key, image, video }) => (
              <div key={_key}>
                {_type === 'image' ? (
                  <div>
                    <Image
                      src={image}
                      alt={image?.caption || ''}
                      width={1600}
                      loading="eager"
                      layout="constrained"
                      sizes={'(min-width: 768px) 50vw, 100vw'}
                      aspectRatio={16 / 9}
                      className="rounded-2xl"
                    />

                    {image?.caption && (
                      <span className="mt-10 block text-12">{image.caption}</span>
                    )}
                  </div>
                ) : (
                  <div>
                    <VideoPlayer video={video} className="aspect-video rounded-2xl" />

                    {video?.caption && (
                      <span className="mt-10 block text-12">{video.caption}</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </CarouselThumb>
        )}
      </div>

      {/* TODO: How to map over nested arrays of medias? */}
      {isOpen && (
        <Portal>
          <div className="fixed inset-0 z-10 bg-white">
            <Carousel onClose={() => setIsOpen(false)} startIndex={currentIndex}>
              {modules.map(module => {
                return (
                  <React.Fragment key={module._key}>
                    <Modules type={module._type} reactModule={module} />
                  </React.Fragment>
                )
              })}
            </Carousel>
          </div>
        </Portal>
      )}
    </>
  )
}
