import elements from '../../element-factory';
import warningMessage from './warning-message';
import btnsMap from './btns-map';

import {
    initializeApp
} from 'firebase/app';

import {
    getAuth,
    onAuthStateChanged
} from "firebase/auth";

import {
    getFirestore,
    doc,
    updateDoc,
    getDocs
} from 'firebase/firestore';


import {
    getFirebaseConfig
} from '../../firebase-config';

function showPopupHelpMe() {

    const db = getFirestore();
    const eventId = sessionStorage.getItem('eventOfTheDay');


    const divPopup = elements.createDiv({
        classList: "warning-sending-location container"
    });

    const textDiv = elements.createDiv({
        classList: "warning"
    });
    const btnDeactivate = elements.createDiv({
        classList: "deactivate"
    });

    btnDeactivate.addEventListener('click', () => {
        divPopup.remove();
        clearInterval(timer);
        clearTimeout(timeout);
    });

    const pText = elements.createParagraph({
        textContent: "Je vrienden krijgen een melding binnen "
    });

    const pBtn = elements.createParagraph({
        textContent: "Deactiveren"
    });

    const boldSec = elements.createB({
        classList: "seconds",
        textContent: "3s"
    });




    const contentSpa = document.querySelector('.content-spa');
    contentSpa.appendChild(divPopup);
    divPopup.append(textDiv, btnDeactivate);
    textDiv.appendChild(pText);
    btnDeactivate.appendChild(pBtn);
    pText.appendChild(boldSec);


    //____countdown from 3 to 0 and then send a notification______
    
    let sec = 3
    const timer = setInterval(updateCountDown, 1000);

    function updateCountDown() {
        sec = sec - 1;
        boldSec.textContent = `${sec}s`;
    }

    async function updateFirestore() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {

            if (user) {
                const docRef = doc(db, "events", eventId);
                async function sendUserIdToFiretore(){
                    await updateDoc(docRef, {
                        personInDanger: user.uid
                    });

                }
                sendUserIdToFiretore();
            }
        })

    }


    function sendWarning() {

        updateFirestore();

        divPopup.remove();
        warningMessage({});
        btnsMap.showIamSafeBtn();
        const sosBtn = document.querySelector('.sos');
        sosBtn.remove();
        btnsMap.showCallBtn();
    }

    const timeout = setTimeout(sendWarning, 3000);



}


const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
export default showPopupHelpMe;