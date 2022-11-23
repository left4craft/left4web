import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';

export function ListTable({
	data, success, type
}) {
	if(success === undefined) {
		return <>
			<p>Loading...</p>
		</>;
	}

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
		rows.push(<ListRow key={i} action={action} rowData={data.result[i]} type={type[1]} />);
	}
	return <>
		<div className="h-12 flex items-center text-white border-b border-primary text-base font-medium">
			<Link href='/punishments/bans/1' scroll={false} passHref legacyBehavior>
				<button type="button" className={`w-full rounded-tl-lg h-full px-4 transition ease-in duration-200 focus:outline-none ${type[1] === 'bans' ? 'bg-primary' : 'bg-light'} hover:bg-secondary`}>
					Bans
				</button>
			</Link>
			<Link href='/punishments/mutes/1' scroll={false} passHref legacyBehavior>
				<button type="button" className={`w-full h-full px-4 transition ease-in duration-200 focus:outline-none ${type[1] === 'mutes' ? 'bg-primary' : 'bg-light'} hover:bg-secondary`}>
					Mutes
				</button>
			</Link>
			<Link href='/punishments/kicks/1' scroll={false} passHref legacyBehavior>
				<button type="button" className={`w-full h-full px-4 transition ease-in duration-200 focus:outline-none ${type[1] === 'kicks' ? 'bg-primary' : 'bg-light'} hover:bg-secondary`}>
					Kicks
				</button>
			</Link>
			<Link href='/punishments/warnings/1' scroll={false} passHref legacyBehavior>
				<button type="button" className={`w-full rounded-tr-lg h-full px-4 transition ease-in duration-200 focus:outline-none ${type[1] === 'warnings' ? 'bg-primary' : 'bg-light'} hover:bg-secondary`}>
					Warnings
				</button>
			</Link>
		</div>
		<style>{`
			.pixelated { image-rendering: pixelated;}
		`}</style>
		<table className="min-w-full border-collapse block md:table border-primary border-4">
			<thead className="block md:table-header-group">
				<tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative ">
					<th className="bg-primary p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell w-48">Player</th>
					<th className="bg-primary p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell w-48">{`${action} by`}</th>
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
                href={`/punishments/${type[1]}/${Math.max(1, data.pragnation.page)}`}
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
                href={`/punishments/${type[1]}/${Math.min(data.pragnation.pages+1, data.pragnation.page+2)}`}
                scroll={false}
                passHref
                legacyBehavior>
				<button type="button" className="w-full text-base font-medium rounded-br-lg bg-light hover:bg-secondary h-full px-4 focus:outline-none transition ease-in duration-200">
					Next Page
				</button>
			</Link>
		</div>
	</>;

}

ListTable.propTypes = {
	data: PropTypes.object,
	success: PropTypes.bool,
	type: PropTypes.array
};

function ListRow({
	action, rowData, type
}) {
	let removed_by = '';
	if(rowData.removed_by_name === '#expired') {
		removed_by = ' (Expired)';
	} else if (rowData.removed_by_name !== null) {
		removed_by = ' (Removed by ' + rowData.removed_by_name + ')';
	}
	return (
        <Link href={`/punishments/${type}/info/${rowData.id}`} passHref legacyBehavior>
			<tr className="bg-dark cursor-pointer hover:bg-light border border-light md:border-none block md:table-row">
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

ListRow.propTypes = {
	action: PropTypes.string,
	rowData: PropTypes.object,
	type: PropTypes.string
};
