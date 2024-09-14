import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import AddAddress from '~/Layout/components/AddressBook/AddressBook';
import ShowAddressBook from '~/Layout/components/AddressBook/ShowAddressBook';

const AccountPage = () => {
    return (
        <div>
            <h2>Account Page</h2>
            <h3>Sổ địa chỉ: </h3>
            <AddAddress />
            <ShowAddressBook />
        </div>
    );
};

export default AccountPage;
