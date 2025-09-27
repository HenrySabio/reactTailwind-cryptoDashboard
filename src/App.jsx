import { useState, useEffect } from 'react';
import CoinCard from './components/CoinCard';
import LimitSelector from './components/LimitSelector';
import FilterInput from './components/FilterInput';
import SortSelector from './components/SortSelector';

const API_URL = import.meta.env.VITE_API_URL;

const app = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('market_cap_desc');

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(`${API_URL}&order=${sortBy}&per_page=${limit}&page=1&sparkline=false`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
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

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(filter.toLowerCase())
    || coin.symbol.toLowerCase().includes(filter.toLowerCase())
  )
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case 'market_cap_asc':
          return a.market_cap - b.market_cap;
        case 'market_cap_desc':
          return b.market_cap - a.market_cap;
        case 'price_asc':
          return a.current_price - b.current_price;
        case 'price_desc':
          return b.current_price - a.current_price;
        case 'change_asc':
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        case 'change_desc':
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
      }
    });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to the Crypto Dashboard</h1>

      <div className="top-controls">
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center mt-4 text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <main className="grid">
          {filteredCoins.length > 0 ? filteredCoins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          )) : (
            <p className="text-center mt-4">No matching coins</p>
          )}
        </main>
      )}
    </div>
  );
}

export default app;