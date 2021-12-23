import './CartItem.scss';
import {useDispatch} from 'react-redux';
import {FaTrashAlt, FaPlus, FaMinus} from 'react-icons/fa';
import {addItem, removeItem, subtractItem} from '../../../../store/slices/cartSlice';
import {Link} from 'react-router-dom';

export function CartItem({wine, quantity, itemTotal, ordered}) {
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
                <Link to={`/details/${wine._id}`} className='info image'><img src={wine.image} alt={wine.name} /></Link>
                <div className='info product'>
                    <p className="brand">{wine.brand}</p>
                    <Link to={`/details/${wine._id}`} className="name">{wine.name}</Link>
                    <p className="grapes">{wine.grape.join(' ,')}</p>
                    <div className="geo">
                        <span className="year">{wine.year}</span> | <span className="country">{wine.country}</span>
                    </div>
                </div>
                <div className='info price'>{Number(wine.currentPrice.toFixed(2)).toLocaleString('en-GB', {style: 'currency', currency: 'EUR'})}</div>
                <div className='info quantity'>
                    {ordered
                        ? <span className="quantity-value">{quantity}</span>
                        : <>
                            <button className="cart-item-button decrease" onClick={quantityButtonClickHandler} id='decrease'><FaMinus /></button>
                            <span className="quantity-value">{quantity}</span>
                            <button className="cart-item-button increase" onClick={quantityButtonClickHandler} id='increase'><FaPlus /></button>
                        </>
                    }
                </div>
                <div className='info item-total'>{itemTotal.toLocaleString('en-GB', {style: 'currency', currency: 'EUR'})}</div>
                {ordered
                    ? null
                    : <div className='remove-item-container'><button className="cart-item-button remove-item" onClick={quantityButtonClickHandler} id="remove"><FaTrashAlt /></button></div>
                }
            </article>
            : null
    );
}