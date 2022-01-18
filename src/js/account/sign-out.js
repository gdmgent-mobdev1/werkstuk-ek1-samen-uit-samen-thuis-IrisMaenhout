import {
    getAuth,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

import {
    initializeApp
} from 'firebase/app';

import {
    getFirebaseConfig
} from '../firebase-config';


function signOutFunction() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            signOut(auth).then(() => {
                window.location.href = `${window.location.protocol}//${window.location.host}/start`;

            }).catch((error) => {
               console.error(error);
            });
        }else{
            window.location.href = `${window.location.protocol}//${window.location.host}/start`;
        }
    });
  
}

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

export default signOutFunction;