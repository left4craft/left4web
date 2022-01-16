/* eslint-disable sort-keys */
import Head from 'next/head';
import {
	signIn,
	signOut,
	useSession
} from 'next-auth/react';
import { Navbar } from '../../../components/navbar';
import { Profile } from '../../../components/profile';
import { Footer } from '../../../components/footer';
import ProductCard from '../../../components/product_card';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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
			min: 1300
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

	return (
		<div>
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
					/>
					<ProductCard
						name="Donor Lifetime"
						slug="donor-lifetime"
						image="https://static.eartharoid.me/sharex/22/01/VIP%20Cyan.png"
						price="$69.99"
					/>
					<ProductCard
						name="Patron Lifetime"
						slug="patron-lifetime"
						image="https://static.eartharoid.me/sharex/22/01/VIP%20Red.png"
						price="$119.99"
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
					/>
					<ProductCard
						name="1x Mythic Chest Key"
						slug="1x-mythic-chest-key"
						image="https://static.eartharoid.me/sharex/22/01/Key%20Dark%20Grey.png"
						price="$1.99"
					/>
					<ProductCard
						name="3x Normal Chest Key"
						slug="3x-normal-chest-key"
						image="https://static.eartharoid.me/sharex/22/01/Key%20Brown.png"
						price="$1.99"
					/>
					<ProductCard
						name="1x Legendary Chest Key"
						slug="1x-legendary-chest-key"
						image="https://static.eartharoid.me/sharex/22/01/Key%20Green.png"
						price="$2.99"
					/>
					<ProductCard
						name="3x Mythic Chest Key"
						slug="3x-mythic-chest-key"
						image="https://static.eartharoid.me/sharex/22/01/Key%20Dark%20Grey.png"
						price="$4.99"
					/>
					<ProductCard
						name="3x Legendary Chest Key"
						slug="3x-legendary-chest-key"
						image="https://static.eartharoid.me/sharex/22/01/Key%20Green.png"
						price="$7.99"
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
					/>
					<ProductCard
						name="5000 Coins"
						slug="5000-coins"
						image="https://static.eartharoid.me/sharex/22/01/Coins%20Medium%20Blue.png"
						price="$5.99"
					/>
					<ProductCard
						name="10000 Coins"
						slug="10000-coins"
						image="https://static.eartharoid.me/sharex/22/01/Coins%20Medium%20Green.png"
						price="$9.99"
					/>
					<ProductCard
						name="20000 Coins"
						slug="20000-coins"
						image="https://static.eartharoid.me/sharex/22/01/Coins%20Large%20Red.png"
						price="$14.99"
					/>
					<ProductCard
						name="30000 Coins"
						slug="30000-coins"
						image="https://static.eartharoid.me/sharex/22/01/Coins%20Large%20Purple.png"
						price="$19.99"
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
					/>
					<ProductCard
						name="Just Donate"
						slug="just-donate"
						image="https://static.eartharoid.me/sharex/22/01/Star%20Red.png"
						price="$1.00"
					/>
				</Carousel>
			</div>

			<Footer />
		</div>
	);
}

function scroll(reverse, id) {
	const scroller = document.getElementById(id);
	console.log(reverse ? -50 : 50, id, scroller);
	scroller.scrollBy(reverse ? -250 : 250, 0);
}
