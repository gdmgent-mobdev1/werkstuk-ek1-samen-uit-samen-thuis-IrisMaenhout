import 'regenerator-runtime/runtime';
import elements from './element-factory';

import {
    initializeApp
} from "firebase/app";

import {
    getAuth,
    signInWithEmailAndPassword
} from 'firebase/auth';

import {
    getFirebaseConfig
} from './firebase-config';

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);


const login = async () => {
    const formData = new FormData(document.querySelector('form'));
    const email = formData.get('email');
    const password = formData.get('password');
    const auth = getAuth();

    const errorMessage = document.querySelector('.error');
    const form = document.querySelector('form');

    if(errorMessage != null){
        errorMessage.remove();
    }

    

    if(email != ''&& password !=''){

        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = `${window.location.protocol}//${window.location.host}/home`;
           
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

export default login;