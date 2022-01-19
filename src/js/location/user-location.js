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
    updateDoc,
    getDocs
} from 'firebase/firestore';


import {
    getFirebaseConfig
} from '../firebase-config';

import warningMessage from '../views/map-view/warning-message';



function getUserLocation() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (navigator.geolocation) {
            if (user) {
                const eventId = sessionStorage.getItem('eventOfTheDay');
                if (eventId == "null") {
                    window.location.href = `${window.location.protocol}//${window.location.host}/home`;
                } else {
                    mapboxgl.accessToken = 'pk.eyJ1IjoiaXJpczI1IiwiYSI6ImNrbnlpNDAycTFncDQydnBzNHZtenc5YmgifQ.bd83th8-EvfgccRGiPtctA';
                    const map = new mapboxgl.Map({
                        container: 'map-full-screen',
                        style: 'mapbox://styles/iris25/cky0jc36o94xi14qu6wwn0abf',
                        center: [4.3499986, 50.8499966],
                        zoom: 6,
                        dragRotate: false

                    });

                    map.addControl(new mapboxgl.GeolocateControl({
                        positionOptions: {
                            enableHighAccuracy: true
                        },
                        trackUserLocation: true,
                        showUserHeading: true,
                        showAccuracyCircle: true
                    }));

                    const db = getFirestore();
                    const usersRef = collection(db, "users");
                    const mapboxClient = mapboxSdk({
                        accessToken: mapboxgl.accessToken
                    });


                    // _________save location of current user_____

                    map.on('load', () => {
                        setInterval(getLocationOfUser, 5000);
                    })

                    const unsub = onSnapshot(doc(db, "events", eventId), (docEvent) => {
                        const q = query(usersRef, where("userId", "==", docEvent.data().personInDanger));
                        if (docEvent.data().personInDanger === null) {
                            const warningTop = document.querySelector('.warning-top');
                            if (warningTop != null) {
                                warningTop.remove();
                            }
                        }

                        const snapShot = onSnapshot(q, (querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                if (docEvent.data().personInDanger != user.uid) {

                                    mapboxClient.geocoding
                                        .reverseGeocode({
                                            query: doc.data().currentLocation,
                                            limit: 1,
                                            language: ['nl']
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
                                            warningMessage({
                                                textContent: `${doc.data().userName} voelt zich onveilig in de ${feature.place_name}`
                                            })
                                        });
                                }
                            })
                        })

                    });


                    function getLocationOfUser() {
                        navigator.geolocation.getCurrentPosition(async (position) => {

                            const currentUserQuery = query(usersRef, where("userId", "==", user.uid));

                            const querySnapshot = await getDocs(currentUserQuery);
                            querySnapshot.forEach(async (document) => {

                                const locationCurrentUser = doc(db, "users", document.id);

                                await updateDoc(locationCurrentUser, {
                                    currentLocation: [position.coords.longitude, position.coords.latitude]
                                });
                            })
                        });
                    }

                    // ___________get event location_________
                    const docRef = doc(db, "events", eventId);
                    async function getEventLocation() {
                        const docSnap = await getDoc(docRef);

                        if (docSnap.exists()) {

                            const joinedUsers = docSnap.data().joinedUsers;
                            const friendInDanger = docSnap.data().personInDanger;

                            function addMarkerToMap() {
                                joinedUsers.forEach(async (userId) => {
                                    // ____get information about users going to the event_____

                                    const q = query(usersRef, where("userId", "==", userId));

                                    const snapShot = onSnapshot(q, (querySnapshot) => {
                                        querySnapshot.forEach((doc) => {
                                            if (!(userId === user.uid)) {
                                                mapboxClient.geocoding
                                                    .reverseGeocode({
                                                        query: doc.data().currentLocation,
                                                        limit: 1,
                                                        language: ['nl']
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


                                                        const geojson = {
                                                            type: 'FeatureCollection',
                                                            features: [{
                                                                type: 'Feature',
                                                                geometry: {
                                                                    type: 'Point',
                                                                    coordinates: doc.data().currentLocation
                                                                },
                                                                properties: {
                                                                    title: doc.data().userName,
                                                                    description: feature.place_name
                                                                }
                                                            }]
                                                        };


                                                        // add markers to map
                                                        for (const feature of geojson.features) {
                                                            // create a HTML element for each feature
                                                            const el = document.createElement('div');
                                                            el.className = 'marker';

                                                            // make a marker for each feature and add to the map
                                                            const newLocation = feature.geometry.coordinates
                                                            new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates)
                                                                .setPopup(
                                                                    new mapboxgl.Popup({
                                                                        offset: 25
                                                                    }) // add popups
                                                                    .setHTML(
                                                                        `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
                                                                    )
                                                                )
                                                                .addTo(map);

                                                            el.style.backgroundImage = `url(${doc.data().avatar})`;
                                                        }




                                                    })
                                            }

                                        })
                                    });

                                });
                            }

                            addMarkerToMap();



                            setInterval(() => {
                                const markerDivs = document.querySelectorAll('.marker');
                                markerDivs.forEach(markerDiv => {
                                    markerDiv.remove();
                                })

                                addMarkerToMap()
                            }, 5000);



                        } else {}
                    }

                    getEventLocation();
                }




            } else {
                window.location.href = `${window.location.protocol}//${window.location.host}/start`;
            }
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    })

}


const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
export default getUserLocation;