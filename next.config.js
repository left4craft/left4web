// const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
	/*
	 * future: {
	 *   webpack5: true,
	 * },
	 */
	output: 'standalone',
	env: {
		DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
		DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
		DYNAMODB_ACCESS_KEY_ID: process.env.DYNAMODB_ACCESS_KEY_ID,
		DYNAMODB_ACCESS_KEY_SECRET: process.env.DYNAMODB_ACCESS_KEY_SECRET,
		DYNAMODB_NEXTAUTH_TABLE: process.env.DYNAMODB_NEXTAUTH_TABLE,
		DYNAMODB_REGION: process.env.DYNAMODB_REGION,
		DYNAMODB_STRIPE_EVENTS_TABLE: process.env.DYNAMODB_STRIPE_EVENTS_TABLE,
		DYNAMODB_STRIPE_TABLE: process.env.DYNAMODB_STRIPE_TABLE,
		DYNAMODB_STRIPE_TRIALS_TABLE: process.env.DYNAMODB_STRIPE_TRIALS_TABLE,
		EMAIL_FROM: process.env.EMAIL_FROM,
		EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
		EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
		EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
		EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
		JWT_SIGNING_PRIVATE_KEY: process.env.JWT_SIGNING_PRIVATE_KEY,
		LITEBANS_API: process.env.LITEBANS_API,
		LITEBANS_API_KEY: process.env.LITEBANS_API_KEY,
		NEXT_PUBLIC_STRIPE_KEY: process.env.NEXT_PUBLIC_STRIPE_KEY,
		NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		SQS_QUEUE_URL: process.env.SQS_QUEUE_URL,
		STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
		STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET
	},
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true
	},
	images: {
		domains: [
			'www.gravatar.com',
			'cdn.discordapp.com',
			'crafatar.com',
			'mc-heads.net',
			'files.stripe.com', // stripe product icons
			'static.eartharoid.me' // temp
		],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*.gravatar.com'
			},
			{
				protocol: 'https',
				hostname: '*.discordapp.com'
			},
			{
				protocol: 'https',
				hostname: '*.crafatar.com'
			},
			{
				protocol: 'https',
				hostname: '*.mc-heads.net'
			},
			{
				protocol: 'https',
				hostname: '*.stripe.com'
			},
			{
				protocol: 'https',
				hostname: '*.eartharoid.me'
			}
		]
	}
	// webpack: config => {
	// 	config.module.rules.push({
	// 		loader: 'node-loader',
	// 		test: /\.node$/
	// 	});
	// 	// config.externals.sharp = 'commonjs sharp';
	// 	return config;
	// }
	// webpack: config => { // { buildId, dev, isServer, defaultLoaders, webpack }
	// 	/*
	// 	 * Note: we provide webpack above so you should not `require` it
	// 	 * Perform customizations to webpack config
	// 	 */
	// 	const plugin = new FilterWarningsPlugin({
	// 		exclude: [
	// 			/mongodb/,
	// 			/mssql/,
	// 			/mysql/,
	// 			/mysql2/,
	// 			/oracledb/,
	// 			/pg/,
	// 			/pg-native/,
	// 			/pg-query-stream/,
	// 			/react-native-sqlite-storage/,
	// 			/redis/,
	// 			/sqlite3/,
	// 			/sql.js/,
	// 			/typeorm-aurora-data-api-driver/
	// 		]
	// 	});

	// 	config.plugins.push(plugin);

	// 	config.resolve.alias = {
	// 		...config.resolve.alias,
	// 	};

	// 	// Important: return the modified config
	// 	return config;
	// }
};

module.exports = nextConfig;