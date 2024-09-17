import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const useUserRole = () => {
    const [role, setRole] = useState(null);
    const auth = getAuth();
    const db = getFirestore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = await getDoc(doc(db, 'user', user.uid));
                if (userDoc.exists()) {
                    setRole(userDoc.data().role);
                }
            } else {
                setRole(null);
            }
        });

        return () => unsubscribe();
    }, [auth, db]);

    return role;
};

export default useUserRole;
