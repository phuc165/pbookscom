import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, batch } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
async function fetchDataFromFile() {
    try {
        const response = await fetch('db/product.json');
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`);
        }
        const rawData = await response.text(); // Get the text content
        const data = JSON.parse(rawData); // Parse as JSON
        // Now 'data' should be an array of products
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Re-throw the error for handling in the calling component
    }
}
function ImportData() {
    const [data, setData] = useState([]);
    const [firestore] = getFirestore();

    useEffect(() => {
        fetchDataFromFile()
            .then((fetchedData) => {
                setData(fetchedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    console.log(typeof fetchedData);
    const handleImport = () => {
        const batch = batch();
        data.forEach((product) => {
            const docRef = doc(firestore, 'product', product.productID);
            batch.set(docRef, product);
        });

        batch
            .commit()
            .then(() => {
                console.log('Data imported successfully!');
            })
            .catch((error) => {
                console.error('Error importing data: ', error);
            });
    };

    return (
        <div>
            <button onClick={handleImport}>Import Data</button>
        </div>
    );
}
export default ImportData;
