import './FormGroup.scss';
import {useState, useEffect} from 'react';
import {FaChevronDown, FaChevronUp} from "react-icons/fa";

export function RangeGroup({filters, rangeHandler}) {
    const [isOpen, setIsOpen] = useState(false);
    const minRange = filters.priceRange.min;
    const maxRange = filters.priceRange.max;
    const range = maxRange - minRange;
    const minPrice = filters.minPrice;
    const maxPrice = filters.maxPrice;
    let left = ((minPrice - minRange) / range * 100) * 0.98 + '%';
    let right = ((maxRange - maxPrice) / range * 100) * 0.98 + '%';

    useEffect(() => {
        const isSelected = (minPrice !== minRange) || (maxPrice !== maxRange);
        setIsOpen(isSelected);
    }, [minPrice, maxPrice, minRange, maxRange]);

    function toggleOpen() {
        setIsOpen(isOpen => !isOpen);
    }

    return (
        <div className="filter-group range-group">
            <div className="filter-group-header" onClick={toggleOpen}>
                <h5 className="filter-group-heading" >Price</h5>
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div className={isOpen ? 'filter-group-content active' : 'filter-group-content'}>

                <div className="selection">
                    <div >Between: <span className="price">&euro;{minPrice}</span> - <span className="price">&euro;{maxPrice}</span></div>
                </div>
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
        </div>
    );
}