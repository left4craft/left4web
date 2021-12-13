import fetch from 'node-fetch';

export default async (req, res) => {
	const { uuid } = req.query;

	try {
		const response = await fetch('https://mc-heads.net/body/' + uuid + '/right/');
		const buffer = Buffer.from(await response.arrayBuffer());
		res.setHeader('Content-Type', 'image/png');
		res.send(buffer);
	} catch (e) {
		res.status(500).send('Error fetching skin');
	}
};
