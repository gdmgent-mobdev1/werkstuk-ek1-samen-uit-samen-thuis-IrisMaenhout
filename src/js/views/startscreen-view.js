import elements from '../element-factory';

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
                }
            });

            const registerBtn = elements.createBtn({
                textContent: "Registreer",
                classList: 'secundary',
                onClick() {
                    window.location.href = `${window.location.protocol}//${window.location.host}/registreer`;
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