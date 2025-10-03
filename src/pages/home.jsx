import CoinCard from "../components/CoinCard";
import LimitSelector from "../components/LimitSelector";
import FilterInput from "../components/FilterInput";
import SortSelector from "../components/SortSelector";
import Spinner from "../components/Spinner";

const Homepage = ({
	coins,
	loading,
	filter,
	setFilter,
	limit,
	setLimit,
	sortBy,
	setSortBy,
	error,
}) => {
	const filteredCoins = coins
		.filter(
			(coin) =>
				coin.name.toLowerCase().includes(filter.toLowerCase()) ||
				coin.symbol.toLowerCase().includes(filter.toLowerCase())
		)
		.slice()
		.sort((a, b) => {
			switch (sortBy) {
				case "market_cap_asc":
					return a.market_cap - b.market_cap;
				case "market_cap_desc":
					return b.market_cap - a.market_cap;
				case "price_asc":
					return a.current_price - b.current_price;
				case "price_desc":
					return b.current_price - a.current_price;
				case "change_asc":
					return a.price_change_percentage_24h - b.price_change_percentage_24h;
				case "change_desc":
					return b.price_change_percentage_24h - a.price_change_percentage_24h;
			}
		});

	return (
		<div className='min-h-screen'>
			<h1 className='text-4xl font-bold mb-8 block'>Welcome to the Dashboard</h1>

			<div className='flex justify-between items-center mb-8 gap-4 flex-wrap'>
				<FilterInput
					filter={filter}
					onFilterChange={setFilter}
				/>
				<SortSelector
					sortBy={sortBy}
					onSortChange={setSortBy}
				/>
				<LimitSelector
					limit={limit}
					onLimitChange={setLimit}
				/>
			</div>

			{loading && <Spinner color='white' />}
			{error && <p className='text-center mt-4 text-red-500 block'>Error: {error}</p>}

			{!loading && !error && (
				<main className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
					{filteredCoins.length > 0 ? (
						filteredCoins.map((coin, idx) => (
							<CoinCard
								key={coin.id}
								coin={coin}
								idx={idx}
							/>
						))
					) : (
						<p className='text-center mt-4'>No matching coins</p>
					)}

				</main>
			)}
		</div>
	);
};

export default Homepage;
