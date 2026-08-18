import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaDiscord } from 'react-icons/fa';
import { Footer } from '../components/footer';
import { Hero } from '../components/hero';
import { Spinner } from '../components/loader';
import { Navbar } from '../components/navbar';
import { authClient } from '../utils/auth-client';

export default function Login() {
	const router = useRouter();
	// where to land after signing in; defaults to the shop
	const callbackURL = typeof router.query.callbackUrl === 'string' ? router.query.callbackUrl : '/shop';

	const [email, setEmail] = useState('');
	const [sending, setSending] = useState(false);
	const [sent, setSent] = useState(false);
	const [error, setError] = useState('');

	async function sendMagicLink() {
		setError('');
		if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
			setError('Please enter a valid email address.');
			return;
		}
		setSending(true);
		const { error: err } = await authClient.signIn.magicLink({
			callbackURL: callbackURL,
			email: email
		});
		setSending(false);
		if (err) setError(err.message || 'Failed to send the sign-in email.');
		else setSent(true);
	}

	async function discordLogin() {
		setError('');
		const { error: err } = await authClient.signIn.social({
			callbackURL: callbackURL,
			provider: 'discord'
		});
		if (err) setError(err.message || 'Discord sign-in failed.');
	}

	return (
		<div>
			<Head>
				<title>Left4Craft | Log In</title>
				<meta name="title" content="Left4Craft | Log In" />
				<meta name="og:title" content="Left4Craft | Log In" />
				<meta name="twitter:title" content="Left4Craft | Log In" />
			</Head>
			<Navbar />
			<Hero title="Log In" />

			<div className="flex flex-wrap justify-center text-white text-center text-l bg-dark p-8">
				<div className="text-left w-96 relative">
					{sent ? (
						<div className="text-center">
							<p className="text-2xl font-bold">Check your email</p>
							<div className="h-4" />
							<p>
								A sign-in link has been sent to <b>{email}</b>. You can close this page.
							</p>
						</div>
					) : (
						<>
							<label htmlFor="email" className="text-white">
								Email
							</label>
							<input
								type="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								onKeyDown={(e) => e.key === 'Enter' && sendMagicLink()}
								placeholder="you@example.com"
								className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
							/>
							<div className="h-4" />
							{error !== '' && (
								<label htmlFor="magic-link" className="text-red-500">
									{error}
								</label>
							)}
							<button
								type="button"
								id="magic-link"
								disabled={sending}
								onClick={sendMagicLink}
								className="flex justify-center items-center py-2 px-4 bg-primary hover:bg-secondary text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg"
							>
								{sending ? (
									<>
										<Spinner /> <p>Sending...</p>
									</>
								) : (
									'Email me a sign-in link'
								)}
							</button>
							<div className="h-4" />
							<div className="flex items-center">
								<div className="flex-grow border-t border-light" />
								<span className="px-4 text-gray-400">or</span>
								<div className="flex-grow border-t border-light" />
							</div>
							<div className="h-4" />
							<button
								type="button"
								onClick={discordLogin}
								className="flex justify-center items-center gap-2 py-2 px-4 bg-[#5865F2] hover:opacity-90 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg"
							>
								<FaDiscord size={20} /> Continue with Discord
							</button>
						</>
					)}
				</div>
			</div>

			<Footer />
		</div>
	);
}
