import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';

export function HistoryTable({
	data, success, type
}) {
	if(success === undefined) {
		return <>
			<p>Loading...</p>
		</>;
	}
	// let title = 'Bans';
	// let action = 'Banned';

	// if(type[1] === 'mutes') {
	// 	// title = 'Mutes';
	// 	action = 'Muted';
	// } else if (type[1] === 'kicks') {
	// 	// title = 'Kicks';
	// 	action = 'Kicked';
	// } else if (type[1] === 'warnings') {
	// 	// title = 'Warnings';
	// 	action = 'Warned';
	// }
	if(!success || data.result.length === 0) {
		return <>
			<div className="h-16 flex justify-center text-white">
				<p>No results</p>
			</div>
			<div className="h-8" />
			<div className="h-16 flex justify-center text-white">
				<Link href="/punishments" passHref legacyBehavior>
					<button className="bg-light hover:bg-secondary h-12 px-8 rounded-lg focus:outline-none transition ease-in duration-200">Back to List</button>
				</Link>
			</div>
		</>;
	}
	const rows = [];
	for(let i = 0; i < data.result.length; i += 1) {
		rows.push(<HistoryRow key={i} action={'Punished'} rowData={data.result[i]} />);
	}
	return <>
		<div className="rounded-t-lg h-4 flex bg-primary items-center text-white border-b border-primary text-base font-medium">
		</div>
		<style>{`
			.pixelated { image-rendering: pixelated;}
		`}</style>
		<table className="min-w-full border-collapse block md:table border-primary border-4">
			<thead className="block md:table-header-group">
				<tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative ">
					<th className="bg-primary p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell w-48">Type</th>
					<th className="bg-primary p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell w-48">Player</th>
					<th className="bg-primary p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell w-48">Punished by</th>
					<th className="bg-primary p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell w-96">Reason</th>
					<th className="bg-primary p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell w-96">Date</th>
					<th className="bg-primary p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell w-96">Expires</th>
				</tr>
			</thead>
			<tbody className="block md:table-row-group text-white">
				{rows}
			</tbody>
		</table>
		<div className="flex items-center text-white h-12">
			<Link
				href={`/punishments/${type[1]}/${data.minecraft.uuid}/${Math.max(1, data.pragnation.page)}`}
				scroll={false}
				passHref
				legacyBehavior>
				<button type="button" className="w-full text-base font-medium rounded-bl-lg bg-light hover:bg-secondary h-full px-4 focus:outline-none transition ease-in duration-200">
					Previous Page
				</button>
			</Link>
			<button className="w-full text-base text-center font-medium bg-light h-full px-4 focus:outline-none cursor-default">
				Page {data.pragnation.page+1}/{data.pragnation.pages+1}
			</button>
			<Link
				href={`/punishments/${type[1]}/${data.minecraft.uuid}/${Math.min(data.pragnation.pages+1, data.pragnation.page+2)}`}
				scroll={false}
				passHref
				legacyBehavior>
				<button type="button" className="w-full text-base font-medium rounded-br-lg bg-light hover:bg-secondary h-full px-4 focus:outline-none transition ease-in duration-200">
					Next Page
				</button>
			</Link>
		</div>
		<div className="h-8" />
		<div className="h-16 flex justify-center text-white">
			<Link href="/punishments" passHref legacyBehavior>
				<button className="bg-light hover:bg-secondary h-12 px-8 rounded-lg focus:outline-none transition ease-in duration-200">Back to List</button>
			</Link>
		</div>
	</>;

}

HistoryTable.propTypes = {
	data: PropTypes.object,
	success: PropTypes.bool,
	type: PropTypes.array
};

function HistoryRow({
	action, rowData
}) {
	let removed_by = '';
	if(rowData.removed_by_name === '#expired') {
		removed_by = ' (Expired)';
	} else if (rowData.removed_by_name !== null) {
		removed_by = ' (Removed by ' + rowData.removed_by_name + ')';
	}
	let type = '';
	if(rowData.type === 'bans') {
		type = 'Ban';
	} else if(rowData.type === 'mutes') {
		type = 'Mute';
	} else if(rowData.type === 'kicks') {
		type = 'Kick';
	} else if(rowData.type === 'warnings') {
		type = 'Warning';
	}
	return (
		<Link
			href={`/punishments/${rowData.type}/info/${rowData.id}`}
			passHref
			legacyBehavior>
			<tr className="bg-dark cursor-pointer hover:bg-light border border-light md:border-none block md:table-row">
				<td className="p-2 md:border md:border-light text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Type</span>{type}</td>
				<td className="p-2 md:border md:border-light text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Player</span><span className='md:hidden'>{rowData.name}</span><div className="items-center hidden md:flex">
					<div className='mr-2'><Image src={`/api/minecraft/gethead/${rowData.uuid}`} height={32} width={32} className='pixelated rounded-md' draggable={false} unoptimized/></div>{rowData.name}</div></td>
				<td className="p-2 md:border md:border-light text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">{`${action} by`}</span><span className='md:hidden'>{rowData.banned_by}</span><div className="items-center hidden md:flex">
					<div className='mr-2'><Image src={rowData.banned_by_uuid === 'CONSOLE' ? '/images/console.png' : `/api/minecraft/gethead/${rowData.banned_by_uuid}`} height={32} width={32} className='pixelated rounded-md' draggable={false} unoptimized/></div>{rowData.banned_by}</div></td>
				<td className="p-2 md:border md:border-light text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Reason</span>{rowData.reason}</td>
				<td className="p-2 md:border md:border-light text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Date</span>{new Date(rowData.time).toLocaleString()}</td>
				<td className="p-2 md:border md:border-light text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Expires</span>{(rowData.until === -1 ? 'Permanent' : new Date(rowData.until).toLocaleString()) + removed_by}</td>
			</tr>
		</Link>
	);
}

HistoryRow.propTypes = {
	action: PropTypes.string,
	rowData: PropTypes.object
};
