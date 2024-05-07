import * as React from 'react'
import useEmblaCarousel from 'embla-carousel-react'

export function CarouselThumb({ children, onClick }) {
  const options = {
    draggable: true,
    loop: true,
    breakpoints: {
      '(min-width: 1024px)': { draggable: false }
    }
  }

  const [emblaRef, embla] = useEmblaCarousel(options)

  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState([])

  const scrollPrev = React.useCallback(() => embla && embla.scrollPrev(true), [embla])
  const scrollNext = React.useCallback(() => embla && embla.scrollNext(true), [embla])

  const onSelect = React.useCallback(() => {
    if (!embla) return

    setSelectedIndex(embla.selectedScrollSnap())
  }, [embla, setSelectedIndex])

  React.useEffect(() => {
    if (!embla) return

    onSelect()
    setScrollSnaps(embla.scrollSnapList())
    embla.on('select', onSelect)
  }, [embla, setScrollSnaps, onSelect])

  return (
    <div ref={emblaRef} className="relative overflow-hidden">
      <div className="flex">
        {React.Children.map(children, (child, key) => (
          <div key={key} className="min-w-0 flex-shrink-0 flex-grow-0 basis-full">
            {child}
          </div>
        ))}
      </div>

      <div className="pointer-events-none hidden md:absolute md:inset-0 md:block">
        <button
          aria-label="Scroll to previous slide"
          className="pointer-events-auto h-full w-1/2 cursor-w-resize outline-none"
          onClick={scrollPrev}
        />

        <button
          aria-label="Scroll to next slide"
          className="pointer-events-auto h-full w-1/2 cursor-e-resize outline-none"
          onClick={scrollNext}
        />
      </div>

      <div className="absolute bottom-0 right-0 text-12">
        <span className="pt-10">
          {selectedIndex + 1}/{scrollSnaps.length}
        </span>

        <button className="pl-20 pt-10" onClick={onClick}>
          +
        </button>
      </div>
    </div>
  )
}
