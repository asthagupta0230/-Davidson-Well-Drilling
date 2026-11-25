import { Link } from 'react-router-dom'

export default function Brand() {
  return (
    <Link className="brand" to="/" aria-label="Davidson Well Drilling home">
      <span className="brand-copy">
        <span className="brand-name">Davidson</span>
        <span className="brand-descriptor">Well Drilling, Inc.</span>
      </span>
    </Link>
  )
}
