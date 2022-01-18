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
    doc,
    getDoc,
    query,
    where,
    getDocs
} from 'firebase/firestore';


import {
    getFirebaseConfig
} from '../../firebase-config';

function showPopupCallSeomeone() {
    const overlay = elements.createOverlay();
    const popup = elements.createDiv({
        classList: "call"
    });

    const fixedHeader = elements.createDiv({
        classList: "fixed-header"
    });

    const divInFixedHeader = elements.createDiv({});

    const buttonClose = elements.createBtn({
        classList: "close",
        onClick() {
            popup.remove();
            overlay.remove();
            const callBtn = document.querySelector('.callBtn');
        }
    });

    const iClose = elements.createI({
        classList: "fas fa-times"
    });

    const title = elements.createHeading({
        size: 2,
        textContent: "Bellen naar:"
    });

    const line = elements.createLine({});

    const divPersons = elements.createDiv({
        classList: "persons"
    });

    const contentSpa = document.querySelector('.content-spa');
    contentSpa.append(overlay, popup);
    popup.append(fixedHeader, divPersons);
    fixedHeader.append(divInFixedHeader, line);
    divInFixedHeader.append(buttonClose, title);
    buttonClose.appendChild(iClose);

    const eventId = sessionStorage.getItem('eventOfTheDay');
    const auth = getAuth();
    const db = getFirestore();
    const docRef = doc(db, "events", eventId);
    const usersRef = collection(db, "users");

    onAuthStateChanged(auth, (user) => {
        if (navigator.geolocation) {
            if (user) {
                getEventLocation(user);
            }
        }
    })



    async function getEventLocation(user) {
        const docSnap = await getDoc(docRef);
        const x = document.querySelector('body');
        divPersons.innerHTML = `
        <a class="person" href="tel:101">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Police_of_Belgium_insignia.svg/640px-Police_of_Belgium_insignia.svg.png" alt="bel politie">
            <p>Politie</p>
        </a>`

        if (docSnap.exists()) {
            docSnap.data().joinedUsers.forEach(async (friend) => {
                if (friend != user.uid) {

                    const currentUserQuery = query(usersRef, where("userId", "==", friend));
                    const querySnapshot = await getDocs(currentUserQuery);

                    querySnapshot.forEach(async (document) => {
                        divPersons.innerHTML += `
                        <a class="person" href="tel:${document.data().phoneNumber}">
                        <img src=${document.data().avatar}
                            alt="bel persoon">
                        <p>${document.data().firstName} ${document.data().lastName}</p>
                    </a>
                        `
                    })

                }
            })

        } else {
            console.log('does not exist');
        }
    }


}

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

export default showPopupCallSeomeone;