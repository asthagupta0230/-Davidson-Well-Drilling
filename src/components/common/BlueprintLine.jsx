export default function BlueprintLine({ className = '', delay = 0 }) {
  return (
    <span
      className={`blueprint-line${className ? ` ${className}` : ''}`}
      style={{ '--reveal-delay': `${delay}ms` }}
      aria-hidden="true"
    />
  )
}
