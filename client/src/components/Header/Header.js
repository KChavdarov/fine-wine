import './Header.scss';
import {Link, NavLink} from 'react-router-dom';
import {menuItems} from './menuItems';
import {BsCart2, BsList, BsX} from 'react-icons/bs';
import {ImGlass} from 'react-icons/im';
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
                <nav className="site-navigation" >

                    <div className="nav-button menu-icon" ><button onClick={toggleMenu}>{isOpen ? <BsX /> : <BsList />}</button></div>

                    <ul className="navigation-items" onClick={closeMenu}>
                        {menuItems.map(i => <li className="nav-link" key={i.title}><NavLink className={({isActive}) => isActive ? 'nav-active' : ''} to={i.url}>{i.title}</NavLink></li>)}
                    </ul>

                    <div className="site-logo" onClick={closeMenu}><Link to="/">Fine <ImGlass /> wine</Link></div>

                    <div className="nav-button" onClick={closeMenu}><Link to="/user/cart"><BsCart2 /></Link></div>

                </nav>

                <div className={isOpen ? 'mobile-menu active' : 'mobile-menu'} onClick={closeMenu}>
                    <ul className="mobile-menu-items" >
                        {menuItems.map(i => <li className="menu-link" key={i.title}><Link to={i.url}>{i.title}</Link></li>)}
                    </ul>
                </div>
            </div>
        </header >
    );
}