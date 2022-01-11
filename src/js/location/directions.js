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


function getDirections({
    vehicle
}) {
    const db = getFirestore();
    const eventId = sessionStorage.getItem('eventOfTheDay');
    mapboxgl.accessToken = 'pk.eyJ1IjoiaXJpczI1IiwiYSI6ImNrbnlpNDAycTFncDQydnBzNHZtenc5YmgifQ.bd83th8-EvfgccRGiPtctA';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

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
                                container: 'map-full-screen', // container ID
                                style: 'mapbox://styles/iris25/cky0jc36o94xi14qu6wwn0abf',
                                center: [position.coords.longitude, position.coords.latitude], // starting position [lng, lat]
                                zoom: 7
                                // attributionControl: false    
                            });



                            // const map = new mapboxgl.Map({
                            //     container: 'map',
                            //     style: 'mapbox://styles/iris25/cky0jc36o94xi14qu6wwn0abf',
                            //     center: feature.center,
                            //     zoom: 12
                            // });

                            // Create a marker and add it to the map.
                            // new mapboxgl.Marker({
                            //         color: "#5246F0"
                            //     })
                            //     .setLngLat(feature.center)
                            //     .addTo(map);


                    
                                map.addControl(new mapboxgl.GeolocateControl({
                                    positionOptions: {
                                        enableHighAccuracy: true
                                    },
                                    trackUserLocation: true,
                                    showUserHeading: true,
                                    showAccuracyCircle: true
                                }));
                    
                    
                                map.on('load', function () {
                                    var directions = new MapboxDirections({
                                        accessToken: mapboxgl.accessToken,
                                        unit: 'metric',
                                        language: 'nl',
                                        profile: vehicle,
                                        draggable: false
                                    });
                                    map.addControl(directions, 'top-left');
                    
                                    directions.setOrigin([position.coords.longitude, position.coords.latitude]);
                                    directions.setDestination(feature.center);
                                });
                    
                
                        });

                }
            }

            getEventLocation();




        });
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
    // mapboxgl.accessToken = 'pk.eyJ1IjoiaXJpczI1IiwiYSI6ImNrbnlpNDAycTFncDQydnBzNHZtenc5YmgifQ.bd83th8-EvfgccRGiPtctA';
    // const map = new mapboxgl.Map({
    //     container: 'map-full-screen',
    //     style: 'mapbox://styles/mapbox/streets-v11',
    //     center: [-79.4512, 43.6568],
    //     zoom: 13
    // });

    // map.addControl(
    //     new MapboxDirections({
    //         accessToken: mapboxgl.accessToken
    //     }),
    //     'top-left'
    // );


    // var MapboxDirections = require('../src/index');
    // var directions = new MapboxDirections({
    //     accessToken: mapboxgl.accessToken,
    //     unit: 'metric',
    //     profile: 'mapbox/cycling'
    // });
    // // add to your mapboxgl map
    // map.addControl(directions);
}
const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

export default getDirections;