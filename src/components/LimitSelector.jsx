const LimitSelector = ({ limit, onLimitChange }) => {
	return (
		<div className='flex items-center shrink-0'>
			<label
				htmlFor='limit'
				className='font-bold'
			>
				Number of Coins:
			</label>
			<select
				id='limit'
				value={limit}
				onChange={(e) => onLimitChange(e.target.value)}
				className='ml-2 bg-[#1c1f26] text-white rounded-md p-2'
			>
				<option value={10}>10</option>
				<option value={20}>20</option>
				<option value={50}>50</option>
			</select>
		</div>
	);
};

export default LimitSelector;
