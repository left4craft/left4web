/* eslint-disable max-lines */
import {
	createHash, randomBytes
} from 'crypto';
import AWS from 'aws-sdk';

/*
 * import { Profile, Session, User } from "next-auth"
 * import { Adapter } from "next-auth/adapters"
 */

export const DynamoDBAdapter = () => {
	const TableName = process.env.AWS_DYNAMODB_NEXTAUTH_TABLE;

	AWS.config.update({
		accessKeyId: process.env.AWS_DYNAMODB_ACCESS_KEY_ID,
		region: process.env.AWS_DYNAMODB_REGION,
		secretAccessKey: process.env.AWS_DYNAMODB_ACCESS_KEY_SECRET
	});

	return {
		async getAdapter({
			session, secret, ...appOptions
		}) {
			const sessionMaxAge = session.maxAge * 1000; // default is 30 days
			const sessionUpdateAge = session.updateAge * 1000; // default is 1 day

			const client = new AWS.DynamoDB.DocumentClient();

			/**
			 * @todo Move this to core package
			 * @todo Use bcrypt or a more secure method
			 */
			const hashToken = token =>
				createHash('sha256').update(`${token}${secret}`).digest('hex');

			return {
				async createSession(user) {
					let expires = null;
					if (sessionMaxAge) {
						const dateExpires = new Date();
						dateExpires.setTime(dateExpires.getTime() + sessionMaxAge);
						expires = dateExpires.toISOString();
					}

					const sessionToken = randomBytes(32).toString('hex');
					const accessToken = randomBytes(32).toString('hex');

					const now = new Date();

					const item = {
						GSI1PK: `SESSION#${sessionToken}`,
						GSI1SK: `SESSION#${sessionToken}`,
						accessToken,
						createdAt: now.toISOString(),
						expires,
						pk: `USER#${user.id}`,
						sessionToken,
						sk: `SESSION#${sessionToken}`,
						type: 'SESSION',
						updatedAt: now.toISOString(),
						userId: user.id
					};

					await client.put({
						Item: item,
						TableName
					}).promise();
					return item;
				},
				async createUser(profile) {
					const userId = randomBytes(16).toString('hex');
					const now = new Date();
					const item = {
						createdAt: now.toISOString(),
						email: profile.email,
						emailVerified: profile.emailVerified?.toISOString() ?? null,
						id: userId,
						image: profile.image,
						name: profile.name,
						pk: `USER#${userId}`,
						sk: `USER#${userId}`,
						type: 'USER',
						updatedAt: now.toISOString(),
						username: profile.username
					};

					if (profile.email) {
						item.GSI1SK = `USER#${profile.email}`;
						item.GSI1PK = `USER#${profile.email}`;
					}

					await client.put({
						Item: item,
						TableName
					}).promise();
					return item;
				},
				async createVerificationRequest(identifier, url, token, _, provider) {
					const { baseUrl } = appOptions;
					const {
						sendVerificationRequest, maxAge
					} = provider;

					const hashedToken = hashToken(token);

					let expires = null;
					if (maxAge) {
						const dateExpires = new Date();
						dateExpires.setTime(dateExpires.getTime() + maxAge * 1000);

						expires = dateExpires.toISOString();
					}

					const now = new Date();

					const item = {
						createdAt: now.toISOString(),
						expires: expires === null ? null : expires,
						identifier,
						pk: `VR#${identifier}`,
						sk: `VR#${hashedToken}`,
						token: hashedToken,
						type: 'VR',
						updatedAt: now.toISOString()
					};

					await client.put({
						Item: item,
						TableName
					}).promise();

					await sendVerificationRequest({
						baseUrl,
						identifier,
						provider,
						token,
						url
					});

					return item;
				},
				async deleteSession(sessionToken) {
					const data = await client
						.query({
							ExpressionAttributeNames: {
								'#gsi1pk': 'GSI1PK',
								'#gsi1sk': 'GSI1SK'
							},
							ExpressionAttributeValues: {
								':gsi1pk': `SESSION#${sessionToken}`,
								':gsi1sk': `SESSION#${sessionToken}`
							},
							IndexName: 'GSI1',
							KeyConditionExpression: '#gsi1pk = :gsi1pk AND #gsi1sk = :gsi1sk',
							TableName
						})
						.promise();

					if (data?.Items?.length <= 0) return null;

					const infoToDelete = data.Items[0];

					const deleted = await client
						.delete({
							Key: {
								pk: infoToDelete.pk,
								sk: infoToDelete.sk
							},
							TableName
						})
						.promise();

					return deleted;
				},
				async deleteUser(userId) {
					const deleted = await client
						.delete({
							Key: {
								pk: `USER#${userId}`,
								sk: `USER#${userId}`
							},
							TableName
						})
						.promise();

					return deleted;
				},
				async deleteVerificationRequest(identifier, token) {
					return await client
						.delete({
							Key: {
								pk: `VR#${identifier}`,
								sk: `VR#${hashToken(token)}`
							},
							TableName
						})
						.promise();
				},
				displayName: 'DYNAMODB',
				async getSession(sessionToken) {
					const data = await client
						.query({
							ExpressionAttributeNames: {
								'#gsi1pk': 'GSI1PK',
								'#gsi1sk': 'GSI1SK'
							},
							ExpressionAttributeValues: {
								':gsi1pk': `SESSION#${sessionToken}`,
								':gsi1sk': `SESSION#${sessionToken}`
							},
							IndexName: 'GSI1',
							KeyConditionExpression: '#gsi1pk = :gsi1pk AND #gsi1sk = :gsi1sk',
							TableName
						})
						.promise();

					const session = data.Items[0] || null;

					if (session?.expires && new Date() > session.expires) {
						return null;
					}

					return session;
				},
				async getUser(id) {
					const data = await client
						.get({
							Key: {
								pk: `USER#${id}`,
								sk: `USER#${id}`
							},
							TableName
						})
						.promise();

					return data.Item || null;
				},
				async getUserByEmail(email) {
					const data = await client
						.query({
							ExpressionAttributeNames: {
								'#gsi1pk': 'GSI1PK',
								'#gsi1sk': 'GSI1SK'
							},
							ExpressionAttributeValues: {
								':gsi1pk': `USER#${email}`,
								':gsi1sk': `USER#${email}`
							},
							IndexName: 'GSI1',
							KeyConditionExpression: '#gsi1pk = :gsi1pk AND #gsi1sk = :gsi1sk',
							TableName
						})
						.promise();

					return data.Items[0] || null;
				},
				async getUserByProviderAccountId(providerId, providerAccountId) {
					const data = await client
						.query({
							ExpressionAttributeNames: {
								'#gsi1pk': 'GSI1PK',
								'#gsi1sk': 'GSI1SK'
							},
							ExpressionAttributeValues: {
								':gsi1pk': `ACCOUNT#${providerAccountId}`,
								':gsi1sk': `ACCOUNT#${providerId}`
							},
							IndexName: 'GSI1',
							KeyConditionExpression: '#gsi1pk = :gsi1pk AND #gsi1sk = :gsi1sk',
							TableName
						})
						.promise();

					if (!data || !data.Items.length) return null;

					const user = await client
						.get({
							Key: {
								pk: `USER#${data.Items[0].userId.toString()}`,
								sk: `USER#${data.Items[0].userId.toString()}`
							},
							TableName
						})
						.promise();

					return user.Item || null;
				},
				async getVerificationRequest(identifier, token) {
					const hashedToken = hashToken(token);

					const data = await client
						.get({
							Key: {
								pk: `VR#${identifier}`,
								sk: `VR#${hashedToken}`
							},
							TableName
						})
						.promise();

					if (data.Item?.expires && data.Item.expires < Date.now()) {
						// Delete the expired request so it cannot be used
						await client
							.delete({
								Key: {
									pk: `VR#${identifier}`,
									sk: `VR#${hashedToken}`
								},
								TableName
							})
							.promise();

						return null;
					}

					return data.Item || null;
				},
				async linkAccount(
					userId,
					providerId,
					providerType,
					providerAccountId,
					refreshToken,
					accessToken,
					accessTokenExpires
				) {
					const now = new Date();

					const item = {
						GSI1PK: `ACCOUNT#${providerAccountId}`,
						GSI1SK: `ACCOUNT#${providerId}`,
						accessToken,
						accessTokenExpires,
						createdAt: now.toISOString(),
						pk: `USER#${userId}`,
						providerAccountId,
						providerId,
						providerType,
						refreshToken,
						sk: `ACCOUNT#${providerId}#${providerAccountId}`,
						type: 'ACCOUNT',
						updatedAt: now.toISOString(),
						userId
					};

					await client.put({
						Item: item,
						TableName
					}).promise();
					return item;
				},
				async unlinkAccount(userId, providerId, providerAccountId) {
					const deleted = await client
						.delete({
							Key: {
								pk: `USER#${userId}`,
								sk: `ACCOUNT#${providerId}#${providerAccountId}`
							},
							TableName
						})
						.promise();

					return deleted;
				},
				async updateSession(session, force) {
					const shouldUpdate =
						sessionMaxAge &&
						(sessionUpdateAge || sessionUpdateAge === 0) &&
						session.expires;
					if (!shouldUpdate && !force) {
						return null;
					}

					/*
					 * Calculate last updated date, to throttle write updates to database
					 * Formula: ({expiry date} - sessionMaxAge) + sessionUpdateAge
					 *     e.g. ({expiry date} - 30 days) + 1 hour
					 *
					 * Default for sessionMaxAge is 30 days.
					 * Default for sessionUpdateAge is 1 hour.
					 */
					const dateSessionIsDueToBeUpdated = new Date(session.expires);
					dateSessionIsDueToBeUpdated.setTime(
						dateSessionIsDueToBeUpdated.getTime() - sessionMaxAge
					);
					dateSessionIsDueToBeUpdated.setTime(
						dateSessionIsDueToBeUpdated.getTime() + sessionUpdateAge
					);

					/*
					 * Trigger update of session expiry date and write to database, only
					 * if the session was last updated more than {sessionUpdateAge} ago
					 */
					const currentDate = new Date();
					if (currentDate < dateSessionIsDueToBeUpdated && !force) {
						return null;
					}

					const newExpiryDate = new Date();
					newExpiryDate.setTime(newExpiryDate.getTime() + sessionMaxAge);

					const data = await client
						.update({
							ExpressionAttributeNames: {
								'#expires': 'expires',
								'#updatedAt': 'updatedAt'
							},
							ExpressionAttributeValues: {
								':expires': newExpiryDate.toISOString(),
								':updatedAt': new Date().toISOString()
							},
							Key: {
								pk: session.pk,
								sk: session.sk
							},
							ReturnValues: 'UPDATED_NEW',
							TableName,
							UpdateExpression: 'set #expires = :expires, #updatedAt = :updatedAt'
						})
						.promise();

					return {
						...session,
						expires: data.Attributes.expires,
						updatedAt: data.Attributes.updatedAt
					};
				},
				async updateUser(user) {
					const now = new Date();
					const data = await client
						.update({
							ExpressionAttributeNames: {
								'#email': 'email',
								'#emailVerified': 'emailVerified',
								'#gsi1pk': 'GSI1PK',
								'#gsi1sk': 'GSI1SK',
								'#image': 'image',
								'#name': 'name',
								'#updatedAt': 'updatedAt',
								'#username': 'username'
							},
							ExpressionAttributeValues: {
								':email': user.email,
								':emailVerified': user.emailVerified?.toISOString() ?? null,
								':gsi1pk': `USER#${user.email.toString()}`,
								':gsi1sk': `USER#${user.email.toString()}`,
								':image': user.image,
								':name': user.name,
								':updatedAt': now.toISOString(),
								':username': user.username
							},
							Key: {
								pk: user.pk,
								sk: user.sk
							},
							ReturnValues: 'UPDATED_NEW',
							TableName,
							UpdateExpression: 'set #name = :name, #email = :email, #gsi1pk = :gsi1pk, #gsi1sk = :gsi1sk, #image = :image, #emailVerified = :emailVerified, #username = :username, #updatedAt = :updatedAt'

						})
						.promise();

					return {
						...user,
						...data.Attributes
					};
				}
			};
		}
	};
};
