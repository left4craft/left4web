export const stripe_products = {
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