// pages/_app.tsx
import '../app/globals.css' // Global styles
import Layout from '../components/Layout' // Import your layout component
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
