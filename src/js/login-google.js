import 'regenerator-runtime/runtime';


import {
    initializeApp
} from "firebase/app";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';

import {
    getFirestore,
    collection,
    getDocs,
    doc,
    query,
    where
} from 'firebase/firestore';

import {
    getFirebaseConfig
} from './firebase-config';

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

function signInGoogle() {
    const db = getFirestore();
    var firestoreUserId;

    async function sendUserInfoToFirestore(user) {

        //Send info to firestore when a user logs in for the first time but disallow this if he/she has logged in more than 1 time.
        if (user != null) {
            try {
                const usersRef = collection(db, "users");
                const q = query(usersRef, where("userId", "==", user.uid));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    firestoreUserId = doc.data().userId;
                });
            } catch(e) {
                console.error('No user found in firestore with the same id');
            }

        } else {
            console.error('there is no user');
        }
        if (firestoreUserId === undefined || firestoreUserId === null) {
            try {
                const user = getAuth().currentUser;
                const docRef = await addDoc(collection(db, "users"), {
                    userId: user.uid,  
                    email: user.email,
                    firstName: null,
                    lastName: null,
                    userName: user.displayName,
                    phoneNumber: user.phoneNumber,
                    avatar: user.photoURL,
                    currentLocation: null
                });
                window.location.href = `${window.location.protocol}//${window.location.host}/home`;
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        } else {
            window.location.href = `${window.location.protocol}//${window.location.host}/home`;
        }


    }

    
    //_____log in with google________

    const logInWithGoogle = async () => {
        const google = new GoogleAuthProvider();
        await signInWithPopup(getAuth(), google)
            .then(() => {
                const user = getAuth().currentUser;
                if (user) {
                    sendUserInfoToFirestore(user);
                } else {
                    console.error(' No user is signed in.');
                }
            });


    }

    logInWithGoogle();
}

export default signInGoogle;