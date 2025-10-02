const FilterInput = ({ filter, onFilterChange }) => {
	return (
		<div className='filter'>
			<input
				id='filter'
				type='text'
				value={filter}
				placeholder='Filter coins by name...'
				onChange={(e) => onFilterChange(e.target.value)}
			/>
		</div>
	);
};

export default FilterInput;
