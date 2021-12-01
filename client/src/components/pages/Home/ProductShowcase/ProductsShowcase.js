import {useEffect} from 'react';
import {useState} from 'react/cjs/react.development';
import * as wineService from '../../../../services/wineService';
import {ProductCard} from '../../../shared/ProductCard/ProductCard';
import './ProductsShowcase.scss';

export function ProductsShowcase({query = {}, title = ''}) {
    const [products, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getProducts() {
        var queryString = Object.keys(query).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(query[key]);
        }).join('&');

        const products = await wineService.getLatest(queryString);
        setProduct(() => products);
        setIsLoading(() => false);
    }

    useEffect(() => {
        getProducts();
    }, []);

    const content = (
        isLoading
            ? <p>Loading...</p>
            : products.map(product => (<ProductCard key={product._id} product={product} />))
    );

    return (
        <section className="products-showcase container">
            <h2 className="section-title">{title}</h2>
            <div className="products-container">
                {content}
            </div>
        </section>
    );
}