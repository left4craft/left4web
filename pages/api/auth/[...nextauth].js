import NextAuth from 'next-auth';
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
	jwt: {
		signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
		verificationOptions: { algorithms: ['HS512'] }
	},
	// Configure one or more authentication providers
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET
		})    // ...add more providers here
	]
});
