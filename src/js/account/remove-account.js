import {
    getAuth,
    deleteUser
} from "firebase/auth";
import {
    doc,
    deleteDoc,
    getFirestore,
    collection,
    query,
    where,
    getDocs
} from "firebase/firestore";

import {
    initializeApp
} from 'firebase/app';

import {
    getFirebaseConfig
} from '../firebase-config';


function removeUser() {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();

    const popup = document.querySelector('.small-popup');
    const overlay = document.querySelector('.overlay');
    const yesBtn = popup.querySelector('.yes');
    const noBtn = popup.querySelector('.no');


    noBtn.addEventListener('click', () => {
        popup.remove();
        overlay.remove();
    });

    yesBtn.addEventListener('click', async () => {


        const userRef = collection(db, "users");

        const q = query(userRef, where("userId", "==", user.uid), );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (docUser) => {
            await deleteDoc(doc(db, "users", docUser.id));
        });



        deleteUser(user).then(() => {
            console.log('user is removed')
        }).catch((error) => {
            console.error(error);
        });
    });

}

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
export default removeUser;