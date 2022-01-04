import 'regenerator-runtime/runtime';
import elements from './element-factory';
import showAddInfoPage from './views/extra-info-user-view';

import {
    initializeApp
} from 'firebase/app';

import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged
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
    console.log(errorMessage);

    if(errorMessage != null){
        errorMessage.remove();
    }

    const form = document.querySelector('form');

    if(email != ''&& password !='' && firstName != '' && lastName !=''){
        try {

            // const currentcontent = document.querySelector('.register-login-page');
            // currentcontent.remove();
            // showAddInfoPage();

            //____registreren, staat nu onzichtbaar om development te vergemakkelijken______


            await createUserWithEmailAndPassword(getAuth(), email, password);
            // Signed in 
            console.log(getAuth().currentUser);

            // send info to firestore 
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
                    phoneNumber: user.phoneNumber
                });
                console.log("Document written with ID: ", docRef.id);
                // const currentcontent = document.querySelector('.register-login-page');
                // currentcontent.remove();
                // showAddInfoPage();
                window.location.href = `${window.location.protocol}//${window.location.host}/registreer/extra-info`;
            } catch (e) {
                console.error("Error adding document: ", e);
            }
    
        } catch (e) {
            console.log(e);
            
            const errorMessageFirebase = elements.createParagraph({
                classList: "error",
                textContent: `${e.message}`
            });

            form.before(errorMessageFirebase);
        }
    }else{
        console.log('Er zijn velden die niet zijn ingevuld');

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