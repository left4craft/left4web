import '../styles/globals.css'
import { Provider } from 'next-auth/client'

// use nextauth provider for faster performance
function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
