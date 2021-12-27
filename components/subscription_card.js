import Link from 'next/link';
import PropTypes from 'prop-types';
import { stripe_products } from '../utils/stripe_products';

// const perks = {
// 	'Donor': [
// 		<ListItem key='1' value='Donor Prefix' />,
// 		<ListItem key='2' value='Blue nickname' />,
// 		<ListItem key='3' value='/back on death' />,
// 		<ListItem key='4' value='No teleport delay' />,
// 		<ListItem key='5' value='6 homes in survival' />,
// 		<ListItem key='6' value='6 creative plots' />,
// 		<ListItem key='7' value='/hat, /craft, and /enderchest' />,
// 		<ListItem key='8' value='1000 cosmetic coins per month' />,
// 		<ListItem key='9' value='1 Mythic key per month' />,
// 		<ListItem key='10' value='Iron Golem, Squid, and Cow disguise' />
// 	],
// 	'Patron': [
// 		<ListItem key='1' value='Patron Prefix' />,
// 		<ListItem key='2' value='Colored and formatted nickname' />,
// 		<ListItem key='3' value='All Donor perks' />,
// 		<ListItem key='4' value='10 homes in survival' />,
// 		<ListItem key='5' value='16 creative plots' />,
// 		<ListItem key='6' value='/skull in creative' />,
// 		<ListItem key='7' value='2000 cosmetic coins per month' />,
// 		<ListItem key='8' value='2 Mythic key per month' />,
// 		<ListItem key='9' value='Player disguise' />
// 	],
// 	'Patron+': [
// 		<ListItem key='1' value='Patron+ Prefix' />,
// 		<ListItem key='2' value='All Patron perks' />,
// 		<ListItem key='3' value='UNLIMITED homes in survival' />,
// 		<ListItem key='4' value='32 creative plots' />,
// 		<ListItem key='5' value='4000 cosmetic coins per month' />,
// 		<ListItem key='6' value='2 Mythic key per month' />,
// 		<ListItem key='7' value='1 Legendary key per month' />
// 	],
// 	'User+': [
// 		<ListItem key='1' value='User+ Prefix' />,
// 		<ListItem key='2' value='4 homes in survival' />,
// 		<ListItem key='3' value='4 creative plots' />,
// 		<ListItem key='4' value='500 cosmetic coins per month' />,
// 		<ListItem key='5' value='Iron Golem disguise' />,
// 		<ListItem key='6' value='Nickname' disabled={true} />,
// 		<ListItem key='7' value='Monthly cosmetic chest key' disabled={true} />

// 	]
// };

// const urls = {
// 	'Donor': '/shop/subscription/donor',
// 	'Patron': '/shop/subscription/patron',
// 	'Patron+': '/shop/subscription/patronplus',
// 	'User+': '/shop/subscription/userplus'
// };

export function SubscriptionCard (props) {
	const prices = stripe_products.subscriptions[props.rank].price;
	return <div className="p-8">
		<div className="shadow-lg rounded-2xl w-72 bg-gradient-to-r from-primary to-secondary p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
			<div className="flex text-white  items-center justify-between">
				<p className="text-4xl font-medium mb-4">
					{stripe_products.subscriptions[props.rank].display_name}
				</p>
				<p className="text-3xl font-bold flex flex-col">
					{'$' + prices[props.annual ? 1 : 0]}
					<span className="font-thin text-right text-sm">
						{props.annual ? '/ year' : '/ month'}
					</span>
				</p>
			</div>
			<p className="text-white text-md mt-4">
				{props.annual && 'Save $' + Math.round(prices[0]*1200 - prices[1]*100)/100 + ' per year!'}
			</p>

			<p className="text-white text-md mt-4">
				Perks:
			</p>
			<ul className="text-sm text-white w-full mt-6 mb-6">
				{getPerks(props.rank)}
			</ul>
			<Link href={'/shop/subscription/' + props.rank} passHref>
				<button type="button" className="w-full px-3 py-3 text-sm shadow rounded-lg text-white bg-dark hover:bg-light transition ease-in duration-200">
					Subscribe
				</button>
			</Link>

		</div>
	</div>;
}

function getPerks(rank) {
	const perks_enabled = stripe_products.subscriptions[rank].perks_enabled;
	const perks_disabled = stripe_products.subscriptions[rank].perks_disabled;
	const list_items = [];
	if(perks_enabled !== undefined) {
		for(let i = 0; i < perks_enabled.length; i += 1) {
			list_items.push(<ListItem key={i} value={perks_enabled[i]} />);
		}
	}

	if(perks_disabled !== undefined) {
		for(let i = 0; i < perks_disabled.length; i += 1) {
			list_items.push(<ListItem key={i+perks_enabled.length} value={perks_disabled[i]} disabled={true} />);
		}
	}
	return list_items;
}

SubscriptionCard.propTypes = {
	annual: PropTypes.bool,
	rank: PropTypes.string
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