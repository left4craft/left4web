module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class', // or 'media' or 'class'
	plugins: [],
	// eslint-disable-next-line no-unused-vars
	theme: {

		extend: {
			// that is animation class
			animation: {
				fade: 'fadeOut 1s ease-in-out',
				'fade-in': 'fade-in-down 1s ease-out',
				'fade-out': 'fade-out-up 1s ease-out',
				pan: 'pan 20s linear infinite'
			},

			// eslint-disable-next-line no-unused-vars
			backgroundImage: theme => ({
				'grass-pattern': 'url(\'/images/grass.png\')',
				'l4c-logo': 'url(\'/images/logo.png\')'
			}),
			colors: {
				dark: '#2e2e2e',
				light: '#505050',
				primary: '#4caf50',
				secondary: '#66aa44'
			},

			// that is actual animation
			// eslint-disable-next-line no-unused-vars
			keyframes: theme => ({
				'fade-in-down': {
					'0%': {
						opacity: '0',
						transform: 'translateY(-10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-out-up': {
					'from': {
						opacity: '1',
						transform: 'translateY(0px)'
					},
					'to': {
						opacity: '0',
						transform: 'translateY(-10px)'
					}
				},
				fadeOut: {
					'0%': { opacity: 1 },
					'100%': { opacity: 0 }
				},
				pan: {
					'0%': { 'background-position': 'left bottom' },
					'50%': { 'background-position': 'right top' },
					'100%': { 'background-position': 'left bottom' }
				}
			})
		}
	},
	variants: {
		extend: {
			backgroundColor: ['checked'],
			borderColor: ['checked'],
			inset: ['checked'],
			zIndex: ['hover',
				'active']
		}
	}
};
