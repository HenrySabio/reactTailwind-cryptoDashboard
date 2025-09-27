import { useState, useEffect } from 'react';
import CoinCard from './components/CoinCard';
const API_URL = import.meta.env.VITE_API_URL;

const app = () => {

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(`${API_URL}&order=market_cap_desc&per_page=10&page=1&sparkline=false`);
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
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </main>
      )}
    </div>
  );
}

export default app;