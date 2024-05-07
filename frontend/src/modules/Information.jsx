import * as React from 'react'
import { Title } from '~/components/Title'
import { ToggleIcon } from '~/components/Icons'
import { RichText } from '~/components/RichText'
import { m, AnimatePresence } from 'framer-motion'
import Slider from '~/modules/Slider'
import clsx from 'clsx'

export default function Information({ data, key }) {
  const { title, modules } = data

  const [open, setOpen] = React.useState({})

  function toggleOpen(key) {
    setOpen({ ...open, [key]: !open[key] })
  }

  const accordionMotion = {
    open: {
      height: 'auto',
      transition: { duration: 0.5, ease: [0.3, 1.0, 0.3, 1.0] }
    },
    closed: {
      height: 0,
      transition: { duration: 0.5, ease: [0.3, 1.0, 0.3, 1.0] }
    }
  }

  return (
    <div className="grid gap-20" key={key}>
      {title && <Title>{title}</Title>}
      <div className="grid md:grid-cols-12">
        {modules?.length > 0 &&
          modules.map(({ _key, title, body, modules }) => (
            <div key={_key} className="md:col-span-10 md:col-start-2">
              <button
                className="flex w-full items-baseline justify-start py-1 text-accent"
                onClick={() => toggleOpen(_key)}
              >
                <div className="text-left uppercase">{title}</div>
                <div
                  className={clsx('ml-10 h-[0.85em] w-[0.85em] flex-[0_0_0.85em]', {
                    'rotate-45': open[_key]
                  })}
                >
                  <ToggleIcon />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {open[_key] && (
                  <m.div
                    variants={accordionMotion}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="text-style-normal rich-text overflow-hidden leading-tight"
                  >
                    <div className="space-y-40 pb-20 pt-10">
                      <div>
                        <RichText value={body} />
                      </div>
                      {modules?.length && (
                        <div className="grid grid-cols-1 gap-40 gap-y-40 md:grid-cols-2">
                          {modules.map(module => {
                            if (module._type == 'moduleSlider') {
                              return (
                                <Slider key={module._key} className="col-span-2" data={module} />
                              )
                            }
                            if (module._type == 'moduleText') {
                              return (
                                <div
                                  key={module._key}
                                  className={clsx("info-submodule", {
                                    'col-span-2 md:col-span-4': module.body.find(
                                      el => el.listItem === 'bullet'
                                    )
                                  })}
                                >
                                  <RichText value={module.body} />
                                </div>
                              )
                            }
                          })}
                        </div>
                      )}
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          ))}
      </div>
    </div>
  )
}
