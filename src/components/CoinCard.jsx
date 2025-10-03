import { Link } from "react-router";

const CoinCard = ({ coin, idx, mounted }) => {
	return (
		<Link
			to={`/coin/${coin.id}`}
			className='block'
		>
			<div
				className={[
					"relative z-0 bg-[#161b22] rounded-2xl shadow-md hover:shadow-xl",
					"p-5 flex flex-col cursor-pointer",
					// animation
					"opacity-0 will-change-transform",
					"animate-[fadeInUp_0.5s_ease-out_forwards]",
					// respect reduced motion
					"motion-reduce:animate-none motion-reduce:opacity-100",
					// hover effect
					"hover:-translate-y-1 hover:scale-[1.02] transition-transform duration-200 ease-in-out",
				].join(" ")}
				style={{
					animationDelay: `${idx * 80}ms`, // tweak spacing
				}}
			>
				<div className='flex items-center gap-4 mb-4'>
					<img
						src={coin.image}
						alt={coin.name}
						className='coin-image'
						width={40}
						height={40}
					/>
					<div>
						<h2 className='text-3xl font-semibold'>{coin.name}</h2>
						<p className='text-[0.9rem] text-gray-400'>{coin.symbol.toUpperCase()}</p>
					</div>
				</div>
				<p>${coin.current_price.toLocaleString()}</p>
				<p className={coin.current_price > 1000 ? "positive" : "negative"}>
					{coin.price_change_percentage_24h.toFixed(2)}%
				</p>
				<p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
			</div>
		</Link>
	);
};

export default CoinCard;
