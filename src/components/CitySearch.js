import { useState, useEffect } from 'react';

const CitySearch = ({ allLocations, setCurrentCity }) => {
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [query, setQuery] = useState('');
	const [suggestions, setSuggestions] = useState([]);

	// use the stringified value of the allLocation prop as a dependency.
	// This way, if there’s a change in it (e.g.,
	// an empty array that gets filled), the useEffect code will be
	// re-executed again, ensuring that the local suggestions state is updated.
	useEffect(() => {
		setSuggestions(allLocations);
	}, [`${allLocations}`]);

	const handleInputChanged = (event) => {
		const value = event.target.value;
		const filteredLocations = allLocations
			? allLocations.filter((location) => {
					return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
			  })
			: [];

		setQuery(value);
		setSuggestions(filteredLocations);
	};

	const handleItemClicked = (event) => {
		const value = event.target.textContent;
		setQuery(value);
		setShowSuggestions(false); // to hide the list
		setCurrentCity(value);
	};

	return (
		<div id='city-search'>
			<input
				type='text'
				className='city'
				placeholder='Search for a city'
				value={query}
				onFocus={() => setShowSuggestions(true)}
				onChange={handleInputChanged}
			/>
			{showSuggestions ? (
				<ul className='suggestions'>
					{suggestions.map((suggestion) => {
						return (
							<li
								onClick={handleItemClicked}
								key={suggestion}>
								{suggestion}
							</li>
						);
					})}
					<li
						key='See all cities'
						onClick={handleItemClicked}>
						<b>See all cities</b>
					</li>
				</ul>
			) : null}
		</div>
	);
};

export default CitySearch;