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

	if(!success || data.result === undefined) {
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

	let removed_by = '';
	if(data.result.removed_by_name === '#expired') {
		removed_by = ' (Expired)';
	} else if (data.result.removed_by_name !== null) {
		removed_by = ' (Removed by ' + data.result.removed_by_name + ')';
	}

	return <>
		<style>{`
			.pixelated { image-rendering: pixelated;}
		`}</style>
		<div className="flex justify-center">
			<div className="w-11/12 max-w-lg h-1 bg-primary rounded-t-lg" />
		</div>
		<div className="flex justify-center text-white">
			<table className="table-auto w-11/12 max-w-lg border-4 border-primary">
				<tbody>
					<Link href={`/punishments/for/${data.result.uuid}`} passHref legacyBehavior>
						<tr className="hover:bg-light cursor-pointer">
							<td className="border border-light px-4 py-2">Player</td>
							<td className="border border-light px-4 py-2">
								<div className="flex items-center">
									<Image src={`/api/minecraft/gethead/${data.result.uuid}`} height={32} width={32} className='pixelated rounded-md' draggable={false} unoptimized/>
									<div className="px-2">
										{data.result.name}
									</div>
								</div>
							</td>
						</tr>
					</Link>
					<Link
						href={`/punishments/by/${data.result.banned_by_uuid}`}
						passHref
						legacyBehavior>
						<tr className="hover:bg-light cursor-pointer">
							<td className="border border-light px-4 py-2">{action} by</td>
							<td className="border border-light px-4 py-2">
								<div className="flex items-center">
									<Image src={data.result.banned_by_uuid === 'CONSOLE' ? '/images/console.png' : `/api/minecraft/gethead/${data.result.banned_by_uuid}`} height={32} width={32} className='pixelated rounded-md' draggable={false} unoptimized/>
									<div className="px-2">
										{data.result.banned_by}
									</div>
								</div>
							</td>
						</tr>
					</Link>
					<tr className="hover:bg-light">
						<td className="border border-light px-4 py-2">Reason</td>
						<td className="border border-light px-4 py-2">{data.result.reason}</td>
					</tr>
					<tr className="hover:bg-light">
						<td className="border border-light px-4 py-2">Date</td>
						<td className="border border-light px-4 py-2">{new Date(data.result.time).toLocaleString()}</td>
					</tr>
					<tr className="hover:bg-light">
						<td className="border border-light px-4 py-2">Expires</td>
						<td className="border border-light px-4 py-2">{new Date(data.result.until).toLocaleString() + removed_by}</td>
					</tr>
					<tr className="hover:bg-light">
						<td className="border border-light px-4 py-2">Origin Server</td>
						<td className="border border-light px-4 py-2">{data.result.server_origin}</td>
					</tr>
				</tbody>
			</table>

		</div>
		<div className="flex justify-center">
			<div className="w-11/12 max-w-lg h-1 bg-primary rounded-b-lg" />
		</div>
		<div className="h-8" />
		<div className="h-16 flex justify-center text-white">
			<Link href="/punishments" passHref legacyBehavior>
				<button className="bg-light hover:bg-secondary h-12 px-8 rounded-lg focus:outline-none transition ease-in duration-200">Back to List</button>
			</Link>
		</div>

	</>;
}

InfoTable.propTypes = {
	data: PropTypes.object,
	success: PropTypes.bool,
	type: PropTypes.array
};
