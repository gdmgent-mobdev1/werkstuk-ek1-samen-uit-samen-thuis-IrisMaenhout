import 'regenerator-runtime/runtime';
import elements from './element-factory';

import {
    initializeApp
} from 'firebase/app';

import {
    getAuth,
    updateProfile,
    onAuthStateChanged
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

async function extraInfo() {
    const auth = getAuth();
    const db = getFirestore();
    onAuthStateChanged(auth, (user) => {
        if (user) {

            const userName = document.getElementById('username').value;
            const phoneNumber = document.getElementById('phone-number').value;

            const form = document.querySelector('form');
            const errorMessage = document.querySelector('.error');
            console.log(errorMessage);

            if (errorMessage != null) {
                errorMessage.remove();
            }

            //_______checking if there are empty fields_______
            if (userName != '' && phoneNumber != '') {
                console.log(userName);
                console.log(phoneNumber);

                // _________update auth_____________

                updateProfile(auth.currentUser, {
                    displayName: userName,
                    phoneNumber: phoneNumber
                }).then(() => {
                    console.log('profile is updated!');
                    console.log(user);

                }).catch((error) => {
                    console.log(error);
                });

                // __________update firestore_________
                const usersRef = collection(db, "users");
                const q = query(usersRef, where("userId", "==", getAuth().currentUser.uid));
                async function updateInfo() {
                    const querySnapshot = await getDocs(q);

                    querySnapshot.forEach((result) => {
                        async function updateInfoFirestore() {
                            const userInfo = doc(db, "users", result.id);
                            await updateDoc(userInfo, {
                                phoneNumber: phoneNumber,
                                userName: userName
                            });
                        };
                        updateInfoFirestore();
                        console.log('succes');
                        window.location.href = `${window.location.protocol}//${window.location.host}/home`;
                    });
                }

                updateInfo();


            } else {
                console.log('Er zijn velden die niet zijn ingevuld');

                const errorMessageFields = elements.createParagraph({
                    classList: "error",
                    textContent: "Vul alle velden in"
                });
                form.before(errorMessageFields);
            }

        } else {
            console.log('no user found');
        }
    });


}


const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

export default extraInfo;