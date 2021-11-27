import './Catalogue.scss';
import {useEffect, useState} from 'react';
import * as wineService from '../../../services/wineService';
import {ProductCard} from '../../shared/ProductCard/ProductCard';

export function Catalogue() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getProducts() {
        const products = await wineService.getAll();
        setProducts(() => products);
        setIsLoading(false);
    }

    useEffect(() => {
        getProducts();
    }, []);

    const content = isLoading
        ? <p>Loading ...</p>
        : products.map(product => <ProductCard key={product._id} product={product} />);

    return (
        <div className="catalogue container">
            <h1>Wine Catalogue</h1>
            <section className="filters">
                <h4>Filters</h4>
                <form>
                    <label htmlFor="type">Type</label>
                    <select name="type" id="type">
                        <option value="red">Red</option>
                        <option value="white">White</option>
                        <option value="rose">Rose</option>
                        <option value="sparkling">Sparkling</option>
                        <option value="dessert">Dessert</option>
                    </select>
                    <label htmlFor="country">Country</label>
                    <select name="country" id="country">
                        <option value="United States">United States</option>
                        <option value="France">France</option>
                    </select>
                </form>
            </section>

            <section className="products-container">
                {content}
                {content}
                {content}
                {content}
            </section>

        </div>
    );
};