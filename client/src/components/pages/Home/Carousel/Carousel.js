import {carouselContent} from './carouselContent';
import './Carousel.scss';
import {useEffect, useState} from 'react';
import {Slide} from './Slide';
import {FaArrowCircleLeft, FaArrowCircleRight} from 'react-icons/fa';

export function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 7000);
        return () => clearInterval(interval);
    }, [currentIndex]);


    function nextSlide() {
        setCurrentIndex(
            currentSlide => currentSlide + 1 === carouselContent.length
                ? 0
                : currentSlide + 1
        );
    }

    function prevSlide() {
        setCurrentIndex(
            currentSlide => currentSlide - 1 < 0
                ? carouselContent.length - 1
                : currentSlide - 1
        );
    }

    const slides = carouselContent.map((slide, index) => (
        <div key={slide.image} className={index === currentIndex ? 'slide active' : 'slide'}>
            {index === currentIndex && <Slide data={slide} />}
        </div>
    ));

    return (
        <div className="carousel">
            <FaArrowCircleLeft className="arrow left-arrow" onClick={prevSlide} />
            {slides}
            <FaArrowCircleRight className="arrow right-arrow" onClick={nextSlide} />
        </div>
    );
}