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
    page: 1,
    perPage: 12,
    sort: '-isPromo'
};

export function Catalogue() {
    const [filters, setFilters] = useState(initialFilters);
    const [products, setProducts] = useState({wines: [], page: 1, perPage: 12, count: 0});
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

        const loadedFilters = Object.entries(categories)
            .filter(([category, fields]) => (category !== 'minPrice' && category !== 'maxPrice' && category !== 'isPromo'))
            .reduce((acc, [category, fields]) => {
                acc[category] = fields.reduce((a, c) => {
                    a[c] = Boolean(selected[category]?.includes(c));
                    return a;
                }, {});

                return acc;
            }, {});

        loadedFilters.minPrice = (selected.minPrice && Number(selected.minPrice[0])) || categories.minPrice;
        loadedFilters.maxPrice = (selected.maxPrice && Number(selected.maxPrice[0])) || categories.maxPrice;
        loadedFilters.page = (selected.page && Number(selected.page[0])) || filters.page;
        loadedFilters.perPage = (selected.perPage && Number(selected.perPage[0])) || filters.perPage;
        loadedFilters.sort = (selected.sort && selected.sort[0]) || filters.sort;
        loadedFilters.priceRange = {
            min: categories.minPrice,
            max: categories.maxPrice
        };

        initialFilters = loadedFilters;
        setFilters(currentFilters => ({...currentFilters, ...loadedFilters}));
    }

    async function getProducts() {
        const result = await wineService.getAll(searchParams);
        setProducts(() => result);
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

    function pageHandler(event) {
        let page = filters.page;
        if (event.target.id === 'previousPage') {
            page = Math.max(filters.page - 1, 1);
        } else if (event.target.id === 'nextPage') {
            page = Math.min(filters.page + 1, Math.ceil(products.count / filters.perPage));
        };
        if (page !== filters.page) {
            searchParams.set('page', page);
            setSearchParams(parseQueryString(searchParams));
        }
    }

    function filtersResetHandler() {
        setSearchParams();
        getFilters();
    }

    function filtersSubmitHandler(event) {
        event.preventDefault();
        mapFiltersToQuerystring();
    }

    function mapFiltersToQuerystring() {
        const omitFilters = ['minPrice', 'maxPrice', 'priceRange', 'page', 'perPage', 'sort'];
        const selectedFilters = Object.entries(filters)
            .filter(([category]) => !(omitFilters.includes(category)))
            .reduce((acc, [category, fields]) => {
                const checked = Object.keys(fields).filter(field => fields[field]);
                if (Object.keys(checked).length > 0) {acc[category] = checked;}
                return acc;
            }, {});

        selectedFilters.minPrice = filters.minPrice;
        selectedFilters.maxPrice = filters.maxPrice;
        selectedFilters.perPage = Number(filters.perPage);
        selectedFilters.sort = filters.sort;
        selectedFilters.page = Number(filters.page);

        setSearchParams(selectedFilters);
    }

    const content = isLoading
        ? <p>Loading ...</p>
        : products.wines.map(product => <ProductCard key={product._id} product={product} />);

    return (
        <section className="page catalogue container">
            <h1 className="page-title">Wine Catalogue</h1>

            {isLoading ? null : <Filters filters={filters} handlers={{checkboxHandler, rangeHandler, filtersSubmitHandler, filtersResetHandler}} />}

            <div className="paginator">
                <div className="buttons">
                    <button id='previousPage' onClick={pageHandler}>PREV</button>
                    <button id='nextPage' onClick={pageHandler}>NEXT</button>
                </div>
            </div>

            <div className="products-container">
                {content}
                {content}
                {content}
                {content}
            </div>

        </section>
    );
};