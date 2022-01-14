import elements from '../element-factory';
import showLoginPage from './login-view';
import showRegisterPage from './register-view';

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

function showStartScreen() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            let bodyElement = document.body;
            let contentSpaDiv = document.querySelector('.content-spa');

            const divCenter = elements.createDiv({
                classList: "beginscreen"
            });
            const logoStartScreen = elements.createHeading({
                size: 1,
                textContent: "Samen uit, samen thuis"
            });

            const loginBtn = elements.createBtn({
                textContent: "Log in",
                classList: 'primair',
                onClick() {
                    window.location.href = `${window.location.protocol}//${window.location.host}/inloggen`;
                    // divCenter.remove();
                    // showLoginPage();

                    // router.navigate('/inloggen');
                }
            });

            const registerBtn = elements.createBtn({
                textContent: "Registreer",
                classList: 'secundary',
                onClick() {
                    // window.location.href = "#";
                    // divCenter.remove();
                    // showRegisterPage();
                    window.location.href = `${window.location.protocol}//${window.location.host}/registreer`;
                    // router.navigate('/registreer');
                }
            });

            contentSpaDiv.appendChild(divCenter);
            divCenter.append(logoStartScreen, loginBtn, registerBtn);
        } else {
            window.location.href = `${window.location.protocol}//${window.location.host}/home`;
        }
    })

}

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
export default showStartScreen;