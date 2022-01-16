import PropTypes from 'prop-types';

export function SearchBar({ setErrorText }) {
	function search(mobile) {
		let type = document.getElementById('search-type').value;
		let query = document.getElementById('search-query').value;

		if(mobile) {
			type = document.getElementById('search-type-mobile').value;
			query = document.getElementById('search-query-mobile').value;
		}
		const query_request = new XMLHttpRequest();
		query_request.open('get',
			process.env.LITEBANS_API + '/check?name=' + query);

		query_request.send();
		query_request.onload = () => {
			try {
				const uuid_response = JSON.parse(query_request.response);

				if(uuid_response.success) {
					// redirect to /punishments/[type]/[uuid_response.result.uuid]/1
					window.location.href = `/punishments/${type}/${uuid_response.result.uuid}/1`;
				} else {
					setErrorText(uuid_response.message);
				}
			} catch (e) {
				setErrorText('Invalid response from API');
			}
		};
	}

	// there are two divs, one for mobile and one for desktop
	// yeah this is a hacky way to implement responsive design for the search bar
	// but I am too tired of dealing with css to merge them into one
	return <>
		<div className="text-white md:hidden block space-y-4">
			<div className="flex justify-center">
				<select id="search-type-mobile" className="h-8 border border-primary pl-2 pr-7 bg-light rounded-lg focus:outline-none">
					<option value={'for'}>
					Punishments for
					</option>
					<option value={'by'}>
					Punishments by
					</option>
				</select>
			</div>
			<div className="flex justify-center">
				<input id="search-query-mobile" type="search" placeholder="Username or UUID" className="h-8 border border-primary pl-2 pr-7 bg-light rounded-lg focus:outline-none" />
			</div>
			<div className="flex justify-center">
				<button id="search-mobile" onClick={() => search(true)} type="button" className="h-8 py-2 px-4 border border-primary pl-2 pr-7 bg-light rounded-lg focus:outline-none hover:bg-secondary transition ease-in duration-200">
				Search
				</button>
			</div>

		</div>

		<div className="text-white hidden md:flex justify-center">
			<select id="search-type" className="py-2 px-4 border-t border-l border-b border-primary  h-full pl-2 pr-7 bg-light rounded-l-lg focus:outline-none">
				<option value={'for'}>
					Punishments for
				</option>
				<option value={'by'}>
					Punishments by
				</option>
			</select>
			<input id="search-query" type="search" placeholder="Username or UUID" className="py-2 px-4 border-t border-b border-primary h-full pl-2 pr-7 bg-light focus:outline-none" />
			<button type="button" onClick={() => search(false)} id="search" className="py-2 px-4 border-t border-r border-b border-primary h-full pl-2 pr-7 bg-light rounded-r-lg focus:outline-none hover:bg-secondary transition ease-in duration-200">
				Search
			</button>
		</div>
	</>;

}

// client-side search functions
// mobile is whether the small search button was pressed

SearchBar.propTypes = { setErrorText: PropTypes.func };
