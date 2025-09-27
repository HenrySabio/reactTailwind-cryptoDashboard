const LimitSelector = ({ limit, onLimitChange }) => {
    return (
        <div className="controls">
            <label htmlFor="limit">Number of Coins:</label>
            <select
                id="limit"
                value={limit}
                onChange={(e) => onLimitChange(e.target.value)}
            >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
            </select>
        </div>
    );
}
 
export default LimitSelector;