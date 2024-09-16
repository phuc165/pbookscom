import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

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
const db = getFirestore(app);

async function billHandle(userId, selectedAddress, cartItems, total, deliveryCost) {
    try {
        if (
            !selectedAddress ||
            !selectedAddress.districtName ||
            !selectedAddress.phoneNumber ||
            !selectedAddress.provinceName ||
            !selectedAddress.recipientName ||
            !selectedAddress.wardName
        ) {
            throw new Error('Selected address is incomplete or undefined');
        }

        // Generate a unique ID for the bill
        const billId = uuidv4();

        // Create a reference to the bill document
        const billRef = doc(db, `bill/${userId}/bills/${billId}`);

        // Prepare the bill data
        const billData = {
            billTotal: total + deliveryCost,
            district: selectedAddress.districtName,
            phoneNumber: selectedAddress.phoneNumber,
            province: selectedAddress.provinceName,
            recipientName: selectedAddress.recipientName,
            ward: selectedAddress.wardName,
            address: selectedAddress.address,
            state: 'Đã đặt hàng',
            timestamp: new Date().toISOString(), // Add a timestamp
        };

        // Write the bill data to Firestore
        await setDoc(billRef, billData);

        // Write each product in the bill
        for (const item of cartItems) {
            const productRef = doc(db, `bill/${userId}/bills/${billId}/products/${item.id}`);
            const productData = {
                img: item.img,
                newPrice: item.newPrice,
                oldPrice: item.oldPrice,
                qty: item.qty,
                title: item.title,
            };
            await setDoc(productRef, productData);
        }

        console.log('Bill successfully written!');
    } catch (error) {
        console.error('Error writing bill: ', error);
    }
}

export default billHandle;
