module.exports = {
	darkMode: 'class', // or 'media' or 'class'
	plugins: [],
	purge: ['./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}'],
	// eslint-disable-next-line no-unused-vars
	theme: {

		extend: {
			// that is animation class
			animation: { fade: 'fadeOut 1s ease-in-out' },

			// eslint-disable-next-line no-unused-vars
			backgroundImage: theme => ({ 'l4c-logo': 'url(\'/images/logo.png\')' }),
			colors: {
				dark: '#2e2e2e',
				light: '#505050',
				primary: '#4caf50',
				secondary: '#66aa44'
			},

			// that is actual animation
			// eslint-disable-next-line no-unused-vars
			keyframes: theme => ({
				fadeOut: {
					'0%': { opacity: 1 },
					'100%': { opacity: 0 }
				}
			})
		}
	},
	variants: { extend: {} }
};
