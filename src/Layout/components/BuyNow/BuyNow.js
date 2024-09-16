import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs, setDoc, updateDoc, doc } from 'firebase/firestore';

const BuyNowWrapper = ({ product, uid }) => {
    const navigate = useNavigate();

    const BuyNow = async () => {
        if (uid === null) {
            console.error('User is not logged in. Cannot add product to cart.');
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
                    qty: 1,
                    totalProductPrice: product.newPrice,
                });
            } else {
                // Product already exists in the cart, update its quantity
                const productDoc = productDocSnapshot.docs[0];
                const productData = productDoc.data(); // Access data from the first document
                await updateDoc(productDoc.ref, {
                    qty: productData.qty + 1,
                    totalProductPrice: (productData.qty + 1) * product.newPrice,
                });
            }

            console.log('Product added to cart successfully');

            // Redirect to payment page
            navigate('/cart');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            // Handle errors (e.g., display an error message to the user)
        }
    };

    return <button onClick={BuyNow}>Mua ngay</button>;
};

export default BuyNowWrapper;
