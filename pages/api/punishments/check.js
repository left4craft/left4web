import { check } from '../../../utils/litebans';

// client-side ban search: /api/punishments/check?name=<username|uuid>
export default async (req, res) => {
	const { name } = req.query;
	if (!name) {
		return res.status(400).json({
			message: 'Missing Parameters',
			success: false
		});
	}

	try {
		const result = await check(name);
		res.setHeader('Cache-Control', 'max-age=60, public');
		return res.status(result.success ? 200 : 404).json(result);
	} catch (e) {
		console.error(e);
		return res.status(500).json({
			message: 'Internal server error',
			success: false
		});
	}
};
