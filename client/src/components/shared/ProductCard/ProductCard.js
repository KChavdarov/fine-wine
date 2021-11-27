import {useNavigate, Link} from 'react-router-dom';
import './ProductCard.scss';

export function ProductCard({product}) {
    const navigate = useNavigate();

    function navigateToDetails() {
        navigate(`/details/${product._id}`);
    }

    return (
        <article className="product-card" >

            <div className="card-main" onClick={navigateToDetails}>

                <header className="card-header" >
                    <p className="brand">{product.brand}</p>
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

            </div>

            <div className="buttons">
                {/* <Link className="action-button" to={`/details/${product._id}`}>Wine details</Link> */}
                <button className="action-button">Add to cart</button>
            </div>

        </article>
    );
}