import fetch from 'node-fetch';


export default async (req, res) => {
	const { uuid } = req.query;
	const sharp = require("sharp");


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
		
		const edited_skin_buf = await sharp(skin_buf)
									.extract({ left: 8, top: 8, width: 8, height: 8 })
									.toBuffer();

		const skin_face = Buffer.from(edited_skin_buf).toString('base64');

		res.send(skin_face);
	} catch (e) {
		res.send({ success: false });
	}
};
