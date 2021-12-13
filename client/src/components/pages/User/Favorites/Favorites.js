import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import {getFavorites} from '../../../../services/userService';
import {selectUser} from '../../../../store/slices/userSlice';
import {ProductCard} from '../../../shared/ProductCard/ProductCard';
import './Favorites.scss';

export function Favorites() {
    const {user} = useSelector(selectUser);
    const [favorites, setFavorites] = useState([]);

    const getUserFavorites = useCallback(async (user) => {
        try {
            const favoritesDetails = await getFavorites(user._id);
            setFavorites(() => favoritesDetails);
        } catch ({message}) {
            message.forEach(err => toast.error(err));
        }
    }, []);

    useEffect(() => {
        getUserFavorites(user);
    }, [getUserFavorites, user]);

    const content = favorites.length === 0
        ? <article className="empty-cart">
            <h4 className="heading">Your haven't bookmarked any favorites yet</h4>
            <Link className='main-text' to="/catalogue">Please have a look at our catalogue and select the best wine for your occasion</Link>
            <Link className='button catalogue-button' to="/catalogue">Catalogue</Link>
        </article>
        : <div className="favorites-container">
            <header className="section-header">
                <h4>Pagination</h4>
            </header>

            <div className="products-container">
                {favorites.map(f => <ProductCard key={f._id} product={f} />)}
            </div>
        </div>;

    return (
        <section className='page favorites'>
            <h1 className="page-title">
                User Favorites
            </h1>
            {content}
        </section>
    );
}