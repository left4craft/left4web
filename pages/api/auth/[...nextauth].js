import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import DiscordProvider from 'next-auth/providers/discord';

import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { DynamoDBAdapter } from '@next-auth/dynamodb-adapter';

const config = {
	credentials: {
		accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID,
		secretAccessKey: process.env.DYNAMODB_ACCESS_KEY_SECRET
	},
	region: process.env.DYNAMODB_REGION
};

const client = DynamoDBDocument.from(new DynamoDB(config), {
	marshallOptions: {
		convertClassInstanceToMap: true,
		convertEmptyValues: true,
		removeUndefinedValues: true
	}
});

export default NextAuth({
	adapter: DynamoDBAdapter(
		client,
		{ tableName: process.env.DYNAMODB_NEXTAUTH_TABLE }
	),
	// https://github.com/nextauthjs/next-auth/discussions/4445
	callbacks: {
		async redirect(params) {
			const { url } = params;

			// url is just a path, e.g.: /videos/pets
			if (!url.startsWith('http')) return url;

			// If we have a callback use only its relative path
			const callbackUrl = new URL(url).searchParams.get('callbackUrl');
			if (!callbackUrl) return url;

			return new URL(callbackUrl).pathname;
		}
	},
	jwt: {
		signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
		verificationOptions: { algorithms: ['HS512'] }
	},
	// Configure one or more authentication providers
	providers: [
		EmailProvider({
			from: process.env.EMAIL_FROM,
			server: {
				auth: {
					pass: process.env.EMAIL_SERVER_PASSWORD,
					user: process.env.EMAIL_SERVER_USER
				},
				host: process.env.EMAIL_SERVER_HOST,
				port: process.env.EMAIL_SERVER_PORT
			}
		}),
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET
		})    // ...add more providers here
	],
	secret: process.env.NEXTAUTH_SECRET,
	site: process.env.NEXTAUTH_URL
});
