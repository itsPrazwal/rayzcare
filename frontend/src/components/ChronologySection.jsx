import clsx from 'clsx'
import { Element } from 'react-scroll'
import { ChronologyModules } from '~/components/ChronologyModules'
import { formatYearDate } from '~/utils/formatDate'

export function ChronologySection({ module }) {
  return (
    module.modules?.length > 0 && (
      <Element
        name={`section-${formatYearDate(module.dateStart, module.dateEnd)}`}
        className="chronology-section w-full"
      >
        <div
          className={clsx(
            'grid w-full grid-cols-1 items-start gap-y-20 pt-20 md:min-h-[calc(100vh_-_var(--breadcrumb-height)_-_var(--header-height)_-_2rem)]',
            {
              'md:grid-cols-9': true || module.modulesSecondary,
              'md:grid-cols-1': false && !module.modulesSecondary
            }
          )}
        >
          {module.modules && (
            <div className="top-[calc(var(--breadcrumb-height)_+_var(--header-height)_+_2.5rem)] order-2 flex w-full flex-col gap-20 md:sticky md:order-3 md:col-span-4">
              <ChronologyModules modules={module.modules} className="chronology" />
            </div>
          )}
          <div className="text-style-title top-[calc(var(--breadcrumb-height)_+_var(--header-height)_+_2.5rem)] z-10 order-1 flex w-full -translate-y-[0.3em] text-left text-accent md:sticky md:top-[calc(var(--breadcrumb-height)_+_var(--header-height)_+_1.3rem_+_1.2rem)] md:order-2 md:col-span-1 md:justify-center md:text-center">
            {formatYearDate(module.dateStart)}
            <span className="lowercase">s</span>
          </div>
          <div className="top-[calc(var(--breadcrumb-height)_+_var(--header-height)_+_2.5rem)] order-3 flex w-full flex-col gap-20 md:sticky md:order-1 md:col-span-4">
            {module.modulesSecondary && (
              <ChronologyModules modules={module.modulesSecondary} className="chronology" />
            )}
          </div>
        </div>
      </Element>
    )
  )
}
