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
    }, []);

    useEffect(() => {
        getProducts();
    }, [searchParams]);


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
        const selected = parseQueryString(searchParams);

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

    function checkboxHandler(event, category) {
        const name = event.target.name;
        const checked = event.target.checked;
        const updatedFilter = {[name]: checked};

        setFilters(prevState => {
            const filters = prevState[category];
            const updatedFilters = {...filters, ...updatedFilter};
            const newState = {...prevState};
            newState[category] = updatedFilters;
            return newState;
        });
    }

    function filtersSubmitHandler(event) {
        event.preventDefault();
        const selectedFilters = Object.entries(filters)
            .reduce((acc, [category, fields]) => {
                const checked = Object.keys(fields).filter(field => fields[field]);
                if (Object.keys(checked).length > 0) {acc[category] = checked;}
                return acc;
            }, {});

        setSearchParams(selectedFilters);
    }

    const content = isLoading
        ? <p>Loading ...</p>
        : products.map(product => <ProductCard key={product._id} product={product} />);

    return (
        <div className="catalogue container">
            <h1>Wine Catalogue</h1>

            <Filters filters={filters} checkboxHandler={checkboxHandler} filtersSubmitHandler={filtersSubmitHandler} />

            <section className="products-container">
                {content}
                {content}
                {content}
                {content}
            </section>

        </div>
    );
};