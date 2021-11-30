import './RangeGroup.scss';

export function RangeGroup({filters, rangeHandler}) {
    const minRange = filters.priceRange.min;
    const maxRange = filters.priceRange.max;
    const range = maxRange - minRange;
    const minPrice = filters.minPrice;
    const maxPrice = filters.maxPrice;
    // const minPrice = Math.min(filters.minPrice, filters.maxPrice);
    // const maxPrice = Math.max(filters.minPrice, filters.maxPrice);
    let left = ((minPrice - minRange) / range * 100) + '%';
    let right = ((maxRange - maxPrice) / range * 100) + '%';


    return (
        <div className="filter-group">
            <div className="slider-container">
                <input type="range" id="input-left" name="minPrice" min={minRange} max={maxRange} value={minPrice} onChange={rangeHandler} />
                <input type="range" id="input-right" name="maxPrice" min={minRange} max={maxRange} value={maxPrice} onChange={rangeHandler} />

                <div className="slider">
                    <div className="track"></div>
                    <div className="range" style={{left, right}}></div>
                    <div className="thumb left" style={{left}}></div>
                    <div className="thumb right" style={{right}}></div>
                </div>
            </div>
        </div>
    );
}