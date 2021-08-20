const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

module.exports = {
	/*
	 * future: {
	 *   webpack5: true,
	 * },
	 */
	images: { domains: ['www.gravatar.com'] },
	target: 'serverless',
	webpack: config => { // { buildId, dev, isServer, defaultLoaders, webpack }
		/*
		 * Note: we provide webpack above so you should not `require` it
		 * Perform customizations to webpack config
		 */
		const plugin = new FilterWarningsPlugin({
			exclude: [
				/mongodb/,
				/mssql/,
				/mysql/,
				/mysql2/,
				/oracledb/,
				/pg/,
				/pg-native/,
				/pg-query-stream/,
				/react-native-sqlite-storage/,
				/redis/,
				/sqlite3/,
				/sql.js/,
				/typeorm-aurora-data-api-driver/
			]
		});

		config.plugins.push(plugin);

		// Important: return the modified config
		return config;
	}
};