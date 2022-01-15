import elements from '../element-factory';
import contentSpaDiv from '../main';
import showAddInfoPage from '../views/extra-info-user-view';
import register from '../register';


import {
    initializeApp
} from 'firebase/app';

import {
    getAuth,
    onAuthStateChanged
} from "firebase/auth";

import {
    getFirebaseConfig
} from '../firebase-config';

function showRegisterPage() {
    // const auth = getAuth();
    // onAuthStateChanged(auth, (user) => {
    //     if (!user) {
            const spaDiv = document.querySelector('.content-spa');

            const registerOrLoginPage = elements.createDiv({
                classList: "register-login-page container"
            });
            const titleLogIn = elements.createHeading({
                size: 1,
                textContent: "Registreer"
            });

            const formLoginRegister = elements.createFormTag({
                classList: "register-login-form",
                method: "post"
            });

            // _______________________________________________________

            const firstNameLabel = elements.createLabel({
                textContent: 'Voornaam',
                labelFor: "firstname"
            });

            const firstNameInput = elements.createInputTag({
                type: "text",
                id: 'firstname',
                name: 'firstname',
                required: true
            });

            // ____________________________________
            const lastNameLabel = elements.createLabel({
                textContent: 'Achternaam',
                labelFor: "lastname"
            });

            const lastNameInput = elements.createInputTag({
                type: "text",
                id: 'lastname',
                name: 'lastname',
                required: true
            });

            // ____________________________________________
            const emailLabel = elements.createLabel({
                textContent: 'Email',
                labelFor: "email"
            });

            const emailInput = elements.createInputTag({
                type: "email",
                id: 'email',
                name: 'email',
                required: true
            });

            // __________________________________________
            const passwordLabel = elements.createLabel({
                textContent: 'Wachtwoord',
                labelFor: "password"
            });

            const passwordInput = elements.createInputTag({
                type: "password",
                id: 'password',
                name: 'password',
                required: true
            });

            // ________________________________________

            const primairBtnLoginPage = elements.createBtn({
                textContent: "Registreer",
                classList: 'primair',
                onClick() {
                    // window.location.href = "#";
                    register();
                    // .then(()=>{
                    //     registerOrLoginPage.remove();
                    //     showAddInfoPage();
                    // });

                }
            });



            const pLogin = elements.createParagraph({
                textContent: "Heb je al een account?",
                classList: "to-register-page"
            });

            const linkToLoginPage = elements.createLink({
                textContent: "Log je hier in",
                href: `${window.location.protocol}//${window.location.host}/inloggen`
            })

            // contentSpaDiv.appendChild(registerOrLoginPage);
            spaDiv.appendChild(registerOrLoginPage);
            registerOrLoginPage.append(titleLogIn, formLoginRegister, primairBtnLoginPage, pLogin, linkToLoginPage);
            formLoginRegister.append(firstNameLabel, firstNameInput, lastNameLabel, lastNameInput, emailLabel, emailInput, passwordLabel, passwordInput);

        // } else {
        //     window.location.href = `${window.location.protocol}//${window.location.host}/home`;

        // }
    // });

}

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
export default showRegisterPage;