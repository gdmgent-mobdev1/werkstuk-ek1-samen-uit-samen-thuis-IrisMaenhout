import showPopupCallSeomeone from "./popup-call";
import showPopupHelpMe from "./help-me-popup-view";
import chooseVehiclePopupView from "./choose-vehicle";

import elements from "../../element-factory";

import {
    initializeApp
} from 'firebase/app';

import {
    getAuth,
    onAuthStateChanged
} from "firebase/auth";

import {
    getFirestore,
    collection,
    addDoc,
    doc,
    getDoc,
    query,
    where,
    onSnapshot,
    updateDoc
} from 'firebase/firestore';


import {
    getFirebaseConfig
} from '../../firebase-config';


const btnsMap = {

    showHelpBtn() {

        const btn = elements.createBtn({
            classList: 'sos btn-map-page',
            onClick() {
                showPopupHelpMe();
            }
        });

        const spanText = elements.createSpan({
            textContent: 'Help me!'
        })

        const btnsDiv = document.querySelector('.btns-div-map');
        btnsDiv.append(btn);
        btn.appendChild(spanText);

    },
    showIamSafeBtn() {

        const btn = elements.createBtn({
            classList: 'safe-btn btn-map-page',
            onClick() {

                // const auth = getAuth();
                const db = getFirestore();
                const eventId = sessionStorage.getItem('eventOfTheDay');
                const docRef = doc(db, "events", eventId);
                async function sendUserIdToFiretore() {

                    await updateDoc(docRef, {
                        personInDanger: null
                    });
                    console.log('succes');

                }
                sendUserIdToFiretore();




                const warning = document.querySelector('.warning-top');
                warning.remove();
                btn.remove();
                btnsMap.showHelpBtn();
                const callBtn = document.querySelector('.callBtn');
                callBtn.remove();
            }
        });

        const spanText = elements.createSpan({
            textContent: "I'm safe"
        })

        const btnsdirectionsBtn = document.querySelector('.directionsBtn');
        btnsdirectionsBtn.before(btn);
        btn.appendChild(spanText);

    },

    showCallBtn() {
        const btn = elements.createBtn({
            classList: "directions-call callBtn btn-map-page",
            onClick() {
                showPopupCallSeomeone();
            }
        });

        const iCall = elements.createI({
            classList: "fas fa-phone-alt"
        });

        const btnsDivMap = document.querySelector('.btns-div-map');
        btnsDivMap.appendChild(btn);
        btn.appendChild(iCall);
    },

    showDirectionBtn() {
        const btn = elements.createBtn({
            classList: "directions-call directionsBtn btn-map-page",
            onClick() {
                let eventId = sessionStorage.getItem('eventOfTheDay');
                const db = getFirestore();
                const docRef = doc(db, "events", eventId);
                async function getEventLocation() {
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        chooseVehiclePopupView({
                            locationEvent: `${docSnap.data().street} ${docSnap.data().number}, ${docSnap.data().city}`
                        });
                    }
                }

                getEventLocation();
            }



        });

        const iDirections = elements.createI({
            classList: "fas fa-directions"
        });

        const btnsDivMap = document.querySelector('.btns-div-map');
        btnsDivMap.appendChild(btn);
        btn.appendChild(iDirections);
    },

    closeDirectionsBtn() {
        const btn = elements.createBtn({
            classList: "directions-call closeDirectionsBtn btn-map-page",
            onClick() {
                window.location.href = `${window.location.protocol}//${window.location.host}/kaart`;
            }
        });

        const iClose = elements.createI({
            classList: "fas fa-times"
        });

        const btnsDivMap = document.querySelector('.btns-div-map');
        btnsDivMap.appendChild(btn);
        btn.appendChild(iClose);
    }


}

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

export default btnsMap;