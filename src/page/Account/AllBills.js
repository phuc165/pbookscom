import React, { useState, useEffect } from 'react';
import fetchAllBills from './fetchAllBills';
import styles from './Modal.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const AllBills = ({ userId }) => {
    const [bills, setBills] = useState([]);
    const [selectedBill, setSelectedBill] = useState(null);

    useEffect(() => {
        async function loadBills() {
            try {
                const billsData = await fetchAllBills(userId);
                setBills(billsData);
            } catch (error) {
                console.error('Error fetching bills:', error);
            }
        }

        loadBills();
    }, [userId]);

    const handleBillClick = (bill) => {
        setSelectedBill(bill);
    };

    return (
        <div className={cx('container')}>
            <h2>Danh sách đơn hàng: </h2>
            <div className={cx('inner')}>
                {bills.map((bill) => {
                    const firstProduct = bill.products && bill.products.length > 0 ? bill.products[0] : null;
                    return (
                        <div key={bill.id} onClick={() => handleBillClick(bill)} className={cx('bill')}>
                            <div className={cx('info')}>
                                <p>Tên người nhận: {bill.recipientName} |</p>
                                <p>{bill.phoneNumber} |</p>
                                <p>
                                    {bill.address}, {bill.ward}, {bill.district}, {bill.province} |
                                </p>
                                <p>Thành tiền: {bill.billTotal} VND</p>
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
    );
};

export default AllBills;
