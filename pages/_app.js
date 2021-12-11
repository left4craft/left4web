/* eslint-disable react/prop-types */
import { SessionProvider } from 'next-auth/react';
import 'tailwindcss/tailwind.css';


export default function App({
	Component,
	pageProps: {
		session, ...pageProps
	}
}) {
	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />
		</SessionProvider>
	);
}

