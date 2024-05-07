export function PublicationInfo({ artist, title, year, price, composition, dimensions, isbn }) {
  const listStyle = 'flex gap-12'

  return (
    <div className="text-style-caption text-description">
      <dl className="space-y-5">
        {artist && (
          <div className={listStyle}>
            <dt className="uppercase">Artist</dt>
            <dd>{artist}</dd>
          </div>
        )}

        {title && (
          <div className={listStyle}>
            <dt className="uppercase">Title</dt>
            <dd>{title}</dd>
          </div>
        )}

        {year && (
          <div className={listStyle}>
            <dt className="uppercase">Year</dt>
            <dd>{year}</dd>
          </div>
        )}

        {price && (
          <div className={listStyle}>
            <dt className="uppercase">Price</dt>
            <dd>{price}</dd>
          </div>
        )}

        {composition && (
          <div className={listStyle}>
            <dt className="uppercase">Composition</dt>
            <dd>{composition}</dd>
          </div>
        )}

        {dimensions && (
          <div className={listStyle}>
            <dt className="uppercase">Dimensions</dt>
            <dd>{dimensions.replaceAll(' x ', ' × ')}</dd>
          </div>
        )}

        {isbn && (
          <div className={listStyle}>
            <dt className="uppercase">ISBN</dt>
            <dd>{isbn}</dd>
          </div>
        )}
      </dl>
    </div>
  )
}
