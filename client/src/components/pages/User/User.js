import {Outlet} from 'react-router-dom';

export function User() {
    return (
        <div className="container">
            <Outlet />
        </div>
    );
}