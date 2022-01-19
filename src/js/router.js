import 'regenerator-runtime/runtime';
import elements from './element-factory';

import {
    initializeApp
} from 'firebase/app';

import {
    getFirestore,
    collection,
    addDoc,
    query,
    doc,
    getDoc,
    getDocs,
    where
} from 'firebase/firestore';


import {
    getFirebaseConfig
} from './firebase-config';



import showLoginPage from './views/login-view';
import showRegisterPage from './views/register-view';
import showAddInfoPage from './views/extra-info-user-view';
import showHomePage from './views/home-view';
import showStartScreen from './views/startscreen-view';
import renderNav from './views/nav-view';
import showEventPage from './views/event-page-header-view';
import showContentEventPage from './views/event-page-content';
import showEventsOnSpecificDay from './events-logic/show-events-home';
import updateEventInFirebase from './events-logic/update-event';
import saveEventInFirebase from './events-logic/create-event';
import renderContentAcountSettings from './views/account-views/acount-settings-view';
import renderHeaderAccount from './views/account-views/header-account';
import changePersonalData from './account/edit-user-info';
import getUserLocation from './location/user-location';
import btnsMap from './views/map-view/btns-map';
// import activateHelpMeWithspeechRecognition from './location/speech-recognition';
import getDirections from './location/directions';
import showInvitedUsers from './views/invited-users-view';
import personalDataView from "./views/account-views/personal-data";
// import smallPopupView from './views/small-popup-view';

import Navigo from 'navigo';
const router = new Navigo('/');
const db = getFirestore();

function Router() {
    // get part of url behind the website/localhost url
    const rootUrl = `${window.location.protocol}//${window.location.host}`;
    const fullUrl = window.location.href;
    const locationUrl = fullUrl.slice(rootUrl.length);

    const startScreen = document.querySelector('.content-spa .primair');
    const spaContent = document.querySelector('.content-spa');
    const body = document.querySelector('body');
    body.style.padding = 0;

    const divBtnsMap = elements.createDiv({
        classList: "btns-div-map"
    });

    // div to display maboxmap
    const map = elements.createDiv({});
    

    router.on(locationUrl, function () {
        spaContent.innerHTML = '';
        switch (locationUrl) {
            case '/':
            case '/start':
                showStartScreen();

                break;
            case '/inloggen':
                showLoginPage();
                body.style.paddingBottom = "6em";
                break;
            case '/registreer':
                showRegisterPage();
                body.style.paddingBottom = "6em";

                break;

            case '/registreer/extra-info':
                showAddInfoPage();
                body.style.paddingBottom = "6em";

                break;
            case '/home':
                renderNav();
                showHomePage();
                showEventsOnSpecificDay();
                body.style.paddingBottom = "6em";

                break;
            case '/account':

                renderNav();
                renderHeaderAccount("Account");
                renderContentAcountSettings();


                break;

            case '/account/persoonlijke-gegevens':

                renderNav();
                renderHeaderAccount("Persoonlijke gegevens");
                personalDataView();
                changePersonalData();
                break;

            case '/kaart':

                body.style.padding = 0;

                map.id = "map-full-screen";
                spaContent.append(map);

                // show map with the location of your friends that are going to the same event as you
                getUserLocation();

                // show btns
                spaContent.append(divBtnsMap);

                btnsMap.showDirectionBtn();
                btnsMap.showHelpBtn();

                break;

            case '/kaart/routebeschrijving':

                map.id = "map-full-screen";
                const instructionsDiv = elements.createDiv({});
                instructionsDiv.id = "instructions";
                spaContent.append(map, instructionsDiv);

                // show mapbox & directions
                const vehicleChoice = sessionStorage.getItem('vehicle');
                getDirections({
                    vehicle: vehicleChoice
                });

                // show btns
                spaContent.append(divBtnsMap);
                btnsMap.closeDirectionsBtn();
                btnsMap.showHelpBtn();

                break;

            default:
                async function getEvent() {
                    const docRef = doc(db, "events", locationUrl.slice(10));
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        showEventPage({
                            imageLink: docSnap.data().imgEvent,
                            title: docSnap.data().title,
                            date: docSnap.data().date,
                            time: docSnap.data().time
                        });

                        showContentEventPage({
                            street: docSnap.data().street + " " + docSnap.data().number,
                            city: docSnap.data().zip + " " + docSnap.data().city,
                            info: docSnap.data().description,
                            createdOn: docSnap.data().createdOn,
                            urlAvatarCreator: docSnap.data().pictureCreator,
                            nameCreator: docSnap.data().creatorUsername,
                            editedOn: docSnap.data().editedOn
                        });
                        renderNav();
                        updateEventInFirebase();

                        const invitedUsers = docSnap.data().invitedUsers;
                        const acceptedUsers = docSnap.data().joinedUsers;
                        const rejectedUsers = docSnap.data().rejectedUsers;
                        const docUserRef = collection(db, "users");

                        if (invitedUsers != []) {
                            invitedUsers.forEach(async (user) => {

                                const docUser = query(docUserRef, where("userId", "==", user));
                                const querySnapshot = await getDocs(docUser);

                                querySnapshot.forEach((documentUser) => {
                                    showInvitedUsers({
                                        displayName: documentUser.data().userName,
                                        profilePicture: documentUser.data().avatar
                                    });
                                })
                            });
                        }

                        if (acceptedUsers != []) {
                            acceptedUsers.forEach(async (user) => {
                                const docUser = query(docUserRef, where("userId", "==", user));
                                const querySnapshot = await getDocs(docUser);

                                querySnapshot.forEach((documentUser) => {
                                    showInvitedUsers({
                                        displayName: documentUser.data().userName,
                                        accepted: true,
                                        profilePicture: documentUser.data().avatar
                                    });
                                })

                            });
                        }

                        if (rejectedUsers != []) {
                            rejectedUsers.forEach(async (user) => {
                                const docUser = query(docUserRef, where("userId", "==", user));
                                const querySnapshot = await getDocs(docUser);

                                querySnapshot.forEach((documentUser) => {
                                    showInvitedUsers({
                                        displayName: documentUser.data().userName,
                                        accepted: false,
                                        profilePicture: documentUser.data().avatar
                                    });
                                })
                            });
                        }

                    } else {
                        console.error(`404: Sorry, we didn't found the page`);
                    }
                }

                getEvent();


        }


    });

    router.resolve();
}

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
export default Router;