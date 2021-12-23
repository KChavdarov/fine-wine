import './ProductCard.scss';
import {Link, useNavigate} from 'react-router-dom';
import {FaStar, FaRegStar} from 'react-icons/fa';
import {useSelector} from 'react-redux';
import {addFavorite, removeFavorite, selectUser} from '../../../store/slices/userSlice';
import {useDispatch} from 'react-redux';
import {addItem} from '../../../store/slices/cartSlice';
import {toast} from 'react-toastify';

export function ProductCard({product}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(selectUser);

    function navigateToDetails() {
        navigate(`/details/${product._id}`);
    }

    function favoriteClickHandler(event) {
        event.stopPropagation();
        user?.favorites.includes(product?._id)
            ? dispatch(removeFavorite({userId: user._id, wineId: product._id}))
            : dispatch(addFavorite({userId: user._id, wineId: product._id}));
    }

    function addToCartClickHandler() {
        dispatch(addItem(product._id));
        toast.success('Wine added to cart');

    }

    const favorite = user.favorites.includes(product?._id)
        ? <FaStar onClick={favoriteClickHandler} />
        : <FaRegStar onClick={favoriteClickHandler} />;

    return (
        <article className="product-card" >

            <div className="card-main" onClick={navigateToDetails}>

                <header className="card-header" >
                    <div className="spacer"></div>
                    <p className="brand">{product.brand}</p>
                    {user._id && !user._isAdmin && <div className="favorite-icon-container">{favorite}</div>}
                </header>

                <div className="image-container">
                    <img src={product.image} alt="product" />
                </div>

                <div className="product-details">
                    <p className="name">{product.name}</p>
                    <p className="grapes">{product.grape.join(' ,')}</p>
                    <div className="geo">
                        <span className="year">{product.year}</span> | <span className="country">{product.country}</span>
                    </div>
                </div>

                <div className="prices">
                    {product.isPromo
                        ? <p className="price">
                            <span className="old-price">{product.basePrice.toLocaleString('en-GB', {style: 'currency', currency: 'EUR'})}</span>
                            <span className="current-price">{product.currentPrice.toLocaleString('en-GB', {style: 'currency', currency: 'EUR'})}</span>
                        </p>
                        : <p><span className="base-price">{product.currentPrice.toLocaleString('en-GB', {style: 'currency', currency: 'EUR'})}</span></p>
                    }
                </div>

                {product.isPromo && <span className="sale-logo">great deal!</span>}

            </div>

            {!user._isAdmin
                ? <div className="buttons">
                    <button className="action-button" onClick={addToCartClickHandler}>Add to cart</button>
                </div>
                : null
            }

        </article>
    );
}