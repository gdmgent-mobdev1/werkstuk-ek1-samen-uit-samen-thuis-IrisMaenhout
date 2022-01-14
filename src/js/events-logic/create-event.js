import 'regenerator-runtime/runtime';
import elements from '../element-factory';
import showPopUpEditEvent from '../views/create-edit-event-view';

import {
    initializeApp
} from 'firebase/app';

import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged
} from 'firebase/auth';


import {
    getFirestore,
    collection,
    addDoc,
} from 'firebase/firestore';




import {
    getFirebaseConfig
} from '../firebase-config';


function saveEventInFirebase() {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const sendInfoToFirestoreBtn = document.querySelector('.create-edit-event .primair');
            const db = getFirestore();
            sendInfoToFirestoreBtn.addEventListener('click', createEventInFirestore);

            function createEventInFirestore() {
                const title = document.getElementById('title').value;
                const dateTime = document.getElementById('date').value;
                const upload = document.getElementById('upload').value;
                const streetNr = document.getElementById('street-nr').value;
                const cityZip = document.getElementById('city').value;
                const description = document.getElementById('description').value;
                const inputfields = document.querySelectorAll('input');

                const today = new Date();
                const dateToday = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                const timeToday = today.getHours() + ":" + today.getMinutes();
                const dateTimeToday = dateToday + ' ' + timeToday;

                const time = dateTime.slice(11);
                const date = dateTime.slice(0, 10);

                const isNumber = /\d+/;
                const number = streetNr.match(isNumber);
                const zipCode = cityZip.match(isNumber);

                const city = cityZip.substr(0, cityZip.indexOf(' '));
                const street = streetNr.substr(0, streetNr.indexOf(' '));
                const imageUrl = sessionStorage.getItem('publicImageUrl');

                if (title != '' && dateTime != '' && upload != '' && streetNr != '' && cityZip != '') {
                    console.log('OK');
                    if (isNumber.test(streetNr) && isNumber.test(cityZip)) {


                        async function sendToFirestore() {
                            const docRef = await addDoc(collection(db, "events"), {
                                title: title,
                                date: date,
                                time: time,
                                imgEvent: imageUrl,
                                street: street,
                                number: number[0],
                                zip: zipCode[0],
                                city: city,
                                description: description,
                                invitedUsers: [],
                                rejectedUsers: [],
                                joinedUsers: [user.uid],
                                pictureCreator: user.photoURL,
                                creatorId: user.uid,
                                creatorUsername: user.displayName,
                                createdOn: dateTimeToday,
                                editedOn: null,
                                isCanceled: false,
                                personInDanger: null

                            });
                            console.log("Document written with ID: ", docRef.id);
                            window.location.href = `${window.location.protocol}//${window.location.host}/evenement/${docRef.id}`;

                        }

                        sendToFirestore();
                    } else {

                    }


                } else {


                    const pictureBtn = document.querySelector('.secundary');

                    if (upload == '') {
                        pictureBtn.style.backgroundColor = '#532a32';
                    } else {
                        pictureBtn.style.backgroundColor = '#2A3153';
                    }

                    inputfields.forEach((input) => {
                        if (input.value == '') {
                            input.style.backgroundColor = '#532a32';
                        } else {
                            input.style.backgroundColor = '#2A3153';
                        }
                    })
                    console.log('NOT OK');
                }


            }

        } else {
            window.location.href = `${window.location.protocol}//${window.location.host}/start`;
        }
    });
}

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

export default saveEventInFirebase;