import './Details.scss';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useState, useEffect, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FaStar, FaRegStar} from 'react-icons/fa';
import {deleteOne, getOne} from '../../../services/wineService';
import {Loader} from '../../shared/Loader/Loader';
import {addFavorite, removeFavorite, selectUser} from '../../../store/slices/userSlice';
import {addItem} from '../../../store/slices/cartSlice';
import {toast} from 'react-toastify';
import {ModalContext} from '../../shared/Modal/Modal';

export function Details() {
    const {wineId} = useParams();
    const [wine, setWine] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const {user} = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {createModal} = useContext(ModalContext);

    useEffect(() => {
        getDetails(wineId);
        async function getDetails(wineId) {
            try {
                const wine = await getOne(wineId);
                setWine(() => wine);
                setIsLoading(() => false);
            } catch {
                navigate('/error');
            }
        }
    }, [navigate, wineId]);

    function favoriteClickHandler(event) {
        event.stopPropagation();
        user?.favorites.includes(wine?._id)
            ? dispatch(removeFavorite({userId: user._id, wineId: wine._id}))
            : dispatch(addFavorite({userId: user._id, wineId: wine._id}));
    }

    function addToCartClickHandler() {
        dispatch(addItem(wine._id));
        toast.success('Wine added to cart');
    }

    async function DeleteClickHandler(confirmed) {
        if (confirmed) {
            try {
                await deleteOne(wine._id);
                navigate('/');
            } catch {
                navigate('/error');
            }
        }
    }

    const favorite = user.favorites.includes(wine?._id)
        ? <FaStar onClick={favoriteClickHandler} />
        : <FaRegStar onClick={favoriteClickHandler} />;

    return (

        isLoading
            ? <Loader />
            : <section className="page details container">
                <h1 className="page-title">
                    Wine Details
                </h1>
                <header className="section-header">
                    <h4>{wine.name} {wine.year}</h4>
                    {user._id && <div className="favorite-icon-container">{favorite}</div>}
                </header>

                <div className="wine-details">
                    <div className="image-container">
                        <img src={wine.image} alt={wine.name} />
                    </div>
                    <div className="wine-data">

                        <div className="data-group">
                            <h4 className="group-title">Specifications</h4>
                            <ul className="data-list">
                                <li className="brand list-item">
                                    <span className="brand label">brand:</span>
                                    <span className="brand text">{wine.brand}</span>
                                </li>
                                <li className="name list-item">
                                    <span className="name label">name:</span>
                                    <span className="name text">{wine.name}</span>
                                </li>
                                <li className="type list-item">
                                    <span className="type label">type:</span>
                                    <span className="type text">{wine.type}</span>
                                </li>
                                <li className="grape list-item">
                                    <span className="grape label">grape:</span>
                                    <span className="grape text">{wine.grape.join(', ')}</span>
                                </li>
                                <li className="year list-item">
                                    <span className="year label">vintage:</span>
                                    <span className="year text">{wine.year}</span>
                                </li>
                                <li className="country list-item">
                                    <span className="country label">country:</span>
                                    <span className="country text">{wine.country}</span>
                                </li>
                                <li className="region list-item">
                                    <span className="region label">region:</span>
                                    <span className="region text">{wine.region}</span>
                                </li>
                                <li className="volume list-item">
                                    <span className="volume label">volume:</span>
                                    <span className="volume text">{wine.volume} litres</span>
                                </li>
                            </ul>
                        </div>

                        <div className="data-group">
                            <h4 className="group-title">Description</h4>
                            <p className="description">{wine.description}</p>
                        </div>

                        <div className="prices">
                            {wine.isPromo
                                ? <p className="price">
                                    <span className='discounted-label'>Super Price:</span>
                                    <span className="old-price">{wine.basePrice.toLocaleString('en-GB', {style: 'currency', currency: 'EUR'})}</span>
                                    <span className="current-price">{wine.currentPrice.toLocaleString('en-GB', {style: 'currency', currency: 'EUR'})}</span>
                                </p>
                                : <p>
                                    <span>Price:</span>
                                    <span className="base-price">{wine.currentPrice.toLocaleString('en-GB', {style: 'currency', currency: 'EUR'})}</span>
                                </p>
                            }
                        </div>

                        <div className="buttons">
                            {user._isAdmin
                                ? <>
                                    <Link to={`/admin/edit/${wine._id}`} className="button edit-button" >Edit Wine</Link>
                                    <button className="button delete-button" onClick={() => createModal('Are you sure you want to delete this wine listing?', DeleteClickHandler)}>Delete Wine</button>
                                </>
                                : <button className="button add-to-cart" onClick={addToCartClickHandler}>
                                    Add to cart
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </section>
    );
}