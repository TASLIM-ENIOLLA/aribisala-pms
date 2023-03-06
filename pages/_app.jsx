import Head from 'next/head'
import { Fragment } from 'react'
import { useRouter } from 'next/router'

import '../public/css/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title>Ari PMS</title>
      </Head>
      <Component {...pageProps} router = {useRouter()} />
    </Fragment>
  )
}
