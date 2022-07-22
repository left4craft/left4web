import fetch from 'node-fetch';

// https://github.com/serverless-nextjs/serverless-next.js/issues/523#issuecomment-720974242
export { default } from '.';


export async function getStaticProps({ params }) {
	const args = params.args || ['bans',
		'1'];

	// /punishments/[punishment]
	if(args[0] === 'bans'||
        args[0] === 'mutes' ||
        args[0] === 'kicks' ||
        args[0] === 'warnings') {
		if(args.length === 1) {
			args.push('1'); // default to viewing first page
		}

		// if argument is a number, then viewing /punishments/[punishment]/[page]
		if(/^[0-9]{1,5}$/.test(args[1])) {
			const response = await fetch(`${process.env.LITEBANS_API}/list?type=${args[0]}&page=${Number(args[1])-1}&perPage=15&apiKey=${process.env.LITEBANS_API_KEY}`);
			const data = await response.json();
			data.timestamp = Date.now();

			return {
				props: {
					data: data,
					success: true,
					type: ['list',
						args[0]]
				}, // will be passed to the page component as props
				revalidate: 300
			};

			// viewing /punishments/[punishment]/info/[id]
		} else if(args.length === 3 && args[1] === 'info' && /^[0-9]{1,5}$/.test(args[2])) {
			const response = await fetch(`${process.env.LITEBANS_API}/info?type=${args[0]}&id=${args[2]}&apiKey=${process.env.LITEBANS_API_KEY}`);
			const data = await response.json();

			data.timestamp = Date.now();
			return {
				props: {
					data: data,
					success: true,
					type: ['info',
						args[0],
						args[2]]
				}, // will be passed to the page component as props
				revalidate: 300
			};
		}
	}

	// /punishments/by/[uuid]/[page] or /punishments/for/[uuid]/[page]
	if((args[0] === 'by' || args[0] === 'for') &&
        args.length >= 2 &&
        (/^[0-9a-zA-Z-]{36}$/.test(args[1]) || args[1].toLowerCase() === 'console')) {

		// default to first page
		if(args.length === 2) {
			args.push('1');
		}

		// check page number is valid
		if(/^[0-9]{1,5}$/.test(args[2])) {
			const response = await fetch(`${process.env.LITEBANS_API}/history?type=${args[0]}&page=${Number(args[2])-1}&perPage=15&uuid=${args[1]}&apiKey=${process.env.LITEBANS_API_KEY}`);
			const data = await response.json();
			data.timestamp = Date.now();

			return {
				props: {
					data: data,
					success: true,
					type: ['history',
						args[0]]
				}, // will be passed to the page component as props
				revalidate: 300
			};

		}
	}

	return {
		props: { success: false },
		revalidate: 300
	};
}

export async function getStaticPaths() {
	return {
		fallback: true,
		paths: [
			'/punishments/bans/1',
			'/punishments/mutes/1',
			'/punishments/kicks/1',
			'/punishments/warnings/1'
		]
	};
}
