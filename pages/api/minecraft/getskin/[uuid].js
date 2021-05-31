const fetch = require('node-fetch');

export default async (req, res) => {
    const { uuid } = req.query;

    try {
        const response = await fetch('https://mc-heads.net/body/' + uuid + '/right/');
        const buffer = await response.buffer();
        res.send(buffer);
    } catch (e) {
        res.status(500).send('Error fetching skin');
    }
}
