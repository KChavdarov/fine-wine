import {Carousel} from './Carousel/Carousel';
import {ProductsShowcase} from './ProductShowcase/ProductsShowcase';

export function Home() {
    return (
        <>
            <Carousel />
            <ProductsShowcase query={{isPromo: true}} />
            <ProductsShowcase />
            <section>Latest products</section>
            <section>Top rated products</section>
            <section>Testimonials</section>
        </>
    );
}