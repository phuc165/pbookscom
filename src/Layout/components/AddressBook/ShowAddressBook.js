import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import classNames from 'classnames/bind';
import styles from './showAddress.module.css';

const cx = classNames.bind(styles);

const ShowAddressBook = () => {
    const db = getFirestore();
    const auth = getAuth();
    const [userID, setUserID] = useState(null);
    const [addresses, setAddresses] = useState([]);

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

    return (
        <div className={cx('container')}>
            <h2>Sổ địa chỉ: </h2>
            <div className={cx('inner')}>
                {addresses.map((address, index) => (
                    <div key={index} className={cx('address')}>
                        <p>Tên người nhận: {address.recipientName},</p>
                        <p>Số điện thoại: {address.phoneNumber},</p>
                        <p>{address.address},</p>
                        <p>{address.provinceName},</p>
                        <p>{address.districtName},</p>
                        <p>{address.wardName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowAddressBook;
