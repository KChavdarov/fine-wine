import {FilterGroup} from './FilterGroup';
import './Filters.scss';

export function Filters({filters}) {
    const content = Object.entries(filters)
        .map(([category, fields]) => <FilterGroup key={category} category={category} fields={fields} />);

    return (
        <section className="filters">
            <h4>Filters</h4>

            <form>
                {content}
                <input type="submit" value="Updated Filters" />
            </form>

        </section>
    );
}