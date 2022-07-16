import PropTypes from 'prop-types';

import { toReadablePrice } from '../utils/readable_price';

export default function Cart(props) {
	const getTotalCost = () => {
		let cost = 0;
		// eslint-disable-next-line no-unused-vars
		for(const [_,
			product] of Object.entries(JSON.parse(props.cart))) {
			cost += product.price*product.quantity;
		}
		return cost;
	};

	return <>
		<table className="min-w-full border-4 border-primary border-collapse block md:table rounded-lg">
			<thead className="block md:table-header-group">
				<tr className="md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
					<th className="bg-primary p-2 text-white font-bold text-left block md:table-cell w-48">
						Item
					</th>
					<th className="bg-primary p-2 text-white font-bold text-left block md:table-cell w-48">
						Unit Price
					</th>
					<th className="bg-primary p-2 text-white font-bold text-left block md:table-cell w-48">
						Quantity
					</th>
					<th className="bg-primary p-2 text-white font-bold text-left block md:table-cell w-48">
						Total
					</th>
					{props.canRemove && <th className="bg-primary p-2 text-white font-bold text-left block md:table-cell w-48">
						Remove
					</th>}

				</tr>
			</thead>
			<tbody className="block md:table-row-group text-white">
				{Object.entries(JSON.parse(props.cart)).map(([id,
					product]) => <tr key={id} className="bg-dark hover:bg-light border border-light md:border-none block md:table-row">
					<td className="p-2 md:border md:border-light text-left block md:table-cell">
						<span className="inline-block w-1/3 md:hidden font-bold">Name</span>{product.name}
					</td>
					<td className="p-2 md:border md:border-light text-left block md:table-cell">
						<span className="inline-block w-1/3 md:hidden font-bold">Price</span>{toReadablePrice(product.price)}
					</td>
					<td className="p-2 md:border md:border-light text-left block md:table-cell">
						<span className="inline-block w-1/3 md:hidden font-bold">Quantity</span>{product.quantity}
					</td>
					<td className="p-2 md:border md:border-light text-left block md:table-cell">
						<span className="inline-block w-1/3 md:hidden font-bold">Total</span>{toReadablePrice(product.price*product.quantity)}
					</td>
					{props.canRemove && <td className="p-2 md:border md:border-light text-left block md:table-cell">
						<svg xmlns="http://www.w3.org/2000/svg" className="ml-4 h-8 w-8 hover:cursor-pointer hover:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => props.removeFromCart(product)}>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</td>}
				</tr>)}
			</tbody>
		</table>
		<div className="py-8 text-left text-white">
			<p>Subtotal: {toReadablePrice(getTotalCost(props.cart))}</p>
		</div>
	</>;
}

Cart.propTypes = {
	canRemove: PropTypes.bool,
	cart: PropTypes.string,
	removeFromCart: PropTypes.func
};
