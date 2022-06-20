import Head from 'next/head'

function Meta({ description, title }) {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <title>{title}</title>
    </Head>
  )
}

export default Meta
