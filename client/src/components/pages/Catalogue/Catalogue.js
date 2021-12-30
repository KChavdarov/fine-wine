import './Catalogue.scss';
import {useEffect, useState} from 'react';
import * as wineService from '../../../services/wineService';
import {ProductCard} from '../../shared/ProductCard/ProductCard';
import {Filters} from './Filters';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {useCallback} from 'react';
import {Paginator} from '../../shared/Paginator/Paginator';
import {Loader} from '../../shared/Loader/Loader';

let initialFilters = {
    type: {},
    brand: {},
    grape: {},
    country: {},
    region: {},
    volume: {},
    priceRange: {min: 0, max: 1000},
    minPrice: 0,
    maxPrice: 1000,
    yearRange: {min: 1900, max: 3000},
    minYear: 1900,
    maxYear: 3000,
};

let initialPaginate = {
    page: 1,
    perPage: 12,
    count: 0,
    sort: '-isPromo'
};

export function Catalogue() {
    const [filters, setFilters] = useState(initialFilters);
    const [products, setProducts] = useState({wines: [], ...initialPaginate});
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const parseQueryString = useCallback((queryString) => {
        const keys = [...queryString.keys()];
        const result = keys.reduce((a, c) => {
            a[c] = queryString.getAll(c);
            return a;
        }, {});
        return result;
    }, []);

    const getFilters = useCallback(async (searchParams) => {
        const categories = await wineService.getCategories();
        const selected = parseQueryString(searchParams);
        const omitFilters = ['minYear', 'maxYear', 'yearRange', 'minPrice', 'maxPrice', 'priceRange', 'isPromo'];

        const loadedFilters = Object.entries(categories)
            .filter(([category]) => !(omitFilters.includes(category)))
            .reduce((acc, [category, fields]) => {
                acc[category] = fields.reduce((a, c) => {
                    a[c] = Boolean(selected[category]?.includes(c.toString()));
                    return a;
                }, {});

                return acc;
            }, {});

        loadedFilters.minPrice = (selected.minPrice && Number(selected.minPrice[0])) || categories.minPrice;
        loadedFilters.maxPrice = (selected.maxPrice && Number(selected.maxPrice[0])) || categories.maxPrice;
        loadedFilters.priceRange = {
            min: categories.minPrice,
            max: categories.maxPrice,
        };

        loadedFilters.minYear = (selected.minYear && Number(selected.minYear[0])) || categories.minYear;
        loadedFilters.maxYear = (selected.maxYear && Number(selected.maxYear[0])) || categories.maxYear;
        loadedFilters.yearRange = {
            min: categories.minYear,
            max: categories.maxYear,
        };

        initialFilters = loadedFilters;
        setFilters(currentFilters => ({...currentFilters, ...loadedFilters}));

    }, [parseQueryString]);

    const getProducts = useCallback(async (searchParams) => {
        const page = searchParams.has('page') && Number(searchParams.get('page'));
        const result = await wineService.getAll(searchParams);
        let pages = Math.ceil(result.count / result.perPage);
        if (result.count && page > pages) {
            searchParams.set('page', Math.min(page, pages));
            setSearchParams(searchParams, {replace: true});
        };
        setProducts(() => result);
        setIsLoading(false);
    }, [setSearchParams]);

    const checkboxHandler = useCallback((event, category) => {
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
    }, []);

    const rangeHandler = useCallback((event) => {
        const name = event.target.name;

        setFilters(prevState => {
            const ranges = {
                minPrice: prevState.minPrice,
                maxPrice: prevState.maxPrice,
                minYear: prevState.minYear,
                maxYear: prevState.maxYear,
            };
            const newValue = Number(event.target.value);

            if (name === 'minPrice') {
                ranges.minPrice = Math.min(ranges.maxPrice - 10, newValue);
            } else if (name === 'maxPrice') {
                ranges.maxPrice = Math.max(ranges.minPrice + 10, newValue);
            } else if (name === 'minYear') {
                ranges.minYear = Math.min(ranges.maxYear - 1, newValue);
            } else if (name === 'maxYear') {
                ranges.maxYear = Math.max(ranges.minYear + 1, newValue);
            }

            return {...prevState, ...ranges};
        });
    }, []);

    const filtersResetHandler = useCallback(() => {
        setSearchParams();
        try {
            getFilters(searchParams);
        } catch (error) {
            navigate('/error');
        }
    }, [getFilters, navigate, searchParams, setSearchParams]);

    const mapFiltersToQuerystring = useCallback(() => {
        const omitFilters = ['minYear', 'maxYear', 'yearRange', 'minPrice', 'maxPrice', 'priceRange', 'isPromo'];
        const selectedFilters = Object.entries(filters)
            .filter(([category]) => !(omitFilters.includes(category)))
            .reduce((acc, [category, fields]) => {
                const checked = Object.keys(fields).filter(field => fields[field]);
                if (Object.keys(checked).length > 0) {acc[category] = checked;}
                return acc;
            }, {});

        if ((searchParams.has('minPrice') && searchParams.get('minPrice') !== filters.minPrice) || (filters.minPrice !== initialFilters.minPrice)) {
            selectedFilters.minPrice = filters.minPrice;
        }
        if ((searchParams.has('maxPrice') && searchParams.get('maxPrice') !== filters.maxPrice) || (filters.maxPrice !== initialFilters.maxPrice)) {
            selectedFilters.maxPrice = filters.maxPrice;
        }
        if ((searchParams.has('minYear') && searchParams.get('minYear') !== filters.minYear) || (filters.minYear !== initialFilters.minYear)) {
            selectedFilters.minYear = filters.minYear;
        }
        if ((searchParams.has('maxYear') && searchParams.get('maxYear') !== filters.maxYear) || (filters.maxYear !== initialFilters.maxYear)) {
            selectedFilters.maxYear = filters.maxYear;
        }

        setSearchParams(selectedFilters);
    }, [filters, searchParams, setSearchParams]);

    const filtersSubmitHandler = useCallback((event) => {
        event.preventDefault();
        mapFiltersToQuerystring();
    }, [mapFiltersToQuerystring]);


    const paginationHandler = useCallback((event) => {
        let page = products.page;
        let perPage = products.perPage;
        let sort = products.sort;

        if (event.target.id === 'previousPage') {
            page = Math.max(products.page - 1, 1);
        } else if (event.target.id === 'nextPage') {
            page = Math.min(products.page + 1, Math.ceil(products.count / products.perPage));
        } else if (event.target.id === 'perPage') {
            perPage = Number(event.target.value);
        } else if (event.target.id === 'sort') {
            sort = (event.target.value);
        }

        if (page !== products.page) {
            searchParams.set('page', page);
            setSearchParams(parseQueryString(searchParams));
        }
        if (perPage !== products.perPage) {
            searchParams.set('page', 1);
            searchParams.set('perPage', perPage);
            setSearchParams(parseQueryString(searchParams));
        }
        if (sort !== products.sort) {
            searchParams.set('page', 1);
            searchParams.set('sort', sort);
            setSearchParams(parseQueryString(searchParams));
        }

    }, [parseQueryString, products.count, products.page, products.perPage, products.sort, searchParams, setSearchParams]);

    useEffect(() => {
        try {
            getFilters(searchParams);
            getProducts(searchParams);
        } catch (error) {
            navigate('/error');
        }
    }, [getFilters, getProducts, navigate, searchParams]);

    const content = products.count
        ? products.wines.map(product => <ProductCard key={product._id} product={product} />)
        : <div className="no-results"><p>No wines meet the specified criteria.</p> <p>Please refine your filters.</p></div>;

    return (
        <section className="page catalogue container">
            <h1 className="page-title">Wine Catalogue</h1>

            {isLoading ? null : <Filters filters={filters} handlers={{checkboxHandler, rangeHandler, filtersSubmitHandler, filtersResetHandler}} />}

            {isLoading ? null : <Paginator handler={paginationHandler} products={products} />}

            <div className="products-container">
                {isLoading
                    ? <Loader />
                    : content
                }
            </div>

        </section>
    );
};;