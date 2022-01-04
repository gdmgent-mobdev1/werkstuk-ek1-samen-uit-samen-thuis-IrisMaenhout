import 'regenerator-runtime/runtime';
import elements from './element-factory';

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
    getFirebaseConfig
} from './firebase-config';

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);


const login = async () => {
    // e.preventDefault();
    const formData = new FormData(document.querySelector('form'));
    const email = formData.get('email');
    const password = formData.get('password');
    const auth = getAuth();

    const errorMessage = document.querySelector('.error');
    console.log(errorMessage);
    const form = document.querySelector('form');

    if(errorMessage != null){
        errorMessage.remove();
    }

    

    if(email != ''&& password !=''){

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // location.replace('./home.html');
            console .log('succes');
            window.location.href = `${window.location.protocol}//${window.location.host}/home`;
            console.log(auth.currentUser);
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

export default login;