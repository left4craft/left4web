const one_time_perks = {
	donor: [
		'Donor Prefix',
		'Blue nickname',
		'/back on death',
		'No teleport delay',
		'6 homes in survival',
		'6 creative plots',
		'/hat, /craft, and /enderchest',
		'10000 cosmetic coins',
		'10 Mythic keys',
		'Iron Golem, Squid, and Cow disguise'
	],
	patron: [
		'Patron Prefix',
		'Colored and formatted nickname',
		'All Donor perks',
		'10 homes in survival',
		'16 creative plots',
		'/skull in creative',
		'20000 cosmetic coins',
		'20 Mythic keys',
		'Player disguise'
	],
	userplus: [
		'User+ Prefix',
		'4 homes in survival',
		'4 creative plots',
		'5000 cosmetic coins per month',
		'Iron Golem disguise'
	]
};

export const stripe_products = {
	one_time: {
		coins: [
			{
				description: 'Adds 2000 coins, which can be used to unlock cosmetics, to your balance.',
				id: 'price_1LJqHZI0WsrTFIiyUzeQMWOx',
				image: 'https://static.eartharoid.me/sharex/22/01/Coins%20Small%20Brown.png',
				limit_one: false,
				name: '2000 Coins',
				price: 299
			},
			{
				description: 'Adds 5000 coins, which can be used to unlock cosmetics, to your balance.',
				id: 'price_1LJqHkI0WsrTFIiy5dU0JW6r',
				image: 'https://static.eartharoid.me/sharex/22/01/Coins%20Medium%20Blue.png',
				limit_one: false,
				name: '5000 Coins',
				price: 599
			},
			{
				description: 'Adds 10000 coins, which can be used to unlock cosmetics, to your balance.',
				id: 'price_1LJqHvI0WsrTFIiySCFxJgmx',
				image: 'https://static.eartharoid.me/sharex/22/01/Coins%20Medium%20Green.png',
				limit_one: false,
				name: '10000 Coins',
				price: 999
			},
			{
				description: 'Adds 20000 coins, which can be used to unlock cosmetics, to your balance.',
				id: 'price_1LJqI9I0WsrTFIiyrOEDqfGu',
				image: 'https://static.eartharoid.me/sharex/22/01/Coins%20Large%20Red.png',
				limit_one: false,
				name: '20000 Coins',
				price: 1499
			},
			{
				description: 'Adds 30000 coins, which can be used to unlock cosmetics, to your balance.',
				id: 'price_1LJqIaI0WsrTFIiyR5fI1igb',
				image: 'https://static.eartharoid.me/sharex/22/01/Coins%20Large%20Purple.png',
				limit_one: false,
				name: '30000 Coins',
				price: 1999
			}
		],
		keys: [
			{
				description: 'Adds one normal chest key, which can be used to unlock cosmetics, to your balance.',
				id: 'price_1LJqE4I0WsrTFIiyikLU6GOC',
				image: 'https://static.eartharoid.me/sharex/22/01/Key%20Brown.png',
				limit_one: false,
				name: '1x Normal Chest Key',
				price: 99
			},
			{
				description: 'Adds one mythic chest key, which can be used to unlock cosmetics, to your balance.',
				id: 'price_1LJqELI0WsrTFIiy1hdO18SD',
				image: 'https://static.eartharoid.me/sharex/22/01/Key%20Dark%20Grey.png',
				limit_one: false,
				name: '1x Mythic Chest Key',
				price: 199
			},
			{
				description: 'Adds three normal chest keys, which can be used to unlock cosmetics, to your balance.',
				id: 'price_1LJqEeI0WsrTFIiyWPx3GpLB',
				image: 'https://static.eartharoid.me/sharex/22/01/Key%20Brown.png',
				limit_one: false,
				name: '3x Normal Chest Key',
				price: 199
			},
			{
				description: 'Adds one legendary chest key, which can be used to unlock cosmetics, to your balance.',
				id: 'price_1LJqEtI0WsrTFIiyuXWTDjrO',
				image: 'https://static.eartharoid.me/sharex/22/01/Key%20Green.png',
				limit_one: false,
				name: '1x Legendary Chest Key',
				price: 299
			},
			{
				description: 'Adds three mythic chest keys, which can be used to unlock cosmetics, to your balance.',
				id: 'price_1LJqF8I0WsrTFIiyEoVD5Giq',
				image: 'https://static.eartharoid.me/sharex/22/01/Key%20Dark%20Grey.png',
				limit_one: false,
				name: '3x Mythic Chest Key',
				price: 499
			},
			{
				description: 'Adds three legendary chest keys, which can be used to unlock cosmetics, to your balance.',
				id: 'price_1LJqFOI0WsrTFIiyN1sz0cnE',
				image: 'https://static.eartharoid.me/sharex/22/01/Key%20Green.png',
				limit_one: false,
				name: '3x Legendary Chest Key',
				price: 799
			}
		],
		other: [
			{
				description: 'Contribute to Left4Craft\'s continued existance and development.',
				id: 'price_1LJqhfI0WsrTFIiywZ906Tp7',
				image: 'https://static.eartharoid.me/sharex/22/01/Star%20Red.png',
				limit_one: false,
				name: 'Just Donate',
				price: 100,
				unlimited_quantity: true
			}
		],
		ranks: [
			{
				description: 'Grants permanent User+ rank in-game with the following perks:\n- ' + one_time_perks.userplus.join('\n- '),
				id: 'price_1KFUIWI0WsrTFIiy0N8YraRR',
				image: 'https://static.eartharoid.me/sharex/22/01/VIP%20Orange.png',
				limit_one: true,
				name: 'User+ Lifetime',
				price: 1999
			},
			{
				description: 'Grants permanent Donor rank in-game with the following perks:\n- ' + one_time_perks.donor.join('\n- '),
				id: 'price_1KFUL2I0WsrTFIiyTbUBb1P1',
				image: 'https://static.eartharoid.me/sharex/22/01/VIP%20Cyan.png',
				limit_one: true,
				name: 'Donor Lifetime',
				price: 6999
			},
			{
				description: 'Grants permanent Patron rank in-game with the following perks:\n- ' + one_time_perks.patron.join('\n- '),
				id: 'price_1KFUN1I0WsrTFIiyiySo7FIN',
				image: 'https://static.eartharoid.me/sharex/22/01/VIP%20Red.png',
				limit_one: true,
				name: 'Patron Lifetime',
				price: 11999
			}
		]
	},
	subscriptions: {
		donor: {
			display_name: 'Donor',
			perks_enabled: [
				'Donor Prefix',
				'Blue nickname',
				'/back on death',
				'No teleport delay',
				'6 homes in survival',
				'6 creative plots',
				'/hat, /craft, and /enderchest',
				'1000 cosmetic coins per month',
				'1 Mythic key per month',
				'Iron Golem, Squid, and Cow disguise'
			],
			price: [4.99,
				44.99],
			price_id: ['price_1IwyWpI0WsrTFIiyMSc0X87W',
				'price_1KFU7NI0WsrTFIiykBFCFK05']
		},

		patron: {
			display_name: 'Patron',
			perks_enabled: [
				'Patron Prefix',
				'Colored and formatted nickname',
				'All Donor perks',
				'10 homes in survival',
				'16 creative plots',
				'/skull in creative',
				'2000 cosmetic coins per month',
				'2 Mythic key per month',
				'Player disguise'
			],
			price: [7.99,
				74.99],
			price_id: ['price_1KFUEvI0WsrTFIiyQsKbcUVw',
				'price_1KFUEvI0WsrTFIiyWT777DsN']
		},

		patronplus: {
			display_name: 'Patron+',
			perks_enabled: [
				'Patron+ Prefix',
				'All Patron perks',
				'UNLIMITED homes in survival',
				'32 creative plots',
				'4000 cosmetic coins per month',
				'2 Mythic key per month',
				'1 Legendary key per month'
			],
			price: [14.99,
				149.99],
			price_id: ['price_1KFUPBI0WsrTFIiyXhlzIMzu',
				'price_1KFUPBI0WsrTFIiy47xmz8Yu']
		},

		userplus: {
			display_name: 'User+',
			perks_disabled: [
				'Nickname',
				'Monthly cosmetic chest key'
			],
			perks_enabled: [
				'User+ Prefix',
				'4 homes in survival',
				'4 creative plots',
				'500 cosmetic coins per month',
				'Iron Golem disguise'
			],
			price: [1.49,
				13.99],
			price_id: ['price_1Ir9DQI0WsrTFIiyo7ZMR1OQ',
				'price_1KFR2eI0WsrTFIiy6rASST5N']
		}
	}
};




