import { Link } from "react-router";

const CoinCard = ({ coin }) => {
	return (
		<Link
			to={`/coin/${coin.id}`}
			className='absolute inset-0 z-10'
		>
			<div className='coin-card'>
				<div className='coin-header'>
					<img
						src={coin.image}
						alt={coin.name}
						className='coin-image'
					/>
					<div>
						<h2>{coin.name}</h2>
						<p className='symbol'>{coin.symbol.toUpperCase()}</p>
					</div>
				</div>
				<p className='price'>${coin.current_price.toLocaleString()}</p>
				<p className={coin.current_price > 1000 ? "positive" : "negative"}>
					{coin.price_change_percentage_24h.toFixed(2)}%
				</p>
				<p className='text-gray-600'>Market Cap: ${coin.market_cap.toLocaleString()}</p>
			</div>
		</Link>
	);
};

export default CoinCard;
