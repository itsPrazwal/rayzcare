import React from 'react'
import ReactDOM from 'react-dom'
import { twMerge } from 'tailwind-merge'

export function Modal({ onClose, children, title, wrapperClass, titleClass, bodyClass }) {
  const modalWrapperRef = React.useRef()

  const backDropHandler = React.useCallback(
    e => {
      if (!modalWrapperRef?.current?.contains(e.target)) {
        onClose()
      }
    },
    [onClose]
  )

  React.useEffect(() => {
    setTimeout(() => {
      window.addEventListener('click', backDropHandler)
    })
  }, [backDropHandler])

  React.useEffect(() => {
    return () => window.removeEventListener('click', backDropHandler)
  }, [backDropHandler])

  const handleCloseClick = e => {
    e.preventDefault()
    onClose()
  }

  const modalContent = (
    <div className="fixed left-0 top-0 z-[999] flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalWrapperRef}
        className={twMerge('h-[500px] w-[500px] sm:h-full sm:w-full', wrapperClass)}
      >
        <div className="relative h-full w-full overflow-hidden bg-white px-24 py-16 sm:px-24">
          <button onClick={handleCloseClick} className="absolute right-10 top-10">
            <svg
              width="54"
              height="54"
              viewBox="0 0 54 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="M39.1526 12.6429L40.58 14.0704L14.0706 40.5798L12.6432 39.1524L39.1526 12.6429Z"
                  fill="#1946AD"
                />
                <path
                  d="M40.3759 39.1524L38.9485 40.5798L12.439 14.0704L13.8665 12.6429L40.3759 39.1524Z"
                  fill="#1946AD"
                />
              </g>
            </svg>
          </button>
          <div className={twMerge('text-style-title h-40', titleClass)}>{title}</div>
          <div
            className={twMerge('h-[calc(100%_-_2.5rem_-_0.625rem)] overflow-auto pt-10', bodyClass)}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )

  return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'))
}
