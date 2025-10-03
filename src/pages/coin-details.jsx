import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import Spinner from "../components/Spinner";
import CoinChart from "../components/CoinChart";

const API_URL = import.meta.env.VITE_COIN_URL;

const CoinDetailPage = () => {
	const { id } = useParams();
	const [coin, setCoin] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCoinData = async () => {
			try {
				const res = await fetch(`${API_URL}/${id}`);
				if (!res.ok) throw new Error("Failed to fetch data");
				const data = await res.json();
				setCoin(data);
			} catch (err) {
				console.log(err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchCoinData();
	}, [id]);

	return (
		<div
			className='max-w-[700px] mx-auto mt-10 mb-10 text-center p-5 font-sans text-[#fff] bg-[#161b22] rounded-lg shadow-lg;
'
		>
			<Link
				to='/'
				className='nav-link'
			>
				Back to Home
			</Link>
			<h1 className='mt-6'>
				{coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : "Loading..."}
			</h1>

			{loading && <Spinner />}
			{error && <div className='error'>❌ {error}</div>}

			{!loading && !error && (
				<>
					<img
						src={coin.image.large}
						alt={coin.name}
						width={120}
						height={120}
						className='mx-auto mb-4'
					/>

					<p>{coin.description.en.split(". ")[0] + "."}</p>

					<div className='my-8'>
						<CoinChart coinID={coin.id} />
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						{/* Rank */}
						<div className='stat-card'>
							<span className='text-sm text-gray-400'>Rank</span>
							<span className='text-lg font-semibold text-white'>
								#{coin.market_cap_rank}
							</span>
						</div>

						{/* Current Price */}
						<div className='stat-card'>
							<span className='text-sm text-gray-400'>Current Price</span>
							<span className='text-lg font-semibold text-white'>
								${coin.market_data.current_price.usd.toLocaleString()}
							</span>
						</div>

						{/* Market Cap */}
						<div className='stat-card'>
							<span className='text-sm text-gray-400'>Market Cap</span>
							<span className='text-lg font-semibold text-white'>
								${coin.market_data.market_cap.usd.toLocaleString()}
							</span>
						</div>

						{/* 24h High */}
						<div className='stat-card'>
							<span className='text-sm text-gray-400'>24h High</span>
							<span className='text-lg font-semibold text-green-400'>
								${coin.market_data.high_24h.usd.toLocaleString()}
							</span>
						</div>

						{/* 24h Low */}
						<div className='stat-card'>
							<span className='text-sm text-gray-400'>24h Low</span>
							<span className='text-lg font-semibold text-red-400'>
								${coin.market_data.low_24h.usd.toLocaleString()}
							</span>
						</div>

						{/* 24h Price Change */}
						<div className='stat-card'>
							<span className='text-sm text-gray-400'>24h Price Change</span>
							<span
								className={`text-lg font-semibold ${
									coin.market_data.price_change_percentage_24h > 0
										? "text-green-400"
										: "text-red-400"
								}`}
							>
								${coin.market_data.price_change_24h.toFixed(2)} (
								{coin.market_data.price_change_percentage_24h.toFixed(2)}%)
							</span>
						</div>

						{/* Circulating Supply */}
						<div className='stat-card'>
							<span className='text-sm text-gray-400'>Circulating Supply</span>
							<span className='text-lg font-semibold text-white'>
								{coin.market_data.circulating_supply.toLocaleString()}
							</span>
						</div>

						{/* Total Supply */}
						<div className='stat-card'>
							<span className='text-sm text-gray-400'>Total Supply</span>
							<span className='text-lg font-semibold text-white'>
								{coin.market_data.total_supply
									? coin.market_data.total_supply.toLocaleString()
									: "N/A"}
							</span>
						</div>

						{/* All Time High */}
						<div className='stat-card'>
							<span className='text-sm text-gray-400'>All Time High</span>
							<span className='text-lg font-semibold text-green-400'>
								${coin.market_data.ath.usd.toLocaleString()}
							</span>
						</div>

						{/* All Time Low */}
						<div className='stat-card'>
							<span className='text-sm text-gray-400'>All Time Low</span>
							<span className='text-lg font-semibold text-red-400'>
								${coin.market_data.atl.usd.toLocaleString()}
							</span>
						</div>

						{/* Last Updated */}
						<div className='stat-card'>
							<span className='text-sm text-gray-400'>Last Updated</span>
							<span className='text-lg font-medium text-gray-300'>
								{new Date(coin.last_updated).toLocaleDateString()}
							</span>
						</div>
					</div>

					<div className='space-y-3 mt-4 text-sm'>
						{coin.links.homepage[0] && (
							<p className='flex items-center gap-2'>
								<span>🌐</span>
								<a
									href={coin.links.homepage[0]}
									target='_blank'
									rel='noopener noreferrer'
									className='text-blue-600 hover:underline hover:text-blue-800 transition-colors'
								>
									Website
								</a>
							</p>
						)}

						{coin.links.blockchain_site[0] && (
							<p className='flex items-center gap-2'>
								<span>🧩</span>
								<a
									href={coin.links.blockchain_site[0]}
									target='_blank'
									rel='noopener noreferrer'
									className='text-blue-600 hover:underline hover:text-blue-800 transition-colors'
								>
									Blockchain Explorer
								</a>
							</p>
						)}

						{coin.categories.length > 0 && (
							<p className='text-gray-700'>
								<span className='font-medium text-gray-900'>Categories:</span>{" "}
								{coin.categories.join(", ")}
							</p>
						)}

						{!loading && !error && !coin && (
							<p className='text-gray-500 italic'>No data found</p>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default CoinDetailPage;
