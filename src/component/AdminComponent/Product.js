// ProductManager.js
import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './product.module.css';
import {
    getFirestore,
    collection,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    getDocs,
    query,
    startAfter,
    limit,
} from 'firebase/firestore';
import { Link } from 'react-router-dom';
const db = getFirestore();
const cx = classNames.bind(styles);
const Product = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        age: '',
        anHien: '',
        author: '',
        description: '',
        img1: '',
        img2: '',
        img3: '',
        img4: '',
        newPrice: '',
        nxb: '',
        oldPrice: '',
        productID: '',
        productQty: '',
        rating: '',
        theLoai: '',
        title: '',
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(false);
    const productsPerPage = 10; // Number of products per page

    const fetchProducts = async (page = 1) => {
        setLoading(true);
        let queryRef = collection(db, 'product');
        if (page > 1 && lastVisible) {
            queryRef = query(queryRef, startAfter(lastVisible), limit(productsPerPage));
        } else {
            queryRef = query(queryRef, limit(productsPerPage));
        }

        const querySnapshot = await getDocs(queryRef);
        const productsList = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setProducts(productsList); // Reset products state to only include the current page's products
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddProduct = async () => {
        await addDoc(collection(db, 'product'), newProduct);
        setNewProduct({
            age: '',
            anHien: '',
            author: '',
            description: '',
            img1: '',
            img2: '',
            img3: '',
            img4: '',
            newPrice: '',
            nxb: '',
            oldPrice: '',
            productID: '',
            productQty: '',
            rating: '',
            theLoai: '',
            title: '',
        });
    };

    const handleDeleteProduct = async (id) => {
        await deleteDoc(doc(db, 'product', id));
    };

    const handleUpdateProduct = async (id) => {
        const updatedProduct = {};
        for (const key in newProduct) {
            if (newProduct[key]) {
                updatedProduct[key] = newProduct[key];
            }
        }

        if (Object.keys(updatedProduct).length > 0) {
            await updateDoc(doc(db, 'product', id), updatedProduct);
            setProducts(products.map((product) => (product.id === id ? { ...product, ...updatedProduct } : product)));
        }
    };
    const handleSearch = () => {
        const results = products.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()));
        setSearchResults(results);
    };
    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        fetchProducts(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
            fetchProducts(currentPage - 1);
        }
    };
    const handleFileChange = (e, imgField) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const filePath = `/images/product/${file.name}`;
                setNewProduct((prevState) => ({ ...prevState, [imgField]: filePath }));
                // Save the file to the public/images/product folder
                saveFile(file, filePath);
            };
            reader.readAsDataURL(file);
        }
    };

    const saveFile = (file, filePath) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/upload', true);
        xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        xhr.setRequestHeader('X-File-Path', filePath);
        xhr.send(file);
    };
    return (
        <>
            <h1>Quản lý sản phẩm</h1>
            <div className={cx('container')}>
                <h2>Thêm/sửa Sản phẩm</h2>
                <div className={cx('add')}>
                    <input
                        type="text"
                        placeholder="Tiêu đề"
                        value={newProduct.title}
                        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Tác giả"
                        value={newProduct.author}
                        onChange={(e) => setNewProduct({ ...newProduct, author: e.target.value })}
                    />
                    <textarea
                        type="text"
                        placeholder="Mô tả"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    />
                    <label>Chọn hình ảnh</label>
                    <input type="file" onChange={(e) => handleFileChange(e, 'img1')} />
                    <input type="file" onChange={(e) => handleFileChange(e, 'img2')} />
                    <input type="file" onChange={(e) => handleFileChange(e, 'img3')} />
                    <input type="file" onChange={(e) => handleFileChange(e, 'img4')} />
                    <input
                        type="number"
                        placeholder="Giá mới"
                        value={newProduct.newPrice}
                        onChange={(e) => setNewProduct({ ...newProduct, newPrice: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Giá gốc"
                        value={newProduct.oldPrice}
                        onChange={(e) => setNewProduct({ ...newProduct, oldPrice: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Nhà xuất bản"
                        value={newProduct.nxb}
                        onChange={(e) => setNewProduct({ ...newProduct, nxb: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Tồn kho"
                        value={newProduct.productQty}
                        onChange={(e) => setNewProduct({ ...newProduct, productQty: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Thể loại"
                        value={newProduct.theLoai}
                        onChange={(e) => setNewProduct({ ...newProduct, theLoai: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Độ tuổi"
                        value={newProduct.age}
                        onChange={(e) => setNewProduct({ ...newProduct, age: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Hiển thị"
                        value={newProduct.anHien}
                        onChange={(e) => setNewProduct({ ...newProduct, anHien: e.target.value })}
                    />
                    <button onClick={handleAddProduct}>Thêm sản phẩm</button>
                </div>
                <h2>Tìm kiếm sản phẩm</h2>
                <div className={cx('add')}>
                    <input
                        type="text"
                        placeholder="Tìm theo tiêu đề..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={handleSearch}>Tìm</button>
                    <div>
                        {searchResults.map((product) => (
                            <div key={product.id}>
                                <h3>{product.title}</h3>
                                <p>{product.description}</p>
                                {/* Add other fields as needed */}
                                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                                <button onClick={() => handleUpdateProduct(product.id)}>Update</button>
                            </div>
                        ))}
                    </div>
                </div>
                <h2>Danh sách sản phẩm</h2>
                <div className={cx('list')}>
                    <div className={cx('product')}>
                        <div className={cx('col1')}>Ảnh 1</div>
                        <div className={cx('col2')}>Tiêu đề</div>
                        <div className={cx('col3')}>Giá</div>
                        <div className={cx('col4')}>Tồn kho</div>
                        <div className={cx('col5')}>Xem</div>
                        <div className={cx('col6')}>Xoá/Sửa</div>
                    </div>
                    {products.map((product) => (
                        <div key={product.id} className={cx('product')}>
                            <div className={cx('col1')}>
                                <img src={product.img1} alt="" />
                            </div>
                            <div className={cx('col2')}>{product.title}</div>
                            <div className={cx('col3')}>
                                <span>Giá mới: {product.newPrice}</span>
                                <span>Giá gốc:{product.oldPrice}</span>
                            </div>
                            <div className={cx('col4')}>{product.productQty}</div>
                            <Link to={`/product/${product.id}`} className={cx('col5')}>
                                Xem sản phẩm
                            </Link>
                            <div className={cx('col6')}>
                                <button onClick={() => handleDeleteProduct(product.id)}>Xoá</button>
                                <button onClick={() => handleUpdateProduct(product.id)}>Sửa</button>
                            </div>
                        </div>
                    ))}
                    {loading && <p>Loading...</p>}
                    <div className={cx('pagin')}>
                        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                            Trờ về
                        </button>
                        {currentPage}
                        <button onClick={handleNextPage} disabled={products.length < productsPerPage}>
                            Tiếp theo
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;
