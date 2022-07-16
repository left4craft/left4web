import Link from 'next/link';
import PropTypes from 'prop-types';
import { toReadablePrice } from '../utils/readable_price';

export default function History(props) {
	return <>
		<table className="min-w-full border-4 border-primary border-collapse block md:table rounded-lg">
			<thead className="block md:table-header-group">
				<tr className="md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
					<th className="bg-primary p-2 text-white font-bold text-left block md:table-cell w-48">
						Time
					</th>
					<th className="bg-primary p-2 text-white font-bold text-left block md:table-cell w-48">
						Price
					</th>
					<th className="bg-primary p-2 text-white font-bold text-left block md:table-cell w-48">
						Refund
					</th>
					<th className="bg-primary p-2 text-white font-bold text-left block md:table-cell w-48">
						Recipt
					</th>
				</tr>
			</thead>
			<tbody className="block md:table-row-group text-white">
				{props.history.map(order => <tr key={order.id} className="bg-dark hover:bg-light border border-light md:border-none block md:table-row">
					<td className="p-2 md:border md:border-light text-left block md:table-cell">
						<span className="inline-block w-1/3 md:hidden font-bold">Time</span>{new Date(order.timestamp).toLocaleString()}
					</td>
					<td className="p-2 md:border md:border-light text-left block md:table-cell">
						<span className="inline-block w-1/3 md:hidden font-bold">Price</span>{toReadablePrice(order.amount)}
					</td>
					<td className="p-2 md:border md:border-light text-left block md:table-cell">
						<span className="inline-block w-1/3 md:hidden font-bold">Refund</span>{toReadablePrice(order.amount_refund)}
					</td>
					<td className="p-2 md:border md:border-light text-left block md:table-cell">
						<span className="inline-block w-1/3 md:hidden font-bold">Recipt</span><u><Link href={order.recipt}>View</Link></u>
					</td>
				</tr>)}
			</tbody>
		</table>
	</>;
}

History.propTypes = { history: PropTypes.object };

