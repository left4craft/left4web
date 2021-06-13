module.exports = {
	darkMode: true, // or 'media' or 'class'
	mode: 'jit',
	plugins: [],
	purge: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}'
	],
	theme: { // extend: {}
		colors: {
			l4c_dark_grey: '#2E2E2E',
			l4c_green: '#66AA44',
			l4c_light_grey: '#505050'
		}
	},
	variants: { extend: {} }
};
