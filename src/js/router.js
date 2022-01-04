// import contentSpaDiv from './main';
import 'regenerator-runtime/runtime';
// import elements from '../element-factory';
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
                console.log('is this path working');
                break;
            case '/registreer':
                showRegisterPage();


                break;

            case '/registreer/extra-info':
                showAddInfoPage();


                break;
            case '/home':
                renderNav();
                showHomePage();
                showEventsOnSpecificDay();

                break;
            case '/evenement':
                // dit later wijzigen met behulp van data uit firebase en dit in een ander bestand plaatsen

                showEventPage({
                    imageLink: "https://img.static-rmg.be/a/view/q75/w/h/1379701/rome-citytrip.jpg",
                    title: "Reis naar rome",
                    location: "Rome",
                    date: "20/10/2020",
                    time: "20:00 - 23:00"
                });

                showContentEventPage({
                    street: 'Koning Boudewijnstadion',
                    city: '1000 Brussel',
                    info: 'Lorem ipsum dolor sit',
                    createdOn: '15/11/2021',
                    urlAvatarCreator: 'https://www.masslive.com/resizer/kNl3qvErgJ3B0Cu-WSBWFYc1B8Q=/arc-anglerfish-arc2-prod-advancelocal/public/W5HI6Y4DINDTNP76R6CLA5IWRU.jpeg',
                    nameCreator: 'Lisa'
                });


                break;

            case `/evenement/dfnsdk`:



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