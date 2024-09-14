import { collection, getDocs, doc, getFirestore, writeBatch } from 'firebase/firestore';

const db = getFirestore();

export const clearCart = async (uid) => {
    try {
        const cartCollectionRef = collection(db, `Cart_${uid}`);
        const cartSnapshot = await getDocs(cartCollectionRef);
        const batch = writeBatch(db); // Create a new batch

        cartSnapshot.forEach((doc) => {
            batch.delete(doc.ref);
        });

        await batch.commit(); // Commit the batch
        console.log('Cart cleared successfully');
    } catch (error) {
        console.error('Error clearing cart: ', error);
    }
};
