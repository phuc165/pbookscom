import React, { useState, useEffect } from 'react';
import { collection, doc, getDocs, updateDoc, deleteDoc, getFirestore } from 'firebase/firestore';
import classNames from 'classnames/bind';
import styles from './order.module.css';
import { v4 as uuidv4 } from 'uuid';

const cx = classNames.bind(styles);
const db = getFirestore();

const Order = () => {
    const [bills, setBills] = useState([]);
    const [selectedBill, setSelectedBill] = useState(null);
    useEffect(() => {
        const fetchUserIds = async () => {
            const usersCollection = collection(db, 'user');
            const usersSnapshot = await getDocs(usersCollection);
            return usersSnapshot.docs.map((doc) => doc.id);
        };

        const fetchBills = async () => {
            const userIds = await fetchUserIds();
            let allBills = [];

            for (const userId of userIds) {
                const userBillsCollection = collection(db, `bill/${userId}/bills`);
                const billsSnapshot = await getDocs(userBillsCollection);
                const userBills = await Promise.all(
                    billsSnapshot.docs.map(async (doc) => {
                        const billData = { id: doc.id, userId, ...doc.data() };
                        const products = await fetchProducts(userId, doc.id);
                        return { ...billData, products };
                    }),
                );
                allBills = [...allBills, ...userBills];
            }

            setBills(allBills);
        };

        fetchBills();
    }, []);

    const updateBillState = async (userId, billId, newState) => {
        const billDoc = doc(db, `bill/${userId}/bills`, billId);
        await updateDoc(billDoc, { state: newState });
        setBills(bills.map((bill) => (bill.id === billId ? { ...bill, state: newState } : bill)));
    };

    const deleteBill = async (userId, billId) => {
        const billDoc = doc(db, `bill/${userId}/bills`, billId);
        await deleteDoc(billDoc);
        setBills(bills.filter((bill) => bill.id !== billId));
    };

    const handleDelete = (bill) => {
        if (bill.state === 'Hoàn tất đơn hàng') {
            deleteBill(bill.userId, bill.id);
        } else {
            alert('Chỉ có thể xoá đơn hàng khi đã hoàn tất đơn hàng');
        }
    };

    const handleStateChange = (billId, userId, event) => {
        const newState = event.target.value;
        updateBillState(userId, billId, newState);
    };
    const fetchProducts = async (userId, billId) => {
        const productsCollection = collection(db, `bill/${userId}/bills/${billId}/products`);
        const productsSnapshot = await getDocs(productsCollection);
        return productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    };
    const handleBillClick = (bill) => {
        setSelectedBill(bill);
    };
    return (
        <>
            <h1>Quản lý đơn hàng</h1>
            <div className={cx('container')}>
                <div className={cx('inner')}>
                    {bills.map((bill) => {
                        const firstProduct = bill.products && bill.products.length > 0 ? bill.products[0] : null;
                        return (
                            <div className={cx('inner2')}>
                                <div className={cx('state')}>
                                    <select
                                        value={bill.state}
                                        onChange={(event) => handleStateChange(bill.id, bill.userId, event)}
                                    >
                                        <option value="Đã đặt">Đã đặt</option>
                                        <option value="Đang vận chuyển">Đang vận chuyển</option>
                                        <option value="Đã nhận hàng">Đã nhận hàng</option>
                                        <option value="Hoàn tất đơn hàng">Hoàn tất đơn hàng</option>
                                    </select>
                                    <button onClick={() => handleDelete(bill)}>Xoá đơn hàng</button>
                                </div>
                                <div key={bill.id} onClick={() => handleBillClick(bill)} className={cx('bill')}>
                                    <div className={cx('info')}>
                                        <div className={cx('left')}>
                                            <div className={cx('line1')}>
                                                <p>Tên người nhận: {bill.recipientName} |</p>
                                                <p>{bill.phoneNumber} |</p>
                                                <p>Thành tiền: {bill.billTotal} VND</p>
                                            </div>
                                            <p>
                                                Địa chỉ giao hàng: {bill.address}, {bill.ward}, {bill.district},{' '}
                                                {bill.province}
                                            </p>
                                        </div>
                                        <p>Trạng thái đơn hàng: {bill.state}</p>
                                    </div>
                                    {firstProduct && (
                                        <div className={cx('product')}>
                                            <div className={cx('col1')}>
                                                <img src={firstProduct.img} alt="{firstProduct.title}" />
                                            </div>
                                            <div className={cx('col2')}>{firstProduct.title}</div>
                                            <div className={cx('col3')}>
                                                <span>{firstProduct.newPrice}</span>
                                                <span className={cx('old')}>{firstProduct.oldPrice}</span>
                                            </div>
                                            <div className={cx('col4')}>{firstProduct.qty}</div>
                                            <div className={cx('col5')}>{firstProduct.qty * firstProduct.newPrice}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                {selectedBill && (
                    <div className={cx('modal-overlay')}>
                        <div className={cx('modal-box')}>
                            <h2>Chi tiết đơn hàng:</h2>
                            <p>Tên người nhận: {selectedBill.recipientName}</p>
                            <p>Số điện thoại: {selectedBill.phoneNumber}</p>
                            <p>
                                Địa chỉ giao hàng: {selectedBill.address}, {selectedBill.ward}, {selectedBill.district},{' '}
                                {selectedBill.province}
                            </p>
                            <p>Thanh toán: {selectedBill.billTotal}</p>
                            <h3>Sản phẩm:</h3>
                            <ul>
                                {selectedBill.products && selectedBill.products.length > 0 ? (
                                    selectedBill.products.map((product, index) => (
                                        <div key={index} className={cx('product')}>
                                            <div className={cx('col1')}>
                                                <img src={product.img} alt="{product.title}" />
                                            </div>
                                            <div className={cx('col2')}>{product.title}</div>
                                            <div className={cx('col3')}>
                                                <span>{product.newPrice}</span>
                                                <span className={cx('old')}>{product.oldPrice}</span>
                                            </div>
                                            <div className={cx('col4')}>{product.qty}</div>
                                            <div className={cx('col5')}>{product.qty * product.newPrice}</div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No products found for this bill.</p>
                                )}
                            </ul>
                            <button onClick={() => setSelectedBill(null)} className={cx('modal-close')}>
                                Đóng
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Order;
