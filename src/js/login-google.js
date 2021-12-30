import 'regenerator-runtime/runtime';


import {
    initializeApp
} from "firebase/app";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    signOut
} from 'firebase/auth';

import {
    getFirestore,
    collection,
    getDocs,
    doc,
    query,
    where,
    updateDoc
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
            console.log(user.uid);
            try {
                const usersRef = collection(db, "users");
                const q = query(usersRef, where("userId", "==", user.uid));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    firestoreUserId = doc.data().userId;
                    console.log(firestoreUserId);
                });
                console.log('no new document');
            } catch(e) {
                console.log('geen user in firebase gevonden met het juiste id');
            }

        } else {
            console.log('there is no user');
        }
        console.log(`firestoreUserId: ${firestoreUserId}`);
        if (firestoreUserId === undefined || firestoreUserId === null) {
            try {
                console.log('new document in firestore');
                const user = getAuth().currentUser;
                const docRef = await addDoc(collection(db, "users"), {
                    userId: user.uid,  
                    email: user.email,
                    firstName: null,
                    lastName: null,
                    userName: user.displayName,
                    phoneNumber: user.phoneNumber,
                    avatar: user.photoURL,
                    phoneNumber: user.phoneNumber
                });
                console.log("Document written with ID: ", docRef.id);
                // location.replace('./home.html');
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        } else {
            console.log('user zit al in de database, dus is niet meer toegevoegd.');
            // location.replace('./home.html');
        }


    }

    

    const logInWithGoogle = async () => {
        const google = new GoogleAuthProvider();
        await signInWithPopup(getAuth(), google)
            .then(() => {
                const user = getAuth().currentUser;
                console.log(user)
                if (user) {
                    console.log('User is signed in.');
                    console.log(user.uid);
                    sendUserInfoToFirestore(user);
                } else {
                    console.log(' No user is signed in.');
                }
            });


    }

    logInWithGoogle();
}

export default signInGoogle;