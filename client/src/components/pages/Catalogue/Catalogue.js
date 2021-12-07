import './Catalogue.scss';
import {useEffect, useState} from 'react';
import * as wineService from '../../../services/wineService';
import {ProductCard} from '../../shared/ProductCard/ProductCard';
import {Filters} from './Filters';
import {useSearchParams} from 'react-router-dom';

let initialFilters = {
    type: {},
    brand: {},
    grape: {},
    country: {},
    region: {},
    year: {},
    volume: {},
    priceRange: {min: 0, max: 1000},
    minPrice: 0,
    maxPrice: 1000,
    // isPromo: {},
};

export function Catalogue() {
    const [filters, setFilters] = useState(initialFilters);
    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getFilters();
        getProducts();
        return () => setProducts(products => products);
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
            .filter(([category, fields]) => (category !== 'minPrice' && category !== 'maxPrice' && category !== 'isPromo'))
            .reduce((acc, [category, fields]) => {
                acc[category] = fields.reduce((a, c) => {
                    a[c] = Boolean(selected[category]?.includes(c));
                    return a;
                }, {});

                return acc;
            }, {});

        filters.minPrice = (selected.minPrice && Number(selected.minPrice[0])) || categories.minPrice;
        filters.maxPrice = (selected.maxPrice && Number(selected.maxPrice[0])) || categories.maxPrice;

        filters.priceRange = {
            min: categories.minPrice,
            max: categories.maxPrice
        };

        initialFilters = filters;
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

    function rangeHandler(event) {
        const name = event.target.name;
        // const updatedFilter = {[name]: Number(event.target.value) || 0};

        setFilters(prevState => {
            let minPrice = prevState.minPrice;
            let maxPrice = prevState.maxPrice;
            const newValue = Number(event.target.value);

            if (name === 'minPrice') {
                minPrice = Math.min(maxPrice - 10, newValue);
            } else if (name === 'maxPrice') {
                maxPrice = Math.max(minPrice + 10, newValue);
            }

            return {...prevState, minPrice, maxPrice};
        });
    }

    function filtersSubmitHandler(event) {
        event.preventDefault();
        const selectedFilters = Object.entries(filters)
            .filter(([category]) => (category !== 'minPrice' && category !== 'maxPrice' && category !== 'priceRange'))
            .reduce((acc, [category, fields]) => {
                const checked = Object.keys(fields).filter(field => fields[field]);
                if (Object.keys(checked).length > 0) {acc[category] = checked;}
                return acc;
            }, {});

        selectedFilters.minPrice = filters.minPrice;
        selectedFilters.maxPrice = filters.maxPrice;

        setSearchParams(selectedFilters);
    }

    function filtersResetHandler() {
        setSearchParams();
        // getFilters();
    }

    const content = isLoading
        ? <p>Loading ...</p>
        : products.map(product => <ProductCard key={product._id} product={product} />);

    return (
        <div className="page catalogue container">
            <h1 className="page-title">Wine Catalogue</h1>

            {isLoading ? null : <Filters filters={filters} handlers={{checkboxHandler, rangeHandler, filtersSubmitHandler, filtersResetHandler}} />}

            <section className="products-container">
                {content}
                {content}
                {content}
                {content}
            </section>

        </div>
    );
};