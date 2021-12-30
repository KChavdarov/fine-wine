import {useEffect} from 'react';
import {useState} from 'react';
import * as wineService from '../../../../services/wineService';
import {ProductCard} from '../../../shared/ProductCard/ProductCard';
import './ProductsShowcase.scss';

export function ProductsShowcase({query = {}, title = ''}) {
    const [products, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const queryString = Object.keys(query).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(query[key]);
    }).join('&');

    useEffect(() => {
        try {
            getProducts();
        } catch (error) {
            console.log(error);
        }

        async function getProducts() {
            const products = await wineService.getLatest(queryString);
            setProduct(() => products);
            setIsLoading(() => false);
        }
    }, [queryString]);

    const content = (
        isLoading
            ? <p>Loading...</p>
            : products.map(product => (<ProductCard key={product._id} product={product} />))
    );

    return (
        <section className="products-showcase container">
            <header className="section-header">
                <h4>{title}</h4>
            </header>
            <div className="products-container">
                {content}
            </div>
        </section>
    );
}