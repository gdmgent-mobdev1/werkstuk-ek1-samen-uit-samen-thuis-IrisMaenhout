import {
    initializeApp
} from 'firebase/app';

import {
    getAuth,
    onAuthStateChanged
} from 'firebase/auth';


import {
    getFirestore,
    doc,
    deleteDoc
} from 'firebase/firestore';

import {
    getFirebaseConfig
} from '../firebase-config';

import renderSmallPopup from '../views/popup-small-view';



function deleteEvent() {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {

            // ___________get event id by using url_________
            const rootUrl = `${window.location.protocol}//${window.location.host}`;
            const fullUrl = window.location.href;
            const locationUrl = fullUrl.slice(rootUrl.length);
            const eventId = locationUrl.slice(11);


            const db = getFirestore();

            // __________show warning popup____________
            renderSmallPopup('Weet je zeker dat je dit event wilt verwijderen?');
            const updateEventPopup = document.querySelector('.create-edit-event');
            updateEventPopup.remove();

            const warningPopup = document.querySelector('.small-popup');
            const overlay = document.querySelectorAll('.overlay');


            const btnRemove = document.querySelector('.small-popup .yes');
            const btnCancel = document.querySelector('.small-popup .no');


            // _______cancel_____________

            btnCancel.addEventListener('click', () => {
                warningPopup.remove();
                overlay.forEach((x) => {
                    x.remove()
                });

            });

            btnRemove.addEventListener('click', deleteEvent);


            // ____________delete event_________________
            async function deleteEvent() {
                await deleteDoc(doc(db, "events", eventId));
                
                window.location.href = `${window.location.protocol}//${window.location.host}/home`;
                warningPopup.remove();
                overlay.forEach((x) => {
                    x.remove();
                });
            }

        }
    });
}

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
export default deleteEvent;