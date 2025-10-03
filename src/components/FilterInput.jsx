const FilterInput = ({ filter, onFilterChange }) => {
	return (
		<div className='flex-1 min-w-[200px]'>
			<input
				id='filter'
				type='text'
				value={filter}
				placeholder='Filter coins by name...'
				onChange={(e) => onFilterChange(e.target.value)}
				className='w-full p-2 rounded-2xl bg-[#1c1f26] text-white'
			/>
		</div>
	);
};

export default FilterInput;
