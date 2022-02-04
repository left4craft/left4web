import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';

export default function ProductCard(props) {
	return (
		<div className="flex flex-nowrap mx-2 sm:mx-4 md:mx-6 lg:mx-6">
			<div className="inline-block px-1 scroll-pl-4 snap-center sm:snap-start snap-always">
				<div className="p-4 min-w-max sm:min-w-min max-w-xs overflow-hidden rounded-lg shadow-sm bg-light text-center"> {/* w-72 h-96 */}
					<Image src={props.image} width="100%" height="100%" className="m-0 mx-auto"></Image>
					<div className="p-1 text-white">
						<h3 className="font-semibold text-2xl">{props.name}</h3>
						<h4 className="text-lg text-gray-300">{props.price}</h4>
						<div className="mt-2">
							<Link href={`/shop/products/${props.slug}`} passHref>
								<button type="button" className="py-2 px-4 bg-primary hover:bg-secondary active:bg-secondary focus:outline-none focus:ring focus:ring-white text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg md:w-56">
									Details
								</button>
							</Link>
							<button type="button" className="mt-2 py-2 px-4 bg-dark focus:outline-none focus:ring focus:ring-white text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg md:w-56">
								Add to cart <span className="text-gray-400">($0)</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

ProductCard.propTypes = {
	image: PropTypes.string,
	name: PropTypes.string,
	price: PropTypes.string,
	slug: PropTypes.string
};
