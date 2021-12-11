import fetch from 'node-fetch';

export default async (req, res) => {
	const { name } = req.query;

	try {
		const response = await fetch('https://api.mojang.com/users/profiles/minecraft/' + name);
		const data = await response.json();
		data.success = true;
		res.send(data);
	} catch (e) {
		res.send({ success: false });
	}
};
