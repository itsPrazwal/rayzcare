import Link from 'next/link'
import { RichText } from '~/components/RichText'
import { toPath } from '~/utils/toPath'
import { ResponsiveVideo } from '~/components/ResponsiveVideo'

export default function HomeModuleVideo({ data }) {
  const { video, color, caption, linkInternal, linkExternal } = data

  return (
    <div className="absolute h-full w-full">
      <div className="relative h-full p-20 pt-0">
        <div className="relative h-full w-full">
          {video && (
            <ResponsiveVideo
              video={video}
              containerClassName="h-full w-full"
              className="h-full w-full object-cover"
            />
          )}
          {caption && (
            <h3
              className="text-style-condensed_title absolute inset-x-0 bottom-0 z-10 flex flex-wrap justify-center gap-x-10 px-20 py-40 text-center"
              style={{ color: color?.hex || 'white' }}
            >
              <RichText value={caption} />
            </h3>
          )}
          {linkInternal ? (
            <Link
              href={toPath(linkInternal._type, linkInternal.slug?.current)}
              className="absolute inset-0 z-30"
            />
          ) : (
            linkExternal && (
              <a
                href={linkExternal}
                className="absolute inset-0 z-30"
                target="_blank"
                rel="noopener"
              />
            )
          )}
        </div>
      </div>
    </div>
  )
}
