import React, { useState } from 'react';
import style from './Slideshow.module.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

function Slideshow({ images }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleImageClick = (index) => {
        if (!isModalOpen) {
            setCurrentImageIndex(index);
        }
    };
    console.log(images);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={cx('imageContainer')}>
            <div id="gallery" className={cx('galleryContainer')}>
                <div className={cx('imgExtend')}>
                    <img
                        className={cx('expandedImg')}
                        src={images[currentImageIndex]}
                        alt=""
                        onClick={handleOpenModal}
                    />
                </div>
                <div className={cx('row')}>
                    {images.map((image, index) => (
                        <div className={cx('column')} key={index}>
                            <img src={image} alt="" onClick={() => handleImageClick(index)} />
                        </div>
                    ))}
                </div>
            </div>
            <div id="myModal" className={cx('modal')} style={{ display: isModalOpen ? 'block' : 'none' }}>
                <span className={cx('close')} onClick={handleCloseModal}>
                    &times;
                </span>
                <div className={cx('modal-content')}>
                    <div className={cx('imgExtend')}>
                        <img id="expandedImg2" src={images[currentImageIndex]} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Slideshow;
