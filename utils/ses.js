import { AwsClient } from 'aws4fetch';

// Sends via the SES v2 HTTP API — nodemailer/SMTP doesn't work on Workers.
// Uses an IAM user scoped to ses:SendEmail only.
export async function sendEmail({ to, subject, text, html }) {
	const region = process.env.SES_REGION || 'us-east-1';
	const aws = new AwsClient({
		accessKeyId: process.env.SES_ACCESS_KEY_ID,
		region: region,
		secretAccessKey: process.env.SES_SECRET_ACCESS_KEY,
		service: 'ses'
	});

	const body = {
		Content: {
			Simple: {
				Body: {
					...(html && { Html: { Data: html } }),
					...(text && { Text: { Data: text } })
				},
				Subject: { Data: subject }
			}
		},
		Destination: { ToAddresses: [to] },
		FromEmailAddress: process.env.EMAIL_FROM
	};

	const res = await aws.fetch(`https://email.${region}.amazonaws.com/v2/email/outbound-emails`, {
		body: JSON.stringify(body),
		headers: { 'Content-Type': 'application/json' },
		method: 'POST'
	});

	if (!res.ok) {
		throw new Error(`SES send failed (${res.status}): ${await res.text()}`);
	}
}
