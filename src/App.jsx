import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import Homepage from "./pages/home.jsx";
import AboutPage from "./pages/about.jsx";
import Header from "./components/Header.jsx";
import NotFound from "./pages/404.jsx";
import CoinDetailPage from "./pages/coin-details.jsx";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [limit, setLimit] = useState(10);
	const [filter, setFilter] = useState("");
	const [sortBy, setSortBy] = useState("market_cap_desc");

	useEffect(() => {
		const fetchCoins = async () => {
			try {
				const response = await fetch(
					`${API_URL}&order=${sortBy}&per_page=${limit}&page=1&sparkline=false`
				);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

				const data = await response.json();

				setCoins(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchCoins();
	}, [limit, sortBy]);

	return (
		<>
			<Header />
			<Routes>
				<Route
					path='/'
					element={
						<Homepage
							coins={coins}
							loading={loading}
							filter={filter}
							setFilter={setFilter}
							limit={limit}
							setLimit={setLimit}
							sortBy={sortBy}
							setSortBy={setSortBy}
							error={error}
						/>
					}
				/>
				<Route
					path='/about'
					element={<AboutPage />}
				/>
				<Route
					path='/coin/:id'
					element={<CoinDetailPage />}
				/>
				<Route
					path='*'
					element={<NotFound />}
				/>
			</Routes>
			<p className='col-span-full text-center mt-6 text-yellow-400 text-sm'>
				Note: This app uses a rate-limited API. If you see an error, please wait a few
				minutes before trying again.
			</p>
		</>
	);
};

export default App;
