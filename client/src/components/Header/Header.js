import './Header.scss';
import {Link, NavLink} from 'react-router-dom';
import {menuItems} from './menuItems';
import {BsCart2, BsList, BsX, BsPerson, BsStar} from 'react-icons/bs';
import {ImGlass} from 'react-icons/im';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {selectUser} from '../../store/slices/userSlice';
import {selectCart} from '../../store/slices/cartSlice';
import {useEffect} from 'react/cjs/react.development';

export function Header({mainRef}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const {user} = useSelector(selectUser);
    const cart = useSelector(selectCart);
    const itemCount = Object.values(cart).reduce((a, c) => a + c, 0);

    useEffect(() => {
        const main = mainRef.current;
        const mainObserver = new IntersectionObserver(([main]) => {
            setIsScrolled(!main.isIntersecting);           
        }, {
            root: null,
            threshold: 0,
            rootMargin: '0px 0px -98% 0px'
        });

        mainObserver.observe(main);

        return () => {mainObserver.unobserve(main);};

    }, [mainRef]);

    let navLinks = [];

    if (user._id && user._isAdmin) {
        navLinks = menuItems.filter(i => i.type === 'admin');
    } else if (user._id) {
        navLinks = menuItems.filter(i => (i.type === 'public' || i.type === 'user'));
    } else {
        navLinks = menuItems.filter(i => (i.type === 'public' || i.type === 'guest'));
    }


    function toggleMenu() {
        setIsOpen(state => !state);
    }

    function closeMenu() {
        setIsOpen(false);
    }

    return (
        <header className={isScrolled ? 'site-header' : 'site-header scrolled'}>
            < div className="container">
                <nav className="site-navigation" >

                    <div className="nav-button menu-icon" ><button onClick={toggleMenu}>{isOpen ? <BsX /> : <BsList />}</button></div>
                    <ul className="navigation-items" onClick={closeMenu}>

                        {navLinks.filter(l => !l.mobileOnly).map(i => <li className="nav-link" key={i.title}><NavLink className={({isActive}) => isActive ? 'nav-active' : ''} to={i.url}>{i.title}</NavLink></li>)}
                    </ul>

                    <div className="site-logo" onClick={closeMenu}><Link to="/">Fine <ImGlass /> wine</Link></div>


                    <div className="nav-button" onClick={closeMenu}>
                        <div className="user-links">
                            <Link className="nav-icon-link" to="/user/favorites"><BsStar /><IconBadge>{user.favorites.length}</IconBadge></Link>
                            <Link className="nav-icon-link" to="/user/profile"><BsPerson /></Link>
                        </div>
                        <Link className="nav-icon-link" to="/cart"><BsCart2 /><IconBadge>{itemCount}</IconBadge></Link>
                    </div>

                </nav>

                <div className={isOpen ? 'mobile-menu active' : 'mobile-menu'} onClick={closeMenu}>
                    <ul className="mobile-menu-items" >
                        {navLinks.map(i => <li className="menu-link" key={i.title}><Link to={i.url}>{i.title}</Link></li>)}
                    </ul>
                </div>
            </div>
        </header >
    );
}

function IconBadge({children}) {
    return (
        children
            ? <div className="icon-badge"><span className="icon-badge-content">{children}</span></div>
            : null
    );
}