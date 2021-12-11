// https://github.com/leerob/nextjs-aws-dynamodb

import aws from 'aws-sdk';

export const ddb = new aws.DynamoDB({
	accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID,
	region: process.env.DYNAMODB_REGION,
	secretAccessKey: process.env.DYNAMODB_ACCESS_KEY_SECRET
});
