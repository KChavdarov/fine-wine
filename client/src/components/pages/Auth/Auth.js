import {Outlet} from 'react-router';
import {NavLink} from 'react-router-dom';
import './Auth.scss';

export function Auth() {
    function className({isActive}) {
        return isActive ? 'auth-link active' : 'auth-link';
    };

    return (
        <section className='auth-page container' >
            <header className="section-header">
                <ul className="auth-link-list">
                    <li className="auth-link-list-item"><NavLink className={className} replace={true} to="/auth/login">Login</NavLink></li>
                    <li className="auth-link-list-item active"><NavLink className={className} replace={true} to="/auth/register">Register</NavLink></li>
                </ul>
            </header>

            <Outlet />

        </section>
    );
}