import './FormGroup.scss';
import {useState} from 'react';
import {FaChevronDown, FaChevronUp} from "react-icons/fa";

export function CheckboxGroup({category, fields, checkboxHandler}) {
    const [isOpen, setIsOpen] = useState(Object.values(fields).some(status => status));

    function toggleOpen() {
        setIsOpen(isOpen => !isOpen);
    }

    return (
        <div className="filter-group">
            <div className="filter-group-header" onClick={toggleOpen}>
                <h5 className="filter-group-heading" >{category}</h5>
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div className={isOpen ? 'filter-group-content active' : 'filter-group-content'}>
                {Object.entries(fields).map(([field, status]) => (
                    <div className="check-group" key={field}>
                        <label htmlFor={field}>{field}
                            <input type="checkbox" id={field} name={field} value={field} checked={status} onChange={(event) => checkboxHandler(event, category)} />
                            <span className="checkMark"></span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}