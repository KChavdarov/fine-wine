import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import './Paginator.scss';

export function Paginator({handler, products}) {
    return (
        <div className="paginator" >
            <div className="selector-group per-page">
                <label htmlFor="perPage">Items per page</label>
                <select name="perPage" id="perPage" onChange={handler} value={products.perPage}>
                    <option value="12">12</option>
                    <option value="24">24</option>
                    <option value="36">36</option>
                </select>
            </div>
            <div className="selector-group sort">
                <label htmlFor="sort">Sorting</label>
                <select name="sort" id="sort" onChange={handler} value={products.sort}>
                    <option value="-_isPromo">Best Deals</option>
                    <option value="-_createdAt">Latest Products</option>
                    <option value="-currentPrice">Price Descending</option>
                    <option value="currentPrice">Price Ascending</option>
                </select>
            </div>
            <div className="selector-group page">
                <div className="label">
                    Page:{products.page} of {Math.ceil(products.count / products.perPage)}
                </div>
                <div className="buttons" onClick={handler}>
                    <button className='select-page-button' id='previousPage' ><FaChevronLeft/></button>
                    <button className='select-page-button' id='nextPage' ><FaChevronRight/></button>
                </div>
            </div>
        </div >
    );
}