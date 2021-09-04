module.exports = {
	darkMode: 'class', // or 'media' or 'class'
	plugins: [],
	purge: [],
	// eslint-disable-next-line no-unused-vars
	theme: {

		extend: {
			// eslint-disable-next-line no-unused-vars
			backgroundImage: theme => ({ 'l4c-logo': 'url(\'/images/logo.png\')' }),
			colors: {
				dark: '#2e2e2e',
				light: '#505050',
				primary: '#4caf50',
				secondary: '#66aa44'
			}
		}
	},
	variants: { extend: {} }
};
