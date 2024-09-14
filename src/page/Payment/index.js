import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './payment.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

import Modal from './modal'; // Replace with your actual modal component import
import ShowAddressRadio from './ShowAddressRadio';
import billHandle from './billHandle';
import { clearCart } from './clearCart';

import { getAuth } from 'firebase/auth';

const cx = classNames.bind(styles);

const Payment = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const location = useLocation();
    const { cartItems } = location.state || { cartItems: [] };
    const [deliveryMethod, setDeliveryMethod] = useState('standard');
    const [deliveryCost, setDeliveryCost] = useState(20000);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
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
    const userId = GetUserUid();
    const handleDeliveryChange = (event) => {
        const method = event.target.id;
        setDeliveryMethod(method);
        setDeliveryCost(method === 'standard' ? 20000 : 200000);
    };
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSelectAddress = (address) => {
        setSelectedAddress(address);
        handleCloseModal();
    };
    const handleConfirmPayment = async () => {
        console.log('Selected Address:', selectedAddress);
        if (!selectedAddress) {
            console.error('No address selected');
            return;
        }
        try {
            await billHandle(userId, selectedAddress, cartItems, total, deliveryCost);
            setSuccessMessage('Mua hàng thành công!');
            clearCart(userId);
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Error during payment:', error);
        }
    };
    const total = cartItems.reduce((total, item) => total + item.totalProductPrice, 0);
    return (
        <div className={cx('container')}>
            <h1 style={{ marginLeft: '30px' }}>Thanh toán</h1>
            <div className={cx('deliveryInfo')}>
                <h2>Địa chỉ giao hàng:</h2>
                <button onClick={handleOpenModal}>Chọn địa chỉ giao hàng</button>
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <ShowAddressRadio onSelectAddress={handleSelectAddress} />
                </Modal>
                {selectedAddress && (
                    <div className={cx('address')}>
                        <p>Tên người nhận: {selectedAddress.recipientName} |</p>
                        <p>{selectedAddress.phoneNumber} |</p>
                        <p>Địa chỉ: {selectedAddress.address},</p>
                        <p>{selectedAddress.wardName},</p>
                        <p>{selectedAddress.districtName},</p>
                        <p>{selectedAddress.provinceName}</p>
                    </div>
                )}
            </div>
            <div className={cx('deliveryMethod')}>
                <h2>Phương thức vận chuyển</h2>
                <input
                    type="radio"
                    id="standard"
                    name="delivery"
                    checked={deliveryMethod === 'standard'}
                    onChange={handleDeliveryChange}
                />
                <label htmlFor="standard">Tiêu Chuẩn - 20000 VND</label>
                <input
                    type="radio"
                    id="fast"
                    name="delivery"
                    checked={deliveryMethod === 'fast'}
                    onChange={handleDeliveryChange}
                />
                <label htmlFor="fast">Hoả Tốc - 200000 VND</label>
            </div>
            <div className={cx('deliveryMethod')}>
                <h2>Phương thức thanh toán</h2>
                <input type="radio" id="cod" name="payment" defaultChecked />
                <label htmlFor="cod">COD</label>
                <input type="radio" id="card" name="payment" />
                <label htmlFor="card">Thẻ Ngân Hàng</label>
            </div>
            <div className={cx('productList')}>
                <h2 style={{ display: 'block' }}>Kiểm tra lại đơn hàng</h2>
                {cartItems.length > 0 ? (
                    <div>
                        {cartItems.map((item, index) => (
                            <div key={index} className={cx('product')}>
                                <div className={cx('col1')}>
                                    <img src={item.img} alt="{item.title}" />
                                </div>
                                <div className={cx('col2')}>{item.title}</div>
                                <div className={cx('col3')}>{item.newPrice}</div>
                                <div className={cx('col4')}>{item.qty}</div>
                                <div className={cx('col5')}>{item.totalProductPrice}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No items in the cart.</p>
                )}
            </div>

            <div className={cx('bottomBar')}>
                <div className={cx('innerBar')}>
                    <button onClick={handleConfirmPayment}>Xác nhận thanh toán</button>
                    <div className={cx('priceContainer')}>
                        <div className={cx('col6')}>
                            <div>Thành tiền: </div>
                            <div>Chi phí vận chuyển: </div>
                            <div>Tổng số tiền: </div>
                        </div>
                        <div className={cx('col7')}>
                            <span>{total} VND</span>
                            <span>{deliveryCost} VND</span>
                            <span>{total + deliveryCost} VND</span>
                        </div>
                    </div>
                </div>
            </div>
            {successMessage && (
                <div className={cx('successMessage')}>
                    <p>{successMessage}</p>
                </div>
            )}
        </div>
    );
};

export default Payment;
