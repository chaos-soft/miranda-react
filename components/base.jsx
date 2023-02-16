import Head from 'next/head'

export default function Base ({ title, ...props }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>{title || 'Miranda'}</title>
      </Head>
      {props.children}
    </>
  )
}
