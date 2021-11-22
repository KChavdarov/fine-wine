import {Link} from 'react-router-dom';

export function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/catalogue">Catalogue</Link></li>
                    <li><Link to="/user/login">Login</Link></li>
                    <li><Link to="/user/register">Register</Link></li>
                </ul>
            </nav>
        </header>
    );
}