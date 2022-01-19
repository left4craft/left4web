export default function ProductCard(props) {
	return (
		<div className="mx-6 sm:mx-8 md:mx-12 lg:mx-16 pb-6">
			<style>{`
				#img-${props.slug} {
					background-image: url("${props.image}");
					height: 150px;
					mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 50%, transparent 100%);
					-webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 50%, transparent 100%);
					padding: 0px;
				}
			`}</style>
			<div className="inline-block px-1">
				<div className="p-4 sm:min-w-min max-w-xs overflow-hidden rounded-lg shadow-sm bg-light text-center"> {/* w-72 h-96 */}
					<div id={`img-${props.slug}`} className="bg-no-repeat bg-top bg-cover m- op-0"></div>
					{/* <Image src={props.image} width="110%" height="100%" className="bg-no-repeat bg-top bg-cover p-0"></Image> */}
					<div className="p-1 text-white">
						<h3 className="font-semibold text-2xl">{props.name}</h3>
						<h4 className="text-lg text-gray-300">{props.price}</h4>
						<div className="mt-2">
							<button type="button" onClick={() => props.select(props)} className="py-2 px-4 bg-primary hover:bg-secondary active:bg-secondary focus:outline-none focus:ring focus:ring-white text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg md:w-56">
								Details
							</button>
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
