// import contentSpaDiv from './main';
import 'regenerator-runtime/runtime';
import elements from './element-factory';
// import showPopUpEditEvent from '../views/create-edit-event-view';

import {
    initializeApp
} from 'firebase/app';

import {
    getFirestore,
    collection,
    addDoc,
    doc,
    getDoc
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
import changePersonalData from './views/account-views/personal-data';
import getUserLocation from './location/user-location';
import btnsMap from './views/map-view/btns-map';
import activateHelpMeWithspeechRecognition from './location/speech-recognition';
import getDirections from './location/directions';
// import smallPopupView from './views/small-popup-view';

import Navigo from 'navigo'; // When using ES modules.
const router = new Navigo('/');
const db = getFirestore();



// function startNavigo(element) {

//   const router = new Navigo("/");
//   const navigoRoutes = routes(element);

//   router.on(navigoRoutes).resolve();

//   return () => {
//     router.destroy();
//   }

// }
function Router() {
    const rootUrl = `${window.location.protocol}//${window.location.host}`;
    console.log(rootUrl.length);
    const fullUrl = window.location.href;
    const locationUrl = fullUrl.slice(rootUrl.length);
    console.log(locationUrl);
    const spaDiv = document.querySelector('.content-spa');
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
        spaDiv.innerHTML = '';
        switch (locationUrl) {
            case '/start':
                showStartScreen();
              
                break;
            case '/inloggen':
                console.log(spaDiv);
                console.log(startScreen);
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
                // body.style.padding = "6em";


                break;

            case '/account/persoonlijke-gegevens':

                renderNav();
                renderHeaderAccount("Persoonlijke gegevens");
                changePersonalData();
                break;

            case '/kaart':
            
                body.style.padding = 0;

                map.id = "map-full-screen";
                spaContent.append(map);

                // show mapbox & directions
                getUserLocation();

                // show btns
                spaContent.append(divBtnsMap);

                btnsMap.showDirectionBtn();
                btnsMap.showHelpBtn();


                // activateHelpMeWithspeechRecognition();



                break;

            case '/kaart/routebeschrijving':

                map.id = "map-full-screen";
                const instructionsDiv = elements.createDiv({});
                instructionsDiv.id = "instructions";
                spaContent.append(map, instructionsDiv);

                // show mapbox & directions
                // getDirections();
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
                        console.log("Document data:", docSnap.data());
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

                        // smallPopupView();
                        // deleteEvent();

                    } else {

                        console.log("No such document!");
                        console.log(`404: Sorry, we didn't found the page`);
                    }
                }

                getEvent();


        }


    });

    router.resolve();

    // router.navigate('/inloggen');
}



// const Router = {
//     router: null,
//     getRouter(){
//         if(!this.router){
//             const rootUrl = `${window.location.protocol}//${window.location.host}`;
//             console.log(rootUrl);
//             this.router = new Navigo(rootUrl, false);
//         }

//         return this.router;
//     }
// }

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
export default Router;