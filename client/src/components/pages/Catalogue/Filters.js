import {CheckboxGroup} from './CheckboxGroup';
import './Filters.scss';
import {RangeGroup} from './RangeGroup';

export function Filters({filters, handlers}) {
    const content = Object.entries(filters)
        .filter(([category, fields]) => (category !== 'minPrice' && category !== 'maxPrice' && category !== 'priceRange'))
        .map(([category, fields]) => <CheckboxGroup key={category} category={category} fields={fields} checkboxHandler={handlers.checkboxHandler} />);

    return (
        <section className="filters">
            <h4>Filters</h4>
            <form onSubmit={handlers.filtersSubmitHandler}>
                <RangeGroup rangeHandler={handlers.rangeHandler} filters={filters} />
                {content}
                <input type="submit" value="Updated Filters" />
            </form>

        </section>
    );
}