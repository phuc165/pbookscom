import React, { useState, useEffect } from 'react';
import styles from './AutoSlide.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function AutoSlide({ images, delay = 3000 }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
        }, delay);

        return () => clearInterval(interval);
    }, [images, delay]);

    return (
        <div className={cx('slideshow')}>
            <img src={images[currentSlide].url} alt="" />
        </div>
    );
}

export default AutoSlide;
