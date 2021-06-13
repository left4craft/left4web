/* eslint-disable react/prop-types */
import { Provider } from 'next-auth/client';
import 'tailwindcss/tailwind.css';

// use nextauth provider for faster performance
function App({
	Component, pageProps
}) {
	return (
		<Provider session={pageProps.session}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default App;
