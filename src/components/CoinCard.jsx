const CoinCard = ({ coin }) => {
    return (
        <div className="coin-card">
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
    );
}
 
export default CoinCard;