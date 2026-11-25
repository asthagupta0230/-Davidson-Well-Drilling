import { Link } from 'react-router-dom'

export default function Button({ to, href, variant = 'button-dark', className = '', children, ...props }) {
  const classes = `button ${variant}${className ? ` ${className}` : ''}`

  if (to) return <Link className={classes} to={to} {...props}>{children}</Link>
  if (href) return <a className={classes} href={href} {...props}>{children}</a>
  return <button className={classes} {...props}>{children}</button>
}
