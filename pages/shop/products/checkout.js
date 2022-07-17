import Head from 'next/head';
import Image from 'next/image';
import {
	signIn, signOut, useSession
} from 'next-auth/react';
import { Profile } from '../../../components/profile';
import { Navbar } from '../../../components/navbar';
import { Hero } from '../../../components/hero';
import { Footer } from '../../../components/footer';
import Link from 'next/link';
import {
	useState,
	useEffect
} from 'react';
import {
	getCookie, hasCookie
} from 'cookies-next';
import { Spinner } from '../../../components/loader';
import Cart from '../../../components/cart';

export default function Shop() {
	const {
		data: session, loading
	} = useSession();

	// initialize the state to {} to ensure unhydrated page renders the same on the client and server
	const [cart,
		setCart] = useState('{}');

	// when the page is hydrated, then load the cookies
	useEffect(() => {
		if(hasCookie('cart')) setCart(getCookie('cart'));
	}, []);

	const [canCheckout,
		setCheckout] = useState(false);
	const [validating,
		setValidating] = useState(false);
	const [mcErrorMessage,
		setMcErrormessage] = useState('');
	const [uuid,
		setUUID] = useState('Minecraft UUID');

	const [box1,
		setBox1] = useState(false);
	const [box2,
		setBox2] = useState(false);

	const [stripeErrorMessage,
		setStripeErrorMessage] = useState('');
	const [stripeLoading,
		setStripeLoading] = useState(false);

	if(loading) {
		return <>
			<Head>
				<title>Left4Craft | Subscribe</title>
				<meta name="title" content="Left4Craft | Subscribe" />
				<meta name="og:title" content="Left4Craft | Subscribe" />
				<meta name="twitter:title" content="Left4Craft | Subscribe" />
			</Head>
			<Navbar />
			<Profile loading={loading} session={session} signIn={signIn} signOut={signOut} />

			<Hero title='Shop' />

			<div className="text-white text-center text-4xl bg-dark font-bold">
				<div className="h-8" />
				<h2>Checkout</h2>
			</div>
			<div className="text-white text-center text-l bg-dark p-8">
				<Spinner /> Loading...
				<div className="h-8" />
			</div>
			<Footer />

		</>;
	}

	if(!cart || cart === '{}') {
		return <>
			<Head>
				<title>Left4Craft | Subscribe</title>
				<meta name="title" content="Left4Craft | Subscribe" />
				<meta name="og:title" content="Left4Craft | Subscribe" />
				<meta name="twitter:title" content="Left4Craft | Subscribe" />
			</Head>
			<Navbar />
			<Profile loading={loading} session={session} signIn={signIn} signOut={signOut} />

			<Hero title='Shop' />

			<div className="text-white text-center text-4xl bg-dark font-bold">
				<div className="h-8" />
				<h2>Checkout</h2>
			</div>
			<div className="text-white text-center text-4xl bg-dark font-bold">
				<div className="h-8" />
				<h2>Your cart is empty.</h2>
			</div>
			<div className="text-white text-center text-l bg-dark p-8">
				<u><Link href="/shop/products">Return to store</Link></u>
				<div className="h-8" />
			</div>
			<Footer />
		</>;
	}

	if(!session) {
		return <>
			<Head>
				<title>Left4Craft | Subscribe</title>
				<meta name="title" content="Left4Craft | Subscribe" />
				<meta name="og:title" content="Left4Craft | Subscribe" />
				<meta name="twitter:title" content="Left4Craft | Subscribe" />
			</Head>
			<Navbar />
			<Profile loading={loading} session={session} signIn={signIn} signOut={signOut} />

			<Hero title='Shop' />

			<div className="text-white text-center text-4xl bg-dark font-bold">
				<div className="h-8" />
				<h2>Checkout</h2>
			</div>
			<div className="text-white text-center text-l bg-dark p-8">
				You must <u><Link href="/api/auth/signin">log in</Link></u> to check out.
				<div className="h-8" />
			</div>
			<Footer />
		</>;
	}


	return <div>
		<Head>
			<title>Left4Craft | Subscribe</title>
			<meta name="title" content="Left4Craft | Subscribe" />
			<meta name="og:title" content="Left4Craft | Subscribe" />
			<meta name="twitter:title" content="Left4Craft | Subscribe" />
		</Head>
		<Navbar />
		<Profile loading={loading} session={session} signIn={signIn} signOut={signOut} />

		<Hero title='Shop' />

		<div className="text-white text-center text-4xl bg-dark font-bold">
			<div className="h-8" />
			<h2>Checkout</h2>
		</div>

		<div className="flex flex-wrap justify-center text-white text-center text-l bg-dark p-8">

			<div className="text-left w-96 relative">
				<Cart cart={cart} removeFromCart={() => {}} canRemove={false} />

				<p>The exact total, including coupons, currency conversions and transaction fees, will be computed in the next step.</p>
				<div className='h-4' />
				<label htmlFor="email" className="text-white">
						Email
				</label>
				<input type="text" id="email" disabled={true} className="opacity-50 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base" name="email" value={session.user.email}/>
				<div className='h-4' />
				<label htmlFor="mc-username" className="text-white">
						Minecraft Username
				</label>
				<div className="relative">
					<input type="text" id="mc-username" onChange={() => setCheckout(false)} className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Minecraft Username" />
				</div>
				<div className='h-4' />
				{mcErrorMessage !== '' && <label htmlFor="validate-username" className="text-red-500">{mcErrorMessage}</label>}
				<button type="button" id="validate-username" disabled={validating} onClick={() => validate_user(setCheckout, setValidating, setMcErrormessage, setUUID)} className="flex justify-center items-center w-l py-2 px-4  bg-primary hover:bg-secondary text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg">
					{validating ? <><Spinner /> <p>Loading...</p></>: 'Check Username'}
				</button>
				{(!loading && canCheckout) && <>
					<div className='h-4' />
					<label htmlFor="mc-uuid" className="text-white">
						UUID
					</label>
					<input type="text" id="mc-uuid" disabled={true} className="opacity-50 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base" name="uuid" value={uuid}/>
					<div className='h-4' />
					<label htmlFor="mc-skin-preview" className="text-white">
						Minecraft Skin:
					</label>
					<div className='rounded-lg border-2 border-primary flex flex-wrap justify-center p-8'	>
						<Image id='mc-skin-preview' src={'https://mc-heads.net/body/' + uuid + '/right/'} height={ 432 } width={ 180 } draggable={false} unoptimized={true} />
						{/* <img id='mc-skin-preview' src={ 'https://crafatar.com/renders/body/' + uuid } height={ 432 } width={ 180 } draggable={false} /> */}
					</div>
					<div className='h-4' />
					<p>Please check the following:</p>
					<div className='h-4' />
					<label className="flex items-center space-x-3 mb-3">
						<input type="checkbox" onChange={() => setBox1(!box1)} name="mc-check" className="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-green-500 checked:border-transparent focus:outline-none"/>
						<span className="text-white">
                        This is the correct Minecraft account
						</span>
					</label>
					<label className="flex items-center space-x-3 mb-3">
						<input type="checkbox" onChange={() => setBox2(!box2)} name="terms-check" className="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-green-500 checked:border-transparent focus:outline-none"/>
						<span className="text-white">
                        I agree to the <u><Link href='/tos'>Terms of Service</Link></u> and <u><Link href='/privacy'>Privacy Policy</Link></u>
						</span>
					</label>
					{stripeErrorMessage !== '' && <label htmlFor="checkout" className="text-red-500">{stripeErrorMessage}</label>}
					<button type="button" id="checkout" onClick={() => load_stripe((box1 && box2), setStripeLoading, setStripeErrorMessage)} className={`flex justify-center items-center w-l py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg ${(box1 && box2) ? 'bg-primary hover:bg-secondary' : 'bg-light cursor-not-allowed'}`}>
						{stripeLoading ? <><Spinner /> <p>Loading...</p></>: 'Checkout'}
					</button>
					<p>Coupon details (if applicable) will be displayed on the checkout screen.</p>
					<div className='h-4' />
				</> }

			</div>
			<div className="text-white text-center text-l bg-dark p-8 w-screen">
				<u><Link href="/shop/products">Return to store</Link></u>
			</div>
		</div>

		<Footer />
	</div>;
}

function validate_user(setCheckout, setValidating, setErrormessage, setUUID) {
	setValidating(true);
	setErrormessage('');
	const username = document.getElementById('mc-username').value;

	const uuid_request = new XMLHttpRequest();
	uuid_request.open('get',
		'/api/minecraft/getuuid/' + username);

	uuid_request.send();

	uuid_request.onload = () => {
		try {
			const uuid_response = JSON.parse(uuid_request.response);

			if(uuid_response.success) {
				document.getElementById('mc-username').value = uuid_response.name;

				// convert to format that plays nicer with crafatar and internal server databases
				let uuid = uuid_response.id;
				uuid = uuid.slice(0, 8) + '-' + uuid.slice(8, 12) + '-' + uuid.slice(12, 16) + '-' + uuid.slice(16, 20) + '-' + uuid.slice(20);

				setUUID(uuid.toString());
				setCheckout(true);
				setValidating(false);
			} else {
				setErrormessage('Invalid Username!');
				setCheckout(false);
				setValidating(false);
			}
		} catch (e) {
			console.error(e);
			setErrormessage('Invalid Username!');
			setCheckout(false);
			setValidating(false);
		}
	};

}

function load_stripe(canCheckout, setLoading, setErrormessage) {
	if(!canCheckout) return;

	setLoading(true);
	setErrormessage('');

	const stripe_script = document.getElementById('stripe_script');
	if (!stripe_script) {
		const script = document.createElement('script');
		script.src = 'https://js.stripe.com/v3/'; // Stripe must be loaded externally
		script.id = 'stripe_script';
		document.body.appendChild(script);

		script.onload = () => {
			checkout(setLoading, setErrormessage);
		};
	} else {
		checkout(setLoading, setErrormessage);
	}
}

function checkout(setLoading, setErrormessage) {
	const checkout_request = new XMLHttpRequest();
	checkout_request.open('get', '/api/stripe/checkout' +
		'?user=' + encodeURIComponent(document.getElementById('mc-username').value) +
        '&uuid=' + encodeURIComponent(document.getElementById('mc-uuid').value));
	checkout_request.send();
	checkout_request.onload = () => {
		const checkout_response = JSON.parse(checkout_request.response);
		if(!checkout_response.success) {
			setErrormessage('Error: ' + checkout_response.error);
			setLoading(false);
		} else {
			/* eslint-disable no-undef */
			const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
			stripe.redirectToCheckout({ sessionId: checkout_response.session_id });
		}
	};
}
