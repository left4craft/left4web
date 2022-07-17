import Link from 'next/link';
import PropTypes from 'prop-types';
import { toReadablePrice } from '../utils/readable_price';

export function SubscriptionCard (props) {
	const prices = props.rank.price;
	return <div className="p-8">
		<div className="shadow-lg rounded-2xl w-72 bg-gradient-to-r from-primary to-secondary p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
			<div className="flex text-white  items-center justify-between">
				<p className="text-4xl font-medium mb-4">
					{props.rank.name}
				</p>
				<p className="text-3xl font-bold flex flex-col">
					{toReadablePrice(prices[props.annual ? 1 : 0])}
					<span className="font-thin text-right text-sm">
						{props.annual ? '/ year' : '/ month'}
					</span>
				</p>
			</div>
			<p className="text-white text-md mt-4">
				{props.annual && 'Save ' + toReadablePrice(prices[0]*12 - prices[1]) + ' per year!'}
			</p>

			<p className="text-white text-md mt-4">
				Perks:
			</p>
			<ul className="text-sm text-white w-full mt-6 mb-6">
				{getPerks(props.rank)}
			</ul>
			<Link href={{
				pathname: '/shop/subscription/checkout',
				query: {
					annual: props.annual,
					name: props.rank.name,
					price: toReadablePrice(props.rank.price[props.annual ? 1 : 0]),
					price_id: props.rank.price_id[props.annual ? 1 : 0]
				}
			}}  passHref>
				<button type="button" className="w-full px-3 py-3 text-sm shadow rounded-lg text-white bg-dark hover:bg-light transition ease-in duration-200">
					Subscribe
				</button>
			</Link>

		</div>
	</div>;
}

function getPerks(rank) {
	const perks_enabled = rank.perks_enabled;
	const perks_disabled = rank.perks_disabled;
	const list_items = [];
	if(perks_enabled) {
		for(let i = 0; i < perks_enabled.length; i += 1) {
			list_items.push(<ListItem key={i} value={perks_enabled[i]} />);
		}
	}

	if(perks_disabled) {
		for(let i = 0; i < perks_disabled.length; i += 1) {
			list_items.push(<ListItem key={i+perks_enabled.length} value={perks_disabled[i]} disabled={true} />);
		}
	}
	return list_items;
}

SubscriptionCard.propTypes = {
	annual: PropTypes.bool,
	rank: PropTypes.object
};

function ListItem(props) {
	if(props.disabled) {
		return <li className="mb-3 flex items-center opacity-50">
			<svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" className="h-6 w-6 mr-2" fill="white" viewBox="0 0 1792 1792">
				<path d="M1277 1122q0-26-19-45l-181-181 181-181q19-19 19-45 0-27-19-46l-90-90q-19-19-46-19-26 0-45 19l-181 181-181-181q-19-19-45-19-27 0-46 19l-90 90q-19 19-19 46 0 26 19 45l181 181-181 181q-19 19-19 45 0 27 19 46l90 90q19 19 46 19 26 0 45-19l181-181 181 181q19 19 45 19 27 0 46-19l90-90q19-19 19-46zm387-226q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z">
				</path>
			</svg>

			{props.value}
		</li>;
	}
	return <li className="mb-3 flex items-center ">
		<svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" width="6" height="6" stroke="currentColor" fill="white" viewBox="0 0 1792 1792">
			<path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z">
			</path>
		</svg>

		{props.value}
	</li>;
}


ListItem.propTypes = {
	disabled: PropTypes.bool,
	value: PropTypes.string
};