import {useState} from 'react';



export function FilterGroup({category, fields}) {
    const [isOpen, setIsOpen] = useState(false);

    function getInitialState(options = [], selected = []) {
        const state = options.reduce((a, c) => {
            a[c] = selected.includes(c);
            return a;
        }, {});
        return state;
    }

    return (
        <fieldset className="filter-group">
            <p>{category}</p>
            {Object.entries(fields).map(([field, status]) => (
                <div key={field}>
                    <label htmlFor={field}>{field}</label>
                    <input type="checkbox" id={field} name={field} value={field} checked={status} />
                </div>
            ))}
        </fieldset>
    );
}