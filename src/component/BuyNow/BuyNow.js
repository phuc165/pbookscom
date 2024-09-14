import React from 'react';
import addToCart from '~/page/Product/addToCart';

const BuyNow = ({ qty, ...product }) => {
    const handleAddToCart = () => {
        product.qty = qty;
        addToCart(product);
        console.log(`Added ${qty} item(s) to the cart`);
    };

    return (
        <div>
            <button onClick={handleAddToCart}>Buy Now</button>
        </div>
    );
};

export default BuyNow;
