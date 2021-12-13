/* eslint-disable react/prop-types */
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout';
import 'tailwindcss/tailwind.css';


export default function App({
	Component,
	pageProps: {
		session, ...pageProps
	}
}) {
	return (
		<SessionProvider session={session}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SessionProvider>
	);
}

