export default function RevealBlock({
  as: Element = 'div',
  className = '',
  delay = 0,
  style,
  children,
  ...props
}) {
  return (
    <Element
      className={`reveal-block${className ? ` ${className}` : ''}`}
      style={{ ...style, '--reveal-delay': `${delay}ms` }}
      {...props}
    >
      {children}
    </Element>
  )
}
