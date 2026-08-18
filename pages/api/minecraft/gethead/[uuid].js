// Proxies the composited head render (base + hat layer) from mc-heads.net;
// jimp can't run on Workers (its bundled PNG codec is incompatible with
// workerd's node:zlib). 32px matches the size the tables display at.
export default async (req, res) => {
	const { uuid } = req.query;

	if (!/^[0-9a-zA-Z-]{32,36}$/.test(uuid)) {
		res.send({ success: false });
		return;
	}

	try {
		const response = await fetch(`https://mc-heads.net/avatar/${uuid}/32`);
		if (!response.ok) throw new Error(`mc-heads responded ${response.status}`);
		const head = Buffer.from(await response.arrayBuffer());

		res.setHeader('Cache-Control', 'max-age=86400, public');
		res.writeHead(200, {
			'Content-Length': head.length,
			'Content-Type': 'image/png'
		});
		res.end(head);
	} catch (e) {
		res.send({ success: false });
		console.error(e);
	}
};
