import './FormGroup.scss';
import {useEffect, useState} from 'react';
import {FaChevronDown, FaChevronUp} from 'react-icons/fa';

export function RangeGroup({filters, name, min, max, range, rangeHandler}) {
    const [isOpen, setIsOpen] = useState(false);
    const minRange = range.min;
    const maxRange = range.max;
    let left = ((min - minRange) / (maxRange - minRange) * 100) * 0.98 + '%';
    let right = ((maxRange - max) / (maxRange - minRange) * 100) * 0.98 + '%';

    useEffect(() => {
        setIsOpen(() => (min !== minRange) || (max !== maxRange));
    }, [max, maxRange, min, minRange, filters]);

    function toggleOpen() {
        setIsOpen(isOpen => !isOpen);
    }

    return (
        <div className="filter-group range-group">
            <div className="filter-group-header" onClick={toggleOpen}>
                <h5 className="filter-group-heading" >{name}</h5>
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div className={isOpen ? 'filter-group-content active' : 'filter-group-content'}>

                <div className="selection">
                    <div >Between: <span className={name}>{min}</span> - <span className={name}>{max}</span></div>
                </div>
                <div className="slider-container">
                    <input type="range" id="input-left" name={`min${name}`} min={minRange} max={maxRange} value={min} onChange={rangeHandler} />
                    <input type="range" id="input-right" name={`max${name}`} min={minRange} max={maxRange} value={max} onChange={rangeHandler} />

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