/* eslint-disable sort-keys */
import Head from 'next/head';
import {
	signIn,
	signOut,
	useSession
} from 'next-auth/react';
import { useState } from 'react';
import { Navbar } from '../../components/navbar';
import { Profile } from '../../components/profile';
import { Footer } from '../../components/footer';
import ProductCard from '../../components/product_card';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Modal from 'react-modal';
import Image from 'next/image';

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

export default function Shop() {
	const {
		data: session, loading
	} = useSession();

	const [selected,
		setSelected] = useState(null);

	return (
		<div>
			<Modal
				isOpen={!!selected}
				onRequestClose={() => setSelected(null)}
				contentLabel="Product info"
				className="bg-light py-4 z-50 absolute inset-8 sm:inset-16md:inset-24 lg:inset-32 xl:inset-y-44 xl:inset-x-72 2xl:inset-y-64 2xl:inset-x-96 text-white overflow-y-auto"
				overlayClassName="bg-black/75 z-40 fixed top-0 left-0 right-0 bottom-0"
			>
				{!!selected && (
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" className="ml-4 h-8 w-8 hover:cursor-pointer hover:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => setSelected(null)}>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
						<div className="px-4 pt-4 sm:px-8 md:px-16">
							<div className="text-center">
								<h3 className="font-bold text-2xl">{selected.name}</h3>
								<h4 className="text-lg font-semibold text-gray-300">{selected.price}</h4>
								<button type="button" className="py-2 px-4 m-4 bg-primary hover:bg-secondary active:bg-secondary focus:outline-none focus:ring focus:ring-white text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg md:w-56">
									Add to cart
								</button>
							</div>
							<div>
								<h4 className="text-xl font-semibold">Details</h4>
								<p className="text-gray-300">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac elit nunc.
									Proin aliquet, odio sit amet scelerisque eleifend, orci purus aliquet odio, nec dapibus sapien nulla ac ipsum.
									Ut vitae nisl at nulla dictum blandit. Donec id ante at nisi laoreet lacinia.
									Nullam aliquet cursus elit, eget porttitor velit auctor a.
									Duis iaculis mauris vitae viverra pharetra. Quisque eu est eu lacus rhoncus sagittis at non libero.
									Cras mattis nisi velit, facilisis bibendum lorem fermentum semper.
									Cras pharetra justo dolor, sed molestie lorem malesuada nec.
									Quisque porttitor justo nisi, semper eleifend ligula aliquet in.
									Quisque eget eros sit amet ipsum dictum consequat.
									Nunc a euismod nisl, nec efficitur odio. Donec consequat dapibus justo quis convallis.
									Nunc aliquet tellus nec nisl iaculis gravida.
									Vestibulum pharetra, ligula ac pretium egestas, purus ipsum blandit dui, et malesuada magna dui eget neque.

								</p>
							</div>
						</div>
					</div>
				)}
			</Modal>
			<Head>
				<title>Left4Craft | Shop</title>
				<meta name="title" content="Left4Craft | Shop" />
			</Head>
			<Navbar />
			<Profile loading={loading} session={session} signIn={signIn} signOut={signOut} />
			<div className="text-white text-center text-6xl bg-gradient-to-r from-primary to-secondary h-80 font-bold">
				<div className="h-32" />
				<h1>Shop</h1>
			</div>

			<div id="ranks-list" className="container mx-auto my-8 px-4 sm:px-6 lg:px-8 xl:px-24">
				<h2 className="text-white font-bold text-4xl my-8">Ranks</h2>
				<Carousel
					// centerMode={true}
					swipeable={true}
					draggable={true}
					showDots={true}
					keyBoardControl={true}
					responsive={responsive}
				>
					<ProductCard
						name="User+ Lifetime"
						slug="user-plus-lifetime"
						image="https://static.eartharoid.me/sharex/22/01/VIP%20Orange.png"
						price="$19.99"
						select={setSelected}
					/>
					<ProductCard
						name="Donor Lifetime"
						slug="donor-lifetime"
						image="https://static.eartharoid.me/sharex/22/01/VIP%20Cyan.png"
						price="$69.99"
						select={setSelected}
					/>
					<ProductCard
						name="Patron Lifetime"
						slug="patron-lifetime"
						image="https://static.eartharoid.me/sharex/22/01/VIP%20Red.png"
						price="$119.99"
						select={setSelected}
					/>
				</Carousel>
			</div>

			<div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8 xl:px-24">
				<h2 className="text-white font-bold text-4xl my-8">Cosmetic chest keys</h2>
				<Carousel
					// centerMode={true}
					swipeable={true}
					draggable={true}
					showDots={true}
					keyBoardControl={true}
					responsive={responsive}
				>
					<ProductCard
						name="1x Normal Chest Key"
						slug="1x-normal-chest-key"
						image="https://static.eartharoid.me/sharex/22/01/Key%20Brown.png"
						price="$0.99"
						select={setSelected}
					/>
					<ProductCard
						name="1x Mythic Chest Key"
						slug="1x-mythic-chest-key"
						image="https://static.eartharoid.me/sharex/22/01/Key%20Dark%20Grey.png"
						price="$1.99"
						select={setSelected}
					/>
					<ProductCard
						name="3x Normal Chest Key"
						slug="3x-normal-chest-key"
						image="https://static.eartharoid.me/sharex/22/01/Key%20Brown.png"
						price="$1.99"
						select={setSelected}
					/>
					<ProductCard
						name="1x Legendary Chest Key"
						slug="1x-legendary-chest-key"
						image="https://static.eartharoid.me/sharex/22/01/Key%20Green.png"
						price="$2.99"
						select={setSelected}
					/>
					<ProductCard
						name="3x Mythic Chest Key"
						slug="3x-mythic-chest-key"
						image="https://static.eartharoid.me/sharex/22/01/Key%20Dark%20Grey.png"
						price="$4.99"
						select={setSelected}
					/>
					<ProductCard
						name="3x Legendary Chest Key"
						slug="3x-legendary-chest-key"
						image="https://static.eartharoid.me/sharex/22/01/Key%20Green.png"
						price="$7.99"
						select={setSelected}
					/>
				</Carousel>
			</div>

			<div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8 xl:px-24">
				<h2 className="text-white font-bold text-4xl my-8">Cosmetic coins</h2>
				<Carousel
					// centerMode={true}
					swipeable={true}
					draggable={true}
					showDots={true}
					keyBoardControl={true}
					responsive={responsive}
				>
					<ProductCard
						name="2000 Coins"
						slug="2000-coins"
						image="https://static.eartharoid.me/sharex/22/01/Coins%20Small%20Brown.png"
						price="$2.99"
						select={setSelected}
					/>
					<ProductCard
						name="5000 Coins"
						slug="5000-coins"
						image="https://static.eartharoid.me/sharex/22/01/Coins%20Medium%20Blue.png"
						price="$5.99"
						select={setSelected}
					/>
					<ProductCard
						name="10000 Coins"
						slug="10000-coins"
						image="https://static.eartharoid.me/sharex/22/01/Coins%20Medium%20Green.png"
						price="$9.99"
						select={setSelected}
					/>
					<ProductCard
						name="20000 Coins"
						slug="20000-coins"
						image="https://static.eartharoid.me/sharex/22/01/Coins%20Large%20Red.png"
						price="$14.99"
						select={setSelected}
					/>
					<ProductCard
						name="30000 Coins"
						slug="30000-coins"
						image="https://static.eartharoid.me/sharex/22/01/Coins%20Large%20Purple.png"
						price="$19.99"
						select={setSelected}
					/>
				</Carousel>
			</div>

			<div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8 xl:px-24">
				<h2 className="text-white font-bold text-4xl my-8">Other</h2>
				<Carousel
					// centerMode={true}
					swipeable={true}
					draggable={true}
					showDots={true}
					keyBoardControl={true}
					responsive={responsive}
				>
					<ProductCard
						name="Unlimited WorldEdit"
						slug="unlimited-worldedit"
						image="https://static.eartharoid.me/sharex/22/01/Axe%20Brown.png"
						price="$49.99"
						select={setSelected}
					/>
					<ProductCard
						name="Just Donate"
						slug="just-donate"
						image="https://static.eartharoid.me/sharex/22/01/Star%20Red.png"
						price="$1.00"
						select={setSelected}
					/>
				</Carousel>
			</div>

			<Footer />
		</div>
	);
}
