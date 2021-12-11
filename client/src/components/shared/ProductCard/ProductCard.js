import './ProductCard.scss';
import {useNavigate} from 'react-router-dom';
import {FaStar, FaRegStar} from 'react-icons/fa';
import {useSelector} from 'react-redux';
import {addFavorite, removeFavorite, selectUser} from '../../../store/slices/userSlice';
import {useDispatch} from 'react-redux';
import {addItem} from '../../../store/slices/cartSlice';

export function ProductCard({product}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(selectUser);

    function navigateToDetails() {
        navigate(`/details/${product._id}`);
    }

    function favoriteClickHandler(event) {
        event.stopPropagation();
        user.favorites.includes(product?._id)
            ? dispatch(removeFavorite(product._id))
            : dispatch(addFavorite(product._id));
    }

    function addToCartClickHandler() {
        dispatch(addItem(product._id));
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
                    {user._id && <div className="favorite-icon-container">{favorite}</div>}
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
                        ? <p className="price"><span className="old-price">&euro;{product.basePrice.toFixed(2)}</span><span className="current-price">&euro;{product.currentPrice.toFixed(2)}</span></p>
                        : <p><span className="base-price">&euro;{product.currentPrice.toFixed(2)}</span></p>
                    }
                </div>

                {product.isPromo && <span className="sale-logo">great deal!</span>}

            </div>

            <div className="buttons">
                <button className="action-button" onClick={addToCartClickHandler}>Add to cart</button>
            </div>

        </article>
    );
}