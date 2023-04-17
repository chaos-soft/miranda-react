import Link from 'next/link'

const isProd = process.env.NODE_ENV === 'production'

export default function Index () {
  return (
    <>
      {isProd &&
        <>
          <a href='main.html'>Main</a>
          {' '}
          <a href='2b.html'>2B</a>
          {' '}
          <a href='jill.html'>Jill</a>
          {' '}
          <a href='stream.html'>Stream</a>
        </>}
      {!isProd &&
        <>
          <Link href='main'>Main</Link>
          {' '}
          <Link href='2b'>2B</Link>
          {' '}
          <Link href='jill'>Jill</Link>
          {' '}
          <Link href='stream'>Stream</Link>
        </>}
    </>
  )
}
