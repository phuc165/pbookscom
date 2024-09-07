import styles from './ManualSlide.module.css';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import ProductCell from '../ProductCell/ProductCell';

const cx = classNames.bind(styles);

function Slider({ images }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handlePrevClick = () => {
        setCurrentSlide(
            (prevSlide) => (prevSlide - 1 + images.length) % images.length,
        );
    };

    const handleNextClick = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    };

    return (
        <div className={cx('slider')}>
            <button onClick={handlePrevClick}>Prev</button>
            <ProductCell />
            <ProductCell />
            <ProductCell />
            <button onClick={handleNextClick}>Next</button>
        </div>
    );
}

export default Slider;
