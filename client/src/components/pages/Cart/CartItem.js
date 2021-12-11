import {useDispatch} from 'react-redux';
import {addItem, removeItem, subtractItem} from '../../../store/slices/cartSlice';
import './CartItem.scss';

export function CartItem({wine, quantity}) {
    const dispatch = useDispatch();

    function quantityButtonClickHandler(event) {
        switch (event.target.id) {
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
            ? <tr className="cart-item">
                <td><img src={wine.image} alt={wine.name} />
                    <span>{wine.brand}</span>
                    <span>{wine.name}</span>
                    <span>{wine.year}</span>
                    <span>{wine.volume}</span>
                </td>
                <td>{wine.currentPrice}</td>
                <td>
                    <button onClick={quantityButtonClickHandler} id='decrease'>-</button>
                    {quantity}
                    <button onClick={quantityButtonClickHandler} id='increase'>+</button>
                </td>
                <td>
                    {(wine.currentPrice * quantity || 0).toFixed(2)}
                    <button onClick={quantityButtonClickHandler} id="remove">X</button>
                </td>
            </tr>
            : null
    );
}