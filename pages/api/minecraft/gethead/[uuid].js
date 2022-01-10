import fetch from 'node-fetch';
const sharp = require('sharp');

export default async (req, res) => {
	const { uuid } = req.query;

	if(!/^[0-9a-zA-Z-]{32,36}$/.test(uuid)) {
		res.send({ success: false });
	}

	try {
		const response = await fetch('https://sessionserver.mojang.com/session/minecraft/profile/' + uuid);
		const data = await response.json();
		// const base64_string = JSON.stringify(data.properties.value);
		const base64_decoded = Buffer.from(data.properties[0].value, 'base64');
		const second_json = JSON.parse(base64_decoded);
		// data.success = true;

		const skin_url = second_json.textures.SKIN.url;
		const skin_response = await fetch(skin_url);
		const skin_arraybuf = await skin_response.arrayBuffer();
		const skin_buf = Buffer.from(skin_arraybuf);

		const edited_mask_buf = await sharp(skin_buf)
			.extract({
				height: 8,
				left: 40,
				top: 8,
				width: 8
			}).toBuffer();

		const edited_skin_buf = await sharp(skin_buf)
			.extract({
				height: 8,
				left: 8,
				top: 8,
				width: 8
			})
			.composite([
				{ input: edited_mask_buf }
			])
			.toBuffer();
		const skin_face = Buffer.from(edited_skin_buf);

		// res.send(skin_face);

		res.setHeader('Cache-Control', 'max-age=86400, public');
		res.writeHead(200, {
			'Content-Length': skin_face.length,
			'Content-Type': 'image/png'
		});
		res.end(skin_face);

	} catch (e) {
		res.send({ success: false });
	}
};
