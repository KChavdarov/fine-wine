import {useEffect, useState} from 'react';
import {getOne} from '../../../services/wineService';
import './CartItem.scss';

export function CartItem({wineId, quantity}) {
    const [wine, setWine] = useState(null);
    useEffect(() => {
        getOne(wineId).then(
            wine => {
                setWine(wine);
            }
        );
    }, [wineId]);

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
                <td>{quantity}</td>
                <td>{wine.currentPrice * quantity || 0}</td>
            </tr>
            : null
    );
}