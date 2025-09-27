import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import Homepage from './pages/home.jsx';
import AboutPage from './pages/about.jsx';
import Header from './components/Header.jsx';

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


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={
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
        } />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
}

export default app;