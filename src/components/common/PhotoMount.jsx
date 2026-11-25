export default function PhotoMount({
  src,
  alt,
  caption,
  variant = '',
  loading = 'lazy',
  blueprint = false,
  mediaRef,
  objectPosition = 'center',
}) {
  const classes = ['photo-mount', blueprint && 'blueprint-media', variant].filter(Boolean).join(' ')

  return (
    <figure className={classes} ref={mediaRef}>
      <div className="photo-mount-inner">
        <img src={src} alt={alt} loading={loading} style={{ objectPosition }} />
      </div>
      {blueprint && (
        <span className="blueprint-corners" aria-hidden="true">
          <i className="top-left" />
          <i className="top-right" />
          <i className="bottom-left" />
          <i className="bottom-right" />
        </span>
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
