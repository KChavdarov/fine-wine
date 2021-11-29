import './Catalogue.scss';
import {useEffect, useState} from 'react';
import * as wineService from '../../../services/wineService';
import {ProductCard} from '../../shared/ProductCard/ProductCard';
import {Filters} from './Filters';
import {useSearchParams} from 'react-router-dom';

export function Catalogue() {
    const [filters, setFilters] = useState({});
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        getFilters();
        getProducts();
    }, []);


    function parseQueryString(queryString) {
        const keys = [...searchParams.keys()];
        const result = keys.reduce((a, c) => {
            a[c] = queryString.getAll(c);
            return a;
        }, {});
        return result;
    }

    async function getFilters() {
        const categories = await wineService.getCategories();
        console.log(categories);
        const selected = parseQueryString(searchParams);
        console.log(selected);

        const filters = Object.entries(categories)
            .reduce((acc, [category, fields]) => {
                acc[category] = fields.reduce((a, c) => {
                    a[c] = Boolean(selected[category]?.includes(c));
                    return a;
                }, {});

                return acc;
            }, {});

        setFilters(() => filters);
    }

    async function getProducts() {
        const products = await wineService.getAll(searchParams);
        setProducts(() => products);
        setIsLoading(false);
    }


    const content = isLoading
        ? <p>Loading ...</p>
        : products.map(product => <ProductCard key={product._id} product={product} />);

    return (
        <div className="catalogue container">
            <h1>Wine Catalogue</h1>

            <Filters filters={filters} />

            <section className="products-container">
                {content}
                {content}
                {content}
                {content}
            </section>

        </div>
    );
};