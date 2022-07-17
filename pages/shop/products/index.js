/* eslint-disable sort-keys */
import Head from 'next/head';
import Link from 'next/link';
import {
	signIn,
	signOut,
	useSession
} from 'next-auth/react';
import {
	useEffect, useState
} from 'react';
import { Navbar } from '../../../components/navbar';
import { Profile } from '../../../components/profile';
import { Hero } from '../../../components/hero';
import { Footer } from '../../../components/footer';
import ProductCard from '../../../components/product_card';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Modal from 'react-modal';
import { toReadablePrice } from '../../../utils/readable_price';
import Image from 'next/image';
import {
	getCookie, hasCookie, setCookie
} from 'cookies-next';
import Cart from '../../../components/cart';
import PropTypes from 'prop-types';
import { stripe } from '../../../utils/stripe';

Modal.setAppElement('#__next');

const responsive = {
	desktop: {
		breakpoint: {
			max: 4000,
			min: 1920
		},
		items: 4,
		slidesToSlide: 3
	},
	laptop: {
		breakpoint: {
			max: 1920,
			min: 1024
		},
		items: 3,
		slidesToSlide: 2
	},
	tablet: {
		breakpoint: {
			max: 1024,
			min: 464
		},
		items: 2
	},
	mobile: {
		breakpoint: {
			max: 464,
			min: 0
		},
		items: 1
	}
};

export default function ProductPage(props) {
	const {
		data: session, loading
	} = useSession();

	const [selected,
		setSelected] = useState(null);

	// initialize the state to {} to ensure unhydrated page renders the same on the client and server
	const [cart,
		setCart] = useState('{}');

	// when the page is hydrated, then load the cookies
	useEffect(() => {
		if(hasCookie('cart')) setCart(getCookie('cart'));
	}, []);

	// automatically save the cart
	useEffect(() => {
		setCookie('cart', cart);
	}, [cart]);

	const addToCart = product => {
		const curr_cart = JSON.parse(cart);
		if(!product.limit_one && curr_cart[product.id]) {
			if(curr_cart[product.id].quantity < 99 || curr_cart[product.id].unlimited_quantity) curr_cart[product.id].quantity += 1;
		} else {
			curr_cart[product.id] = JSON.parse(JSON.stringify(product));
			curr_cart[product.id].quantity = 1;
		}
		setCart(JSON.stringify(curr_cart));
	};

	const removeFromCart = product => {
		const curr_cart = JSON.parse(cart);
		if(curr_cart[product.id]) {
			curr_cart[product.id] = undefined;
		}
		setCart(JSON.stringify(curr_cart));
	};

	return (
		<div>
			<Modal
				isOpen={!!selected}
				onRequestClose={() => setSelected(null)}
				contentLabel="Product info"
				className="rounded-lg bg-light py-4 z-50 absolute inset-8 sm:inset-16md:inset-24 lg:inset-32 xl:inset-y-44 xl:inset-x-72 2xl:inset-y-64 2xl:inset-x-96 text-white overflow-y-auto"
				overlayClassName="bg-black/75 z-40 fixed top-0 left-0 right-0 bottom-0"
			>
				{!!selected && (
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" className="ml-4 h-8 w-8 hover:cursor-pointer hover:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => setSelected(null)}>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
						<div className="px-4 pt-4 sm:px-8 md:px-16">
							<div className="text-center">
								<Image height={200} width={200} src={selected.product.image} />
								<h3 className="font-bold text-2xl">{selected.product.name}</h3>
								<h4 className="text-lg font-semibold text-gray-300">{selected.price}</h4>
								<button onClick={() => {
									addToCart(selected.product);
									setSelected(null);
								}} type="button" className="py-2 px-4 m-4 bg-primary hover:bg-secondary active:bg-secondary focus:outline-none focus:ring focus:ring-white text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg md:w-56">
									Add to cart
								</button>
							</div>
							<div>
								<h4 className="text-xl font-semibold">Details</h4>
								<p className="text-gray-300 whitespace-pre-line">
									{selected.product.description}
								</p>
							</div>
						</div>
					</div>
				)}
			</Modal>
			<Head>
				<title>Left4Craft | Shop</title>
				<meta name="title" content="Left4Craft | Shop" />
				<meta name="og:title" content="Left4Craft | Shop" />
				<meta name="twitter:title" content="Left4Craft | Shop" />
			</Head>
			<Navbar />
			<Profile loading={loading} session={session} signIn={signIn} signOut={signOut} />
			<Hero title='Shop' />

			{Object.keys(props.stripe_products).map(category =>
				<div key={category} className="container mx-auto my-8 px-4 sm:px-6 lg:px-8 xl:px-24">
					<h2 className="text-white font-bold text-4xl my-8">{category}</h2>
					<Carousel
						arrows={!selected}
						swipeable={true}
						draggable={true}
						showDots={true}
						keyBoardControl={true}
						responsive={responsive}
					>
						{props.stripe_products[category].map(product =>
							<ProductCard
								key={product.id}
								addItem={() => addToCart(product)}
								product={product}
								price={toReadablePrice(product.price)}
								select={setSelected}
								quantity={JSON.parse(cart)[product.id]?.quantity}
							/>
						)}
					</Carousel>
				</div>
			)}
			<div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8 xl:px-24">
				<h2 className="text-white font-bold text-4xl my-8">Cart</h2>
			</div>
			<div className="flex flex-wrap justify-center">
				<div className="w-96 relative text-white">
					{cart !== '{}' ? <>
						<Cart cart={cart} removeFromCart={removeFromCart} canRemove={true} />
						<Link href={{ pathname: '/shop/products/checkout' }}  passHref>
							<button type="button" className="w-96 px-3 py-3 text-sm shadow rounded-lg text-white bg-primary hover:bg-secondary transition ease-in duration-200">
								Checkout
							</button>
						</Link>
					</> : <p className="text-2xl">Your cart is empty!</p>

					}
				</div>
			</div>
			<div className="h-16" />
			<div className="text-white text-center text-l p-8">
				<u><Link href="/shop">Return to store</Link></u>
			</div>
			<div className="h-16" />
			<Footer />
		</div>
	);
}

ProductPage.propTypes = { stripe_products: PropTypes.object };

export async function getServerSideProps() {

	const products = await stripe.products.list({ limit: 99 });

	const stripe_products = {};
	for(const product of products.data) {
		// skip product if it's missing one-time purchase data
		if(!product.default_price || !product.metadata.category) continue;

		// get the price
		const price = await stripe.prices.retrieve(
			product.default_price
		);
		// skip the product if the default price is recurring
		if(price.recurring !== null) continue;

		// create the product object
		if(!stripe_products[product.metadata.category]) stripe_products[product.metadata.category] = [];
		stripe_products[product.metadata.category].push({
			description: product.description === null ? 'No Description' : product.description,
			id: product.default_price,
			image: product.images && product.images.length > 0 ? product.images[0] : 'https://static.eartharoid.me/sharex/22/01/Star%20Red.png',
			limit_one: !!product.metadata.limit_one,
			unlimited_quantity: !!product.metadata.unlimited_quantity,
			name: product.name,
			price: price.unit_amount
		});
	}

	// console.log(JSON.stringify(stripe_products, null, 2));

	return { props: { stripe_products: stripe_products } };
}

