import fetch from 'node-fetch';

export default async (req, res) => {
	const { name } = req.query;

	if(!/^[0-9a-zA-Z_]{1,16}$/.test(name)) {
		res.send({ success: false });
	}

	try {
		const response = await fetch('https://api.mojang.com/users/profiles/minecraft/' + name);
		const data = await response.json();
		data.success = true;
		res.setHeader('Cache-Control', 'max-age=3600, public');
		res.send(data);
	} catch (e) {
		res.send({ success: false });
	}
};
