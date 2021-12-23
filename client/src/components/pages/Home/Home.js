import {Carousel} from './Carousel/Carousel';
import {ProductsShowcase} from './ProductShowcase/ProductsShowcase';

export function Home() {
    return (
        <>
            <Carousel />
            <ProductsShowcase query={{isPromo: true}} title="Best deals" />
            <ProductsShowcase title="Latest products" />
        </>
    );
}