import { useState, useEffect } from 'react';
const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

const app = () => {

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        console.log(data);

        setCoins(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to the Crypto Dashboard</h1>

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center mt-4 text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <main className="grid">
          {coins.map((coin) => (
            <div key={coin.id} className="coin-card">
              <div className="coin-header">
                <img src={coin.image} alt={coin.name} className="coin-image" />
                <div>
                  <h2>{coin.name}</h2>
                  <p className="symbol">{coin.symbol.toUpperCase()}</p>
                </div>
              </div>
              <p className={coin.current_price > 1000 ? "positive" : "negative"}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
              <p className="text-gray-600">Market Cap: ${coin.market_cap.toLocaleString()}</p>
            </div>
          ))}
        </main>
      )}
    </div>
  );
}

export default app;