import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend,
	TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, TimeScale);

const API_URL = import.meta.env.VITE_COIN_URL;

const CoinChart = ({ coinID }) => {
	const [chartData, setChartData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchChartData = async () => {
			try {
				const res = await fetch(`${API_URL}/${coinID}/market_chart?vs_currency=usd&days=7`);
				if (!res.ok) throw new Error("Failed to fetch chart data");
				const data = await res.json();

				const prices = data.prices.map((price) => ({
					x: price[0],
					y: price[1],
				}));

				setChartData({
					datasets: [
						{
							label: "Price in USD",
							data: prices,
							borderColor: "rgba(75, 192, 192, 1)",
							backgroundColor: "rgba(75, 192, 192, 0.2)",
							fill: true,
							pointRadius: 0,
							tension: 0.3,
						},
					],
				});
			} catch (err) {
				console.log(err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchChartData();
	}, [coinID]);

	if (loading) return <p>Loading Chart...</p>;

	return (
		<div style={{ marginTop: "30px" }}>
			<Line
				data={chartData}
				options={{
					responsive: true,
					plugins: {
						legend: { display: false },
						tooltip: { mode: "index", intersect: false },
					},
					scales: {
						x: {
							type: "time",
							time: {
								unit: "day",
							},
							ticks: {
								autoSkip: true,
								maxTicksLimit: 7,
							},
						},
						y: {
							ticks: {
								callback: (value) => `$${value.toLocaleString()}`,
							},
						},
					},
				}}
			/>
		</div>
	);
};

export default CoinChart;
