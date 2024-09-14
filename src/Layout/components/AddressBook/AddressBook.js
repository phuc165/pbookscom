import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, query, where, doc, addDoc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import classNames from 'classnames/bind';
import styles from './address.module.css';

const cx = classNames.bind(styles);

const AddAddress = () => {
    const db = getFirestore();
    const auth = getAuth();
    const [userID, setUserID] = useState(null);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [formData, setFormData] = useState({
        address: '',
        phoneNumber: '',
        recipientName: '',
        district: '',
        province: '',
        ward: '',
    });
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
        const fetchProvinces = async () => {
            const provinceCollection = collection(db, 'province');
            const provinceSnapshot = await getDocs(provinceCollection);
            setProvinces(provinceSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        };
        fetchProvinces();
    }, [db]);

    useEffect(() => {
        if (selectedProvince) {
            const fetchDistricts = async () => {
                const districtCollection = collection(db, 'district');
                const q = query(districtCollection, where('pID', '==', selectedProvince));
                const districtSnapshot = await getDocs(q);
                setDistricts(districtSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            };
            fetchDistricts();
        }
    }, [db, selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            const fetchWards = async () => {
                const wardCollection = collection(db, 'wards');
                const q = query(wardCollection, where('dID', '==', selectedDistrict));
                const wardSnapshot = await getDocs(q);
                setWards(wardSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            };
            fetchWards();
        }
    }, [db, selectedDistrict]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleProvinceChange = (e) => {
        const province = e.target.value;
        setSelectedProvince(province);
        setFormData({ ...formData, province });
        console.log('Selected Province:', province); // Debugging line
    };

    const handleDistrictChange = (e) => {
        const district = e.target.value;
        setSelectedDistrict(district);
        setFormData({ ...formData, district });
        console.log('Selected District:', district); // Debugging line
    };

    const handleWardChange = (e) => {
        const ward = e.target.value;
        setSelectedWard(ward);
        setFormData({ ...formData, ward });
        console.log('Selected Ward:', ward); // Debugging line
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userID) {
            console.error('User ID is undefined');
            return;
        }
        const userDocRef = doc(db, 'user', userID);
        await setDoc(userDocRef, { email: auth.currentUser.email }, { merge: true });
        const addressesCollectionRef = collection(userDocRef, 'addressBook');
        await addDoc(addressesCollectionRef, formData);
        console.log('Address added successfully');
        console.log('Form Data:', formData); // Debugging line
    };

    return (
        <form onSubmit={handleSubmit} className={cx('container')}>
            <h2>Thêm địa chỉ: </h2>
            <input type="text" name="recipientName" placeholder="Tên người nhận" onChange={handleChange} />
            <input type="number" name="phoneNumber" placeholder="Nhập số điện thoại" onChange={handleChange} />
            <select onChange={handleProvinceChange}>
                <option value="">Chọn Tỉnh/Thành phố</option>
                {provinces.map((province) => (
                    <option key={province.id} value={province.id}>
                        {province.pName}
                    </option>
                ))}
            </select>

            <select onChange={handleDistrictChange} disabled={!selectedProvince}>
                <option value="">Chọn Quận/Huyện</option>
                {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                        {district.dName}
                    </option>
                ))}
            </select>

            <select onChange={handleWardChange} disabled={!selectedDistrict}>
                <option value="">Chọn Xã/Phường</option>
                {wards.map((ward) => (
                    <option key={ward.id} value={ward.id}>
                        {ward.wName}
                    </option>
                ))}
            </select>
            <input type="text" name="address" placeholder="Nhập địa chỉ..." onChange={handleChange} />
            <button type="submit">Lưu</button>
        </form>
    );
};

export default AddAddress;
