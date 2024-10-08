import { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

async function getCartItems(uid) {
    if (uid === null) {
        console.error('User is not logged in. Cannot retrieve cart items.');
        return [];
    }

    try {
        const db = getFirestore();
        const cartCollectionName = `Cart_${uid}`;
        const cartRef = collection(db, cartCollectionName);

        console.log('User ID:', uid);
        console.log('Firestore Collection Path:', cartCollectionName);

        const cartSnapshot = await getDocs(cartRef);
        console.log('Cart Snapshot:', cartSnapshot.docs);

        const cartItems = cartSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return cartItems;
    } catch (error) {
        console.error('Error retrieving cart items:', error);
        return [];
    }
}
export default getCartItems;
