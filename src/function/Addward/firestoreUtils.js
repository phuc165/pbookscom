// firestoreUtils.js
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export const addWards = async (wards) => {
    const db = getFirestore();
    try {
        for (const ward of wards) {
            const docRef = await addDoc(collection(db, 'wards'), ward);
            console.log('Ward added with ID: ', docRef.id);
        }
        console.log('All wards added successfully');
    } catch (e) {
        console.error('Error adding wards: ', e);
    }
};
