import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import classNames from 'classnames/bind';
import styles from './payment.module.css';

const cx = classNames.bind(styles);

const ShowAddressRadio = ({ onSelectAddress }) => {
    const db = getFirestore();
    const auth = getAuth();
    const [userID, setUserID] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserID(user.uid);
            } else {
                setUserID(null);
            }
        });

        return () => unsubscribe();
    }, [auth]);

    useEffect(() => {
        if (userID) {
            const fetchAddresses = async () => {
                const userDocRef = doc(db, 'user', userID);
                const addressesCollectionRef = collection(userDocRef, 'addressBook');
                const addressSnapshot = await getDocs(addressesCollectionRef);
                const addressData = await Promise.all(
                    addressSnapshot.docs.map(async (addressDoc) => {
                        const data = addressDoc.data();
                        const provinceDoc = data.province ? await getDoc(doc(db, `province/${data.province}`)) : null;
                        const districtDoc = data.district ? await getDoc(doc(db, `district/${data.district}`)) : null;
                        const wardDoc = data.ward ? await getDoc(doc(db, `wards/${data.ward}`)) : null;
                        return {
                            ...data,
                            provinceName: provinceDoc && provinceDoc.exists() ? provinceDoc.data().pName : '',
                            districtName: districtDoc && districtDoc.exists() ? districtDoc.data().dName : '',
                            wardName: wardDoc && wardDoc.exists() ? wardDoc.data().wName : '',
                        };
                    }),
                );
                setAddresses(addressData);
            };
            fetchAddresses();
        }
    }, [db, userID]);

    const handleAddressChange = (event) => {
        const selectedIndex = event.target.value;
        setSelectedAddress(selectedIndex);
        onSelectAddress(addresses[selectedIndex]);
    };

    return (
        <div>
            <h2>Sổ địa chỉ</h2>
            <div>
                {addresses.map((address, index) => (
                    <div key={index}>
                        <label className={cx('addressList')}>
                            <input
                                type="radio"
                                name="address"
                                value={index}
                                checked={selectedAddress === index.toString()}
                                onChange={handleAddressChange}
                            />
                            <div className={cx('addressList')}>
                                <p>{address.recipientName}|</p>
                                <p>Số điện thoại: {address.phoneNumber}|</p>
                                <p>Địa chỉ: {address.address},</p>
                                <p>{address.wardName},</p>
                                <p>{address.districtName},</p>
                                <p>{address.provinceName},</p>
                            </div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowAddressRadio;
