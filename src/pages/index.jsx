import { Link } from 'react-router-dom'

export default function Index () {
  return (
    <>
      <Link to='/main'>Main</Link>
      {' '}
      <Link to='/jill'>Jill</Link>
      {' '}
      <Link to='/stream'>Stream</Link>
    </>
  )
}
