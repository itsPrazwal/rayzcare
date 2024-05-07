import * as React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useKeyPressEvent } from 'react-use'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

export function Carousel({ children, autoplay = false, className }) {
  const carouselOptions = { loop: true }

  const autoplayPlugin = React.useRef(Autoplay({ delay: 5000 }))

  const [emblaRef, embla] = useEmblaCarousel(
    carouselOptions,
    autoplay ? [autoplayPlugin.current] : []
  )

  const [emblaReady, setEmblaReady] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState([])

  const scrollPrev = React.useCallback(() => embla && embla.scrollPrev(), [embla])
  const scrollNext = React.useCallback(() => embla && embla.scrollNext(), [embla])

  useKeyPressEvent('ArrowLeft', scrollPrev)
  useKeyPressEvent('ArrowRight', scrollNext)

  const clearTransform = React.useCallback(() => {
    if (!className.includes('fade') || !embla) return

    embla.internalEngine().translate.toggleActive(false)
    embla.internalEngine().translate.clear()
  }, [className, embla])

  const onSelect = React.useCallback(() => {
    if (!embla) return

    setSelectedIndex(embla.selectedScrollSnap())
    // console.log(embla.slideNodes()[embla.selectedScrollSnap()])
    embla.containerNode().style.height = embla.slideNodes()[embla.selectedScrollSnap()].offsetHeight + 'px'
  }, [embla, setSelectedIndex])

  React.useEffect(() => {
    if (!embla) return

    embla.on('select', onSelect)
    embla.on('resize', onSelect)
    embla.on('resize', () => {
      setEmblaReady(false)

      setEmblaReady(() => {
        embla.reInit()
        clearTransform()
        return true
      })
    })

    clearTransform()
    setEmblaReady(true)
    setScrollSnaps(embla.scrollSnapList())
    onSelect()
    embla.on('select', onSelect)
  }, [embla, setScrollSnaps, onSelect, clearTransform])

  return (
    <div
      ref={emblaRef}
      className={clsx(twMerge(className, 'relative overflow-hidden'), {
        'slider--is-ready': emblaReady
      })}
    >
      <div className="slider__container flex h-full w-full">
        {React.Children.map(children, (child, key) => (
          <div
            key={key}
            className="slider__slide min-w-0 flex-shrink-0 flex-grow-0 basis-full"
            data-selected={selectedIndex === key}
          >
            {child}
          </div>
        ))}
      </div>
      <div className="pointer-events-none z-10 hidden md:absolute md:inset-0 md:block">
        <button
          aria-label="Go to previous slide"
          className="arrow-left pointer-events-auto absolute inset-y-0 left-0 h-full w-1/2 cursor-w-resize uppercase outline-none"
          onClick={scrollPrev}
        />

        <button
          aria-label="Go to next slide"
          className="arrow-right pointer-events-auto absolute inset-y-0 right-0 h-full w-1/2 cursor-e-resize uppercase outline-none"
          onClick={scrollNext}
        />
      </div>
    </div>
  )
}
