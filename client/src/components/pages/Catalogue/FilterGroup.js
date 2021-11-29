import {useState} from 'react';

export function FilterGroup({category, fields, checkboxHandler}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <fieldset className="filter-group">
            <p>{category}</p>
            {Object.entries(fields).map(([field, status]) => (
                <div key={field}>
                    <label htmlFor={field}>{field}</label>
                    <input type="checkbox" id={field} name={field} value={field} checked={status} onChange={(event) => checkboxHandler(event, category)} />
                </div>
            ))}
        </fieldset>
    );
}