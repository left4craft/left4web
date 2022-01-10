import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';

export function InfoTable({
	data, success, type
}) {
	if(success === undefined) {
		return <>
			<p>Loading...</p>
		</>;
	}
	// let title = 'Bans';
	let action = 'Banned';

	if(type[1] === 'mutes') {
		// title = 'Mutes';
		action = 'Muted';
	} else if (type[1] === 'kicks') {
		// title = 'Kicks';
		action = 'Kicked';
	} else if (type[1] === 'warnings') {
		// title = 'Warnings';
		action = 'Warned';
	}
	const rows = [];
	for(let i = 0; i < data.result.length; i += 1) {
		rows.push(<InfoRow key={i} action={action} rowData={data.result[i]} />);
	}
	return <>
		<div className="flex items-center">
			<Link href='/punishments/bans/1' scroll={false} passHref>
				<button type="button" className="w-full border-l border-t border-b text-base font-medium rounded-l-md text-black bg-white hover:bg-gray-100 px-4 py-2">
					Bans
				</button>
			</Link>
			<Link href='/punishments/mutes/1' scroll={false} passHref>
				<button type="button" className="w-full border-l border-t border-b text-base font-medium rounded-l-md text-black bg-white hover:bg-gray-100 px-4 py-2">
					Mutes
				</button>
			</Link>
			<Link href='/punishments/kicks/1' scroll={false} passHref>
				<button type="button" className="w-full border-l border-t border-b text-base font-medium rounded-l-md text-black bg-white hover:bg-gray-100 px-4 py-2">
					Kicks
				</button>
			</Link>
			<Link href='/punishments/warnings/1' scroll={false} passHref>
				<button type="button" className="w-full border-l border-t border-b text-base font-medium rounded-l-md text-black bg-white hover:bg-gray-100 px-4 py-2">
					Warnings
				</button>
			</Link>
		</div>
		<style>{`
			.pixelated { image-rendering: pixelated;}
		`}</style>
		<table className="min-w-full border-collapse block md:table">
			<thead className="block md:table-header-group">
				<tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative ">
					<th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell w-48">Player</th>
					<th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell w-48">{`${action} by`}</th>
					<th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell w-96">Reason</th>
					<th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell w-96">Date</th>
					<th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell w-96">Expires</th>
				</tr>
			</thead>
			<tbody className="block md:table-row-group">
				{rows}
			</tbody>
		</table>
		<div className="flex items-center">
			<Link href={`/punishments/${type[1]}/${Math.max(1, data.pragnation.page)}`} scroll={false} passHref>
				<button type="button" className="w-full border-l border-t border-b text-base font-medium rounded-l-md text-black bg-white hover:bg-gray-100 px-4 py-2">
					Previous Page
				</button>
			</Link>
			<button type="button" className="w-full border text-base font-medium text-black bg-white hover:bg-gray-100 px-4 py-2">
				Page {data.pragnation.page+1}/{data.pragnation.pages+1}
			</button>
			<Link href={`/punishments/${type[1]}/${Math.min(data.pragnation.pages+1, data.pragnation.page+2)}`} scroll={false} passHref>
				<button type="button" className="w-full border-l border-t border-b text-base font-medium rounded-l-md text-black bg-white hover:bg-gray-100 px-4 py-2">
					Next Page
				</button>
			</Link>
		</div>
	</>;

}

InfoTable.propTypes = {
	data: PropTypes.object,
	success: PropTypes.bool,
	type: PropTypes.array
};

export function InfoRow({
	action, rowData
}) {
	let removed_by = '';
	if(rowData.removed_by_name === '#expired') {
		removed_by = ' (Expired)';
	} else if (rowData.removed_by_name !== null) {
		removed_by = ' (Removed by ' + rowData.removed_by_name + ')';
	}
	return(
		<tr className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
			<td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Player</span><span className='md:hidden'>{rowData.name}</span><div className="items-center hidden md:flex">
				<div className='mr-2'><Image src={`/api/minecraft/gethead/${rowData.uuid}`} height={32} width={32} className='pixelated rounded-md' draggable={false} unoptimized/></div>{rowData.name}</div></td>
			<td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">{`${action} by`}</span><span className='md:hidden'>{rowData.banned_by}</span><div className="items-center hidden md:flex">
				<div className='mr-2'><Image src={rowData.banned_by_uuid === 'CONSOLE' ? '/images/console.png' : `/api/minecraft/gethead/${rowData.banned_by_uuid}`} height={32} width={32} className='pixelated rounded-md' draggable={false} unoptimized/></div>{rowData.banned_by}</div></td>
			<td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Reason</span>{rowData.reason}</td>
			<td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Date</span>{new Date(rowData.time).toLocaleString()}</td>
			<td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Expires</span>{(rowData.until === -1 ? 'Permanent' : new Date(rowData.until).toLocaleString()) + removed_by}</td>
		</tr>
	);
}

InfoRow.propTypes = {
	action: PropTypes.string,
	rowData: PropTypes.object
};
// banned_by: PropTypes.string,
// banned_by_uuid: PropTypes.string,
// id: PropTypes.number,
// name: PropTypes.string,
// reason: PropTypes.string,
// removed_by_name: PropTypes.string,
// removed_by_uuid: PropTypes.string,
// time: PropTypes.number,
// uuid: PropTypes.string
