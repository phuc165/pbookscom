import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, query, where, doc, addDoc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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
        <form onSubmit={handleSubmit}>
            <select onChange={handleProvinceChange}>
                <option value="">Select Province</option>
                {provinces.map((province) => (
                    <option key={province.id} value={province.id}>
                        {province.pName}
                    </option>
                ))}
            </select>

            <select onChange={handleDistrictChange} disabled={!selectedProvince}>
                <option value="">Select District</option>
                {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                        {district.dName}
                    </option>
                ))}
            </select>

            <select onChange={handleWardChange} disabled={!selectedDistrict}>
                <option value="">Select Ward</option>
                {wards.map((ward) => (
                    <option key={ward.id} value={ward.id}>
                        {ward.wName}
                    </option>
                ))}
            </select>

            <input type="text" name="address" placeholder="Address" onChange={handleChange} />
            <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
            <input type="text" name="recipientName" placeholder="Recipient Name" onChange={handleChange} />

            <button type="submit">Save</button>
        </form>
    );
};

export default AddAddress;
