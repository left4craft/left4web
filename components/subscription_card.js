import PropTypes from 'prop-types';

const prices = {
	'Donor': [4.99,
		44.99],
	'Patron': [7.99,
		74.99],
	'Patron+': [14.99,
		149.99],
	'User+': [1.49,
		13.99]
};

const perks = {
	'Donor': [
		<ListItem key='1' value='Donor Prefix' />,
		<ListItem key='2' value='Blue nickname' />,
		<ListItem key='3' value='/back and keep xp on death' />,
		<ListItem key='4' value='6 homes in survival' />,
		<ListItem key='5' value='6 creative plots' />,
		<ListItem key='6' value='/hat, /craft, /enderchest' />,
		<ListItem key='7' value='1000 cosmetic coins per month' />,
		<ListItem key='8' value='1 Mythic key per month' />,
		<ListItem key='9' value='Iron Golem, Squid, and Cow disguise' />
	],
	'Patron': [
		<ListItem key='1' value='Patron Prefix' />,
		<ListItem key='2' value='Colored and formatted nickname' />,
		<ListItem key='3' value='All Donor perks' />,
		<ListItem key='4' value='10 homes in survival' />,
		<ListItem key='5' value='16 creative plots' />,
		<ListItem key='6' value='/skull in creative' />,
		<ListItem key='7' value='2000 cosmetic coins per month' />,
		<ListItem key='8' value='2 Mythic key per month' />,
		<ListItem key='9' value='Player disguise' />
	],
	'Patron+': [
		<ListItem key='1' value='Patron+ Prefix' />,
		<ListItem key='2' value='All Patron perks' />,
		<ListItem key='3' value='UNLIMITED homes in survival' />,
		<ListItem key='4' value='32 creative plots' />,
		<ListItem key='5' value='4000 cosmetic coins per month' />,
		<ListItem key='6' value='2 Mythic key per month' />,
		<ListItem key='7' value='1 Legendary key per month' />
	],
	'User+': [
		<ListItem key='1' value='User+ Prefix' />,
		<ListItem key='2' value='4 homes in survival' />,
		<ListItem key='3' value='4 creative plots' />,
		<ListItem key='4' value='500 cosmetic coins per month' />,
		<ListItem key='5' value='Iron Golem disguise' />,
		<ListItem key='6' value='Nickname' disabled={true} />,
		<ListItem key='7' value='Monthly cosmetic chest key' disabled={true} />

	]
};

export function SubscriptionCard (props) {

	return <div className="p-8">
		<div className="shadow-lg rounded-2xl w-72 bg-gradient-to-r from-primary to-secondary dark:bg-gray-800 p-4">
			<div className="flex text-white  items-center justify-between">
				<p className="text-4xl font-medium mb-4">
					{props.rank}
				</p>
				<p className="text-3xl font-bold flex flex-col">
					{'$' + prices[props.rank][props.annual ? 1 : 0]}
					<span className="font-thin text-right text-sm">
						{props.annual ? '/ year' : '/ month'}
					</span>
				</p>
			</div>
			<p className="text-white text-md mt-4">
				{props.annual && 'Save $' + Math.round(prices[props.rank][0]*1200 - prices[props.rank][1]*100)/100 + ' per year!'}
			</p>

			<p className="text-white text-md mt-4">
				Perks:
			</p>
			<ul className="text-sm text-white w-full mt-6 mb-6">
				{perks[props.rank]}
			</ul>
			<button type="button" className="w-full px-3 py-3 text-sm shadow rounded-lg text-white bg-dark hover:bg-light transition ease-in duration-200">
				Subscribe
			</button>
		</div>
	</div>;
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