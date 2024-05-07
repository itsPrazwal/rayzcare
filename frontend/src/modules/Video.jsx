import { RichText } from '~/components/RichText'
import { VideoPlayer } from '~/components/VideoPlayer'

export default function ModuleVideo({ data, key }) {
  const { video, caption } = data

  return (
    <div className="flex w-full flex-col" key={key}>
      <VideoPlayer video={video} playInView={true} />
      {caption && (
        <div className="text-style-caption mt-4">
          <RichText value={caption} />
        </div>
      )}
    </div>
  )
}
