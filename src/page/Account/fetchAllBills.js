import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';

async function fetchAllBills(userId) {
    const db = getFirestore();
    const billsCollectionRef = collection(db, `bill/${userId}/bills`);
    const billsSnapshot = await getDocs(billsCollectionRef);

    const bills = await Promise.all(
        billsSnapshot.docs.map(async (billDoc) => {
            const billData = billDoc.data();
            const productsCollectionRef = collection(db, `bill/${userId}/bills/${billDoc.id}/products`);
            const productsSnapshot = await getDocs(productsCollectionRef);
            const products = productsSnapshot.docs.map((doc) => doc.data());
            return {
                id: billDoc.id,
                ...billData,
                products,
            };
        }),
    );

    return bills;
}

export default fetchAllBills;
