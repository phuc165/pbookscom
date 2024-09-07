import AutoSlide from '~/Layout/components/AutoSlider/AutoSlide';
import classNames from 'classnames/bind';
import styles from './home.module.css';
import ProductList from '~/Layout/components/ProductList/ProductList';

const images = [
    { url: 'images/banner/banner_1.png' },
    { url: 'images/banner/banner_2.png' },
    { url: 'images/banner/banner_3.png' },
];

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <AutoSlide images={images} />
            <ProductList />
        </div>
    );
}

export default Home;
