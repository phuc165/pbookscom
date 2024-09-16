import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import classNames from 'classnames/bind';
import styles from '~/Layout/components/Header/Header.module.css';
import { initializeApp } from 'firebase/app';
import { Link } from 'react-router-dom';

const firebaseConfig = {
    apiKey: 'AIzaSyAhyRw3qy5j1gtpTmGgA6txMdDqGLz8nB8',
    authDomain: 'pbooks-1c947.firebaseapp.com',
    projectId: 'pbooks-1c947',
    storageBucket: 'pbooks-1c947.appspot.com',
    messagingSenderId: '851841749483',
    appId: '1:851841749483:web:29d21a13453693475a09ae',
    measurementId: 'G-SC81BW1GV2',
};

const app = initializeApp(firebaseConfig);
const cx = classNames.bind(styles);
const db = getFirestore();

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, 'product'));
            const data = querySnapshot.docs.map((doc) => doc.data());
            setAllProducts(data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setResults([]);
            return;
        }

        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filteredResults = allProducts.filter(
            (product) => product.title && product.title.toLowerCase().includes(lowerCaseSearchTerm),
        );
        setResults(filteredResults);
    }, [searchTerm, allProducts]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={cx('searchForm')} ref={searchRef}>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={cx('searchBar')}
                onFocus={() => setIsFocused(true)}
            />
            {isFocused && results.length > 0 && (
                <ul className={cx('result-list')}>
                    {results.map((result, index) => (
                        <Link to={`/product/${result.productID}`} className={cx('result-item')} key={index}>
                            <img src={result.img1} className={cx('resultImg')} alt={result.title} />
                            <p className={cx('resultTitle')}>{result.title}</p>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Search;
