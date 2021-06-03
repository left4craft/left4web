import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const { DynamoDBAdapter } = require('../../../utils/nextauth_db_adapter');

export default NextAuth({
	adapter: DynamoDBAdapter(),
	jwt: {
		signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
		verificationOptions: { algorithms: ['HS512'] }
	},
	// Configure one or more authentication providers
	providers: [
		Providers.Discord({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET
		})    // ...add more providers here
	]
});
