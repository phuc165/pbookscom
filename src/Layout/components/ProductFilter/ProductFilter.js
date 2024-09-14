import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Productlist.module.css';
import debounce from 'lodash/debounce';
import { useNavigate } from 'react-router-dom';

import ProductCell from '../ProductCell/ProductCell';

import { getFirestore, collection, getDocs, query, where, orderBy, setDoc, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const cx = classNames.bind(styles);
const pageSize = 10;

function ProductFilter() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPublisher, setSelectedPublisher] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(9999999);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [sortBy, setSortBy] = useState('titleAsc');

    const GetUserUid = () => {
        const auth = getAuth();
        const [uid, setUid] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    setUid(user.uid);
                }
            });
        }, []);
        return uid;
    };
    const uid = GetUserUid();
    const navigate = useNavigate();
    let Product;

    async function addToCart(products) {
        if (uid === null) {
            console.error('User is not logged in. Cannot add product to cart.');
            return;
        }
        try {
            const db = getFirestore();
            const cartCollectionName = `Cart_${uid}`;
            const cartRef = collection(db, cartCollectionName);

            // Create a query for the product document
            const productQuery = query(cartRef, where('id', '==', products.id));
            const productDocSnapshot = await getDocs(productQuery);

            if (productDocSnapshot.empty) {
                // Product doesn't exist in the cart, add it
                await setDoc(doc(cartRef, products.id), {
                    ...products,
                    qty: 1,
                    totalProductPrice: products.newPrice,
                });
            } else {
                // Product already exists in the cart, update its quantity
                const productDoc = productDocSnapshot.docs[0];
                const productData = productDoc.data(); // Access data from the first document
                await updateDoc(productDoc.ref, {
                    qty: productData.qty + 1,
                    totalProductPrice: (productData.qty + 1) * products.newPrice,
                });
            }

            console.log('Product added to cart successfully');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            // Handle errors (e.g., display an error message to the user)
        }
    }

    const fetchProducts = async () => {
        const db = getFirestore();
        const productsCollection = collection(db, 'product');

        // Build query based on filters
        let productQuery = query(productsCollection);
        if (selectedCategory) {
            productQuery = query(productQuery, where('theLoai', '==', selectedCategory));
        }
        if (selectedPublisher) {
            productQuery = query(productQuery, where('nxb', '==', selectedPublisher));
        }
        // Check for valid price range before adding filter clauses
        if (minPrice > 0 && maxPrice > minPrice) {
            productQuery = query(productQuery, where('newPrice', '>=', minPrice), where('newPrice', '<=', maxPrice));
        }

        switch (sortBy) {
            case 'priceAsc':
                productQuery = query(productQuery, orderBy('newPrice', 'asc'));
                break;
            case 'priceDesc':
                productQuery = query(productQuery, orderBy('newPrice', 'desc'));
                break;
            case 'titleAsc':
                productQuery = query(productQuery, orderBy('title', 'asc'));
                break;
            case 'titleDesc':
                productQuery = query(productQuery, orderBy('title', 'desc'));
                break;
            // Add more sorting options as needed
            default:
                break;
        }

        const querySnapshot = await getDocs(productQuery); // Fetch filtered data
        const productsData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            productID: doc.id,
        }));
        console.log(selectedCategory);
        // Update state with filtered products
        setProducts(productsData);
        setTotalPages(Math.ceil(productsData.length / pageSize));
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    useEffect(() => {
        const debouncedFetchProducts = debounce(fetchProducts, 300);
        debouncedFetchProducts();
    }, [selectedCategory, selectedPublisher, minPrice, maxPrice, sortBy]);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = products.slice(startIndex, endIndex);

    return (
        <>
            <div className={cx('filterContainer')}>
                <div className={cx('filterComponent')}>
                    <label>Khoảng giá từ: </label>
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            console.log('New Min Price:', value); // Debugging line
                            setMinPrice(value);
                        }}
                    />
                </div>
                <div className={cx('filterComponent')}>
                    <label>đến: </label>
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            console.log('New Max Price:', value); // Debugging line
                            setMaxPrice(value);
                        }}
                    />
                </div>
                <select
                    className={cx('filterComponent')}
                    value={selectedPublisher}
                    onChange={(e) => setSelectedPublisher(e.target.value)}
                >
                    <option value="">Tất cả nhà xuất bản</option>
                    <option value="Nhà Xuất Bản Kim Đồng">Nhà Xuất Bản Kim Đồng</option>
                    <option value="Trẻ">Trẻ</option>
                    <option value="IPM">IPM</option>
                </select>
                <select
                    className={cx('filterComponent')}
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Tất cả thể loại</option>
                    <option value="Hành_động">Hành động</option>
                    <option value="Hài_hước">Hài hước</option>
                    <option value="Học_đường">Học đường</option>
                    <option value="Kỳ_ảo">Kỳ ảo</option>
                    <option value="Lãng_mạn">Lãng mạn</option>
                    <option value="Phiêu_lưu">Phiêu lưu</option>
                    <option value="Đời_thường">Đời thường</option>
                </select>
                <select className={cx('filterComponent')} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="priceAsc">Giá tăng dần</option>
                    <option value="priceDesc">Giá giảm dần</option>
                    <option value="titleAsc">Tên sản phẩm A-Z</option>
                    <option value="titleDesc">Tên sản phẩm Z-A</option>
                </select>
            </div>

            <div className={cx('listContainer')}>
                {paginatedProducts.map((product) => (
                    <ProductCell
                        addToCart={addToCart}
                        key={product.productID}
                        id={product.productID}
                        title={product.title}
                        img={product.img1}
                        newPrice={product.newPrice}
                        oldPrice={product.oldPrice}
                    />
                ))}
            </div>

            <div className={cx('pagin')}>
                <button onClick={handlePreviousPage}>Previous</button>
                <span>
                    {currentPage} / {totalPages}
                </span>
                <button onClick={handleNextPage}>Next</button>
            </div>
        </>
    );
}

export default ProductFilter;
