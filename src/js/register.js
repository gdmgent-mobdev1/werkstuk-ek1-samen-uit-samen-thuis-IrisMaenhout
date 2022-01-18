import 'regenerator-runtime/runtime';
import elements from './element-factory';

import {
    initializeApp
} from 'firebase/app';

import {
    getAuth,
    createUserWithEmailAndPassword
} from 'firebase/auth';


import {
    getFirestore,
    collection,
    addDoc
} from 'firebase/firestore';


import {
    getFirebaseConfig
} from './firebase-config';


async function register() {
    const firstName = document.getElementById('firstname').value;
    const lastName = document.getElementById('lastname').value;
    const formData = new FormData(document.querySelector('form'));
    const email = formData.get('email');
    const password = formData.get('password');

    const errorMessage = document.querySelector('.error');

    if(errorMessage != null){
        errorMessage.remove();
    }

    const form = document.querySelector('form');

    if(email != ''&& password !='' && firstName != '' && lastName !=''){
        try {
            // ____________register_____________
            await createUserWithEmailAndPassword(getAuth(), email, password);


            // _________send info to firestore__________
            const db = getFirestore();

            try {
                const user = getAuth().currentUser;
                const docRef = await addDoc(collection(db, "users"), {
                    userId: user.uid,  
                    email: user.email,
                    firstName: firstName,
                    lastName: lastName,
                    userName: user.displayName,
                    phoneNumber: user.phoneNumber,
                    avatar: user.photoURL,
                    currentLocation: null
                });
                window.location.href = `${window.location.protocol}//${window.location.host}/registreer/extra-info`;
            } catch (e) {
                console.error("Error adding document: ", e);
            }
    
        } catch (e) {
            const errorMessageFirebase = elements.createParagraph({
                classList: "error",
                textContent: `${e.message}`
            });

            form.before(errorMessageFirebase);
        }
    }else{
        const errorMessageFields = elements.createParagraph({
            classList: "error",
            textContent: "Vul alle velden in"
        });
        form.before(errorMessageFields);
    }
}

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

export default register;