import './Header.scss';
import {Link} from 'react-router-dom';
import {menuItems} from './menuItems';
import {FaShoppingCart, FaBars, FaTimes} from 'react-icons/fa';
import {useState} from 'react';

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    function toggleMenu() {
        setIsOpen(state => !state);
    }

    function closeMenu() {
        setIsOpen(false);
    }

    return (
        <header className="site-header">
            <div className="container">
                <nav className="site-navigation">

                    <div className="nav-button menu-icon" onClick={toggleMenu} ><button>{isOpen ? <FaTimes /> : <FaBars />}</button></div>

                    <ul className={isOpen ? 'navigation-items active' : 'navigation-items'} onClick={closeMenu}>
                        {menuItems.map(i => <li className="nav-link" key={i.title}><Link to={i.url}>{i.title}</Link></li>)}
                    </ul>

                    <div className={isOpen ? 'menu-backdrop active' : 'menu-backdrop'} onClick={closeMenu}></div>

                    <div className="site-logo"><Link to="/">Fine Wine</Link></div>

                    <div className="nav-button"><Link to="/user/cart"><FaShoppingCart /></Link></div>

                </nav>
            </div>
        </header>
    );
}