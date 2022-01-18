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
} from '../firebase-config';


function locationEvent() {

    const db = getFirestore();
    mapboxgl.accessToken = 'pk.eyJ1IjoiaXJpczI1IiwiYSI6ImNrbnlpNDAycTFncDQydnBzNHZtenc5YmgifQ.bd83th8-EvfgccRGiPtctA';

    // __________get event id_________________
    const rootUrl = `${window.location.protocol}//${window.location.host}`;
    const fullUrl = window.location.href;
    const locationUrl = fullUrl.slice(rootUrl.length);
    const eventId = locationUrl.slice(11);



    // ___________get event location_________
    const docRef = doc(db, "events", eventId);
    async function getEventLocation() {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

            const mapboxClient = mapboxSdk({
                accessToken: mapboxgl.accessToken
            });
            mapboxClient.geocoding
                .forwardGeocode({
                    query: `${docSnap.data().street} ${docSnap.data().number}, ${docSnap.data().city}`,
                    autocomplete: false,
                    limit: 1
                })
                .send()
                .then((response) => {
                    if (
                        !response ||
                        !response.body ||
                        !response.body.features ||
                        !response.body.features.length
                    ) {
                        console.error('Invalid response:');
                        console.error(response);
                        return;
                    }
                    const feature = response.body.features[0];
        
                    const map = new mapboxgl.Map({
                        container: 'map',
                        style: 'mapbox://styles/iris25/cky0jc36o94xi14qu6wwn0abf',
                        center: feature.center,
                        zoom: 12
                    });
        
                    // Create a marker and add it to the map.
                    new mapboxgl.Marker({
                        color: "#5246F0"
                    })
                    .setLngLat(feature.center)
                    .addTo(map);
                });

        }
    }

    getEventLocation();
}

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
export default locationEvent;