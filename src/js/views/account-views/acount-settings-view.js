import elements from "../../element-factory";
import signOut from "../../account/sign-out";
import signOutFunction from "../../account/sign-out";
import removeUser from "../../account/remove-account";
import renderSmallPopup from "../popup-small-view";

import {
    initializeApp
} from 'firebase/app';

import {
    getAuth,
    onAuthStateChanged
} from "firebase/auth";


import {
    getFirebaseConfig
} from '../../firebase-config';

function renderContentAcountSettings() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const contentDiv = elements.createDiv({
                classList: "content-acount-page container"
            });

            const pPersonalData = elements.createParagraph({
                textContent: "Peroonlijke gegevens"
            });

            pPersonalData.addEventListener('click', () => {
                window.location.href = `${window.location.protocol}//${window.location.host}/account/persoonlijke-gegevens`;
            });

            const pLogOut = elements.createParagraph({
                textContent: "Uitloggen"
            });

            pLogOut.addEventListener("click", () => {
                signOutFunction();
            });

            const pRemoveAccount = elements.createParagraph({
                textContent: "Account verwijderen",
                classList: "warning-text"
            });

            pRemoveAccount.addEventListener("click", () => {
                renderSmallPopup("Je staat op het punt om je account te verwijderen, wil je hiermee doorgaan?");
                removeUser();
            });

            const contentSpaDiv = document.querySelector('.content-spa');
            contentSpaDiv.appendChild(contentDiv);
            contentDiv.append(pPersonalData, pLogOut, pRemoveAccount);
        } else {
            window.location.href = `${window.location.protocol}//${window.location.host}/start`;
        }
    })

}

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

export default renderContentAcountSettings;







/* <header>
        <i class="fas fa-chevron-left"></i>
        <h2>Acount</h2>
    </header>

    <div class="content-acount-page">
        <p>Peroonlijke gegevens</p>
        <p>Uitloggen</p>
        <p class="waring-text">Account verwijderen</p>
    </div> */