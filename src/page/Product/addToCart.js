import { getFirestore, collection, doc, setDoc, updateDoc, getDocs, query, where } from 'firebase/firestore';

async function addToCart(uid, product, qty) {
    if (!uid) {
        console.error('User is not logged in. Cannot add product to cart.');
        return;
    }

    console.log('Product to add:', product); // Debugging line

    if (!product.id || !product.newPrice) {
        console.error('Product ID or price is not defined. Cannot add product to cart.');
        return;
    }

    try {
        const db = getFirestore();
        const cartCollectionName = `Cart_${uid}`;
        const cartRef = collection(db, cartCollectionName);

        // Create a query for the product document
        const productQuery = query(cartRef, where('id', '==', product.id));
        const productDocSnapshot = await getDocs(productQuery);

        if (productDocSnapshot.empty) {
            // Product doesn't exist in the cart, add it
            await setDoc(doc(cartRef, product.id), {
                ...product,
                qty: qty,
                totalProductPrice: qty * product.newPrice,
                img: product.img1,
            });
        } else {
            // Product already exists in the cart, update its quantity
            const productDoc = productDocSnapshot.docs[0];
            const productData = productDoc.data(); // Access data from the first document
            await updateDoc(productDoc.ref, {
                qty: productData.qty + qty,
                totalProductPrice: (productData.qty + qty) * product.newPrice,
            });
        }

        console.log('Product added to cart successfully');
    } catch (error) {
        console.error('Error adding product to cart:', error);
    }
}
export default addToCart;
