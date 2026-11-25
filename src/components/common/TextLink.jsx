import { Link } from 'react-router-dom'
import ArrowIcon from './ArrowIcon.jsx'

export default function TextLink({ to, children, className = '' }) {
  return (
    <Link className={`text-link ${className}`} to={to}>
      {children}<ArrowIcon diagonal />
    </Link>
  )
}
