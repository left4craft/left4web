import fetch from 'node-fetch';

export default async (req, res) => {
	const { uuid } = req.query;

	try {
		const response = await fetch('https://mc-heads.net/body/' + uuid + '/right/');
		const buffer = Buffer.from(await response.arrayBuffer());
		const b64 = buffer.toString('base64');
		// // res.setHeader('Content-Type', 'image/png');
		// const imageResp = Buffer.from(b64, 'base64');

		// res.writeHead(200, {
		// 	'Content-Length': imageResp.length
		// });
		res.setHeader('Cache-Control', 'max-age=86400, public');
		res.send('data:image/png;base64, ' + b64);
	} catch (e) {
		res.status(500).send('Error fetching skin');
	}
};
