import './CartItem.scss';
import {useDispatch} from 'react-redux';
import {FaTrashAlt, FaPlus, FaMinus} from 'react-icons/fa';
import {addItem, removeItem, subtractItem} from '../../../../store/slices/cartSlice';

export function CartItem({wine, quantity}) {
    const dispatch = useDispatch();

    function quantityButtonClickHandler(event) {
        switch (event.currentTarget.id) {
            case 'increase':
                return (dispatch(addItem(wine._id)));
            case 'decrease':
                return (dispatch(subtractItem(wine._id)));
            case 'remove':
                return (dispatch(removeItem(wine._id)));
            default: return;
        }
    }

    return (
        wine
            ? <article className="cart-item">
                <div className='info image'><img src={wine.image} alt={wine.name} /></div>
                <div className='info product'>
                    <p className="brand">{wine.brand}</p>
                    <p className="name">{wine.name}</p>
                    <p className="grapes">{wine.grape.join(' ,')}</p>
                    <div className="geo">
                        <span className="year">{wine.year}</span> | <span className="country">{wine.country}</span>
                    </div>
                </div>
                <div className='info price'>
                    &euro;
                    {Number(wine.currentPrice.toFixed(2)).toLocaleString()}
                </div>
                <div className='info quantity'>
                    <button className="cart-item-button decrease" onClick={quantityButtonClickHandler} id='decrease'><FaMinus /></button>
                    <span className="quantity-value">{quantity}</span>
                    <button className="cart-item-button increase" onClick={quantityButtonClickHandler} id='increase'><FaPlus /></button>
                </div>
                <div className='info item-total'>
                    &euro;
                    {Number((wine.currentPrice * quantity || 0).toFixed(2)).toLocaleString()}
                </div>
                <div className='remove-item-container'><button className="cart-item-button remove-item" onClick={quantityButtonClickHandler} id="remove"><FaTrashAlt /></button></div>
            </article>
            : null
    );
}