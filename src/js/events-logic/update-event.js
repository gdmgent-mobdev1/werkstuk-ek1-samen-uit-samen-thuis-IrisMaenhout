import 'regenerator-runtime/runtime';
import elements from '../element-factory';
import showPopUpEditEvent from '../views/create-edit-event-view';
import deleteEvent from './delete-event';

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
    doc,
    getDoc,
    query,
    where,
    onSnapshot,
    updateDoc
} from 'firebase/firestore';




import {
    getFirebaseConfig
} from '../firebase-config';


function updateEventInFirebase() {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const db = getFirestore();

            const btnsDiv = document.querySelector('.btns-left');
            // __________get event id_________________
            const rootUrl = `${window.location.protocol}//${window.location.host}`;
            const fullUrl = window.location.href;
            const locationUrl = fullUrl.slice(rootUrl.length);
            const eventId = locationUrl.slice(11);

            const docRef = doc(db, "events", eventId);
            async function getEvent() {
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    if (docSnap.data().creatorId == user.uid) {
                        btnsDiv.classList.remove('hide');
                        const updateBtn = document.querySelector('.update');

                        updateBtn.addEventListener('click', () => {
                            inputValues(docSnap);


                        })

                    }
                } else {
                    console.error("No such document!");

                }
            }
            getEvent();


            //______values for inputfields___________
            function inputValues(docSnap) {
                const title = document.getElementById('title');

                title.value = docSnap.data().title;

                const dateTime = document.getElementById('date');
                dateTime.value = `${docSnap.data().date} ${docSnap.data().time}`;

                const upload = document.getElementById('upload').value;

                const streetNr = document.getElementById('street-nr');

                streetNr.value = `${docSnap.data().street} ${docSnap.data().number}`;

                const cityZip = document.getElementById('city');

                cityZip.value = `${docSnap.data().city} ${docSnap.data().zip}`;
                const description = document.getElementById('description');

                description.value = docSnap.data().description;

                const inputfields = document.querySelectorAll('input');

                //_____update btn_____
                const sendInfoToFirestoreBtn = document.querySelector('.create-edit-event .primair');
                sendInfoToFirestoreBtn.addEventListener('click', () => {
                    updateFirestore();
                });

                //_____delete btn_____
                const deleteBtn = document.querySelector('.create-edit-event .delete-btn');
                deleteBtn.addEventListener('click', () => {
                    deleteEvent();
                });

            }

            // _____update event in firebase__________
            function updateFirestore() {

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

                // check if every field is filled in

                if (title != '' && dateTime != '' && streetNr != '' && cityZip != '') {

                    inputfields.forEach((input) => {
                        input.style.backgroundColor = '#2A3153';
                    });

                    const eventRef = doc(db, "events", eventId);

                    if (upload != '') {
                        const imageUrl = sessionStorage.getItem('publicImageUrl');

                        async function updateDocWithImg() {
                            await updateDoc(eventRef, {
                                title: title,
                                date: date,
                                time: time,
                                imgEvent: imageUrl,
                                street: street,
                                number: number[0],
                                zip: zipCode[0],
                                city: city,
                                description: description,
                                editedOn: dateTimeToday
                            });

                            const popup = document.querySelector('.create-edit-event');
                            const overlay = document.querySelector('.overlay');

                            overlay.remove();
                            popup.remove();
                            location.reload();

                        }

                        updateDocWithImg();


                    } else {
                        async function updateDocWithoutImg() {
                            await updateDoc(eventRef, {
                                title: title,
                                date: date,
                                time: time,
                                street: street,
                                number: number[0],
                                zip: zipCode[0],
                                city: city,
                                description: description,
                                editedOn: dateTimeToday
                            });

                            const popup = document.querySelector('.create-edit-event');
                            const overlay = document.querySelector('.overlay');

                            overlay.remove();
                            popup.remove();
                            location.reload();
                        }

                        updateDocWithoutImg();


                    }


                } else {
                    const pictureBtn = document.querySelector('.secundary');


                    inputfields.forEach((input) => {
                        if (input.value == '') {
                            input.style.backgroundColor = '#532a32';
                        } else {
                            input.style.backgroundColor = '#2A3153';
                        }
                    })
                }
            }



        } else {
            window.location.href = `${window.location.protocol}//${window.location.host}/start`;
        }
    });
}

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

export default updateEventInFirebase;