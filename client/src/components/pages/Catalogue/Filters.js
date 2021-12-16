import './Filters.scss';
import {CheckboxGroup} from './CheckboxGroup';
import {RangeGroup} from './RangeGroup';
import {useState} from 'react/cjs/react.development';
import {FaChevronDown, FaChevronUp} from 'react-icons/fa';

const omitFilters = ['minPrice', 'maxPrice', 'priceRange', 'page', 'perPage', 'sort'];

export function Filters({filters, handlers}) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleOpen() {
        setIsOpen(isOpen => !isOpen);
    }

    function closeOnInput(handler) {
        return function (event) {
            setIsOpen(false);
            handler(event);
        };
    }

    const content = Object.entries(filters)
        .filter(([category, fields]) => !(omitFilters.includes(category)))
        .map(([category, fields]) => <CheckboxGroup key={category} category={category} fields={fields} checkboxHandler={handlers.checkboxHandler} />);

    return (
        <section className="filters">
            <div className="section-header" onClick={toggleOpen}>
                <h4 className="heading">Filters</h4>
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <form className={isOpen ? 'filter-form active' : 'filter-form'} onSubmit={closeOnInput(handlers.filtersSubmitHandler)} >
                <div className="filters-groups-container">
                    <RangeGroup rangeHandler={handlers.rangeHandler} filters={filters} />
                    {content}
                </div>
                <div className="buttons">
                    <button className="button reset" onClick={closeOnInput(handlers.filtersResetHandler)} type="button" >Reset Filters</button>
                    <input className="button submit" type="submit" value="Update Filters" />
                </div>
            </form>

        </section >
    );
}