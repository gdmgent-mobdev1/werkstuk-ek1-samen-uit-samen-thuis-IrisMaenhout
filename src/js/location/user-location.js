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
// import geojson from "./locations-markers";



function getUserLocation() {
    const auth = getAuth();
    console.log(auth);
    onAuthStateChanged(auth, (user) => {
        console.log(user);
        if (navigator.geolocation) {
            if (user) {


                mapboxgl.accessToken = 'pk.eyJ1IjoiaXJpczI1IiwiYSI6ImNrbnlpNDAycTFncDQydnBzNHZtenc5YmgifQ.bd83th8-EvfgccRGiPtctA';
                const map = new mapboxgl.Map({
                    container: 'map-full-screen', // container ID
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [4.3499986, 50.8499966], // starting position [lng, lat]
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
                const eventId = sessionStorage.getItem('eventOfTheDay');
                const mapboxClient = mapboxSdk({
                    accessToken: mapboxgl.accessToken
                });


                // _________save location of current user_____

                // map.on('load', () => {
                //     setInterval(getLocationOfUser, 5000);
                // })
                

                function getLocationOfUser() {
                    navigator.geolocation.getCurrentPosition(async (position) => {
                        console.log(position.coords.latitude + " " + position.coords.longitude)

                        // const locationCurrentUser = doc(db, "users", user.uid);
                        const currentUserQuery = query(usersRef, where("userId", "==", user.uid));

                        const querySnapshot = await getDocs(currentUserQuery);
                        querySnapshot.forEach(async (document) => {
                            const locationCurrentUser = doc(db, "users", document);
                            // console.log(doc);
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
                    const x = document.querySelector('body');

                    if (docSnap.exists()) {
                        console.log(docSnap.data());

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
                                console.log(feature);

                                const joinedUsers = docSnap.data().joinedUsers;

                                joinedUsers.forEach(async (userId) => {
                                    // ____get information about users going to the event_____

                                    const q = query(usersRef, where("userId", "==", userId));

                                    // const querySnapshot = await getDocs(q);

                                    const snapShot = onSnapshot(q, (querySnapshot) => {
                                        querySnapshot.forEach((doc) => {
                                            if (!(userId === user.uid)) {
                                                console.log(doc.id, " => ", doc.data());


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
                                                            description: 'Bauterstraat, Parijs'
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





                                            }
                                        })
                                    });


                                    // querySnapshot.forEach((doc) => {
                                    //     if (!(userId === user.uid)) {
                                    //         console.log(doc.id, " => ", doc.data());


                                    //         const geojson = {
                                    //             type: 'FeatureCollection',
                                    //             features: [{
                                    //                 type: 'Feature',
                                    //                 geometry: {
                                    //                     type: 'Point',
                                    //                     coordinates: doc.data().currentLocation
                                    //                 },
                                    //                 properties: {
                                    //                     title: doc.data().userName,
                                    //                     description: 'Bauterstraat, Parijs'
                                    //                 }
                                    //             }]
                                    //         };


                                    //         // add markers to map
                                    //         for (const feature of geojson.features) {
                                    //             // create a HTML element for each feature
                                    //             const el = document.createElement('div');
                                    //             el.className = 'marker';

                                    //             // make a marker for each feature and add to the map
                                    //             const newLocation = feature.geometry.coordinates
                                    //             new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates)
                                    //                 .setPopup(
                                    //                     new mapboxgl.Popup({
                                    //                         offset: 25
                                    //                     }) // add popups
                                    //                     .setHTML(
                                    //                         `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
                                    //                     )
                                    //                 )
                                    //                 .addTo(map);

                                    //             el.style.backgroundImage = `url(${doc.data().avatar})`;
                                    //         }





                                    //     }


                                    // });

                                    // console.log(userId);
                                    // const docRefUser = doc(db, "users", "IntPbGb0slhWnhWhJWdPYh87P6u1");
                                    // const docSnapUser = await getDoc(docRefUser);

                                    // if (docSnapUser.exists()) {
                                    //     // get users that are going to the event
                                    //     console.log(docSnapUser.data());
                                    // } else {
                                    //     console.log('no user fund');
                                    // }
                                });

                            });

                        // Add a new document with a generated id.


                    } else {}
                }

                getEventLocation();

            } else {
                window.location.href = `${window.location.protocol}//${window.location.host}/start`;
            }
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    })






    // navigator.geolocation.getCurrentPosition(position => {
    // console.log(position.coords.longitude + ' ' + position.coords.latitude);

    // mapboxgl.accessToken = 'pk.eyJ1IjoiaXJpczI1IiwiYSI6ImNrbnlpNDAycTFncDQydnBzNHZtenc5YmgifQ.bd83th8-EvfgccRGiPtctA';
    // const map = new mapboxgl.Map({
    //     container: 'map-full-screen', // container ID
    //     style: 'mapbox://styles/mapbox/streets-v11',
    //     center: [4.3499986, 50.8499966], // starting position [lng, lat]
    //     zoom: 7,
    //     dragRotate: false



    //     // attributionControl: false    
    // });

    // map.addControl(new mapboxgl.GeolocateControl({
    //     positionOptions: {
    //         enableHighAccuracy: true
    //     },
    //     trackUserLocation: true,
    //     showUserHeading: true,
    //     showAccuracyCircle: true
    // }));


    // _______geojson markers_________

    // const geojson = {
    //     type: 'FeatureCollection',
    //     features: [{
    //         type: 'Feature',
    //         geometry: {
    //             type: 'Point',
    //             coordinates: [4.878508, 52.369989]
    //         },
    //         properties: {
    //             title: 'Maria',
    //             description: 'Bauterstraat, Parijs'
    //         }
    //     }, {
    //         type: 'Feature',
    //         geometry: {
    //             type: 'Point',
    //             coordinates: [-122.414, 37.776]
    //         },
    //         properties: {
    //             title: 'Mapbox',
    //             description: 'San Francisco, California'
    //         }
    //     }]
    // };


    // // add markers to map
    // for (const feature of geojson.features) {
    //     // create a HTML element for each feature
    //     const el = document.createElement('div');
    //     el.className = 'marker';

    //     // make a marker for each feature and add to the map
    //     const newLocation = feature.geometry.coordinates
    //     new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates)
    //         .setPopup(
    //             new mapboxgl.Popup({
    //                 offset: 25
    //             }) // add popups
    //             .setHTML(
    //                 `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
    //             )
    //         )
    //         .addTo(map);
    // }















    // map.on('load', async () => {
    //     // Get the initial location of the International Space Station (ISS).
    //     const geojson = await getLocation();
    //     // Add the ISS location as a source.
    //     map.addSource('iss', {
    //         type: 'geojson',
    //         data: geojson
    //     });
    //     // Add the rocket symbol layer to the map.
    //     map.addLayer({
    //         'id': 'iss',
    //         'type': 'symbol',
    //         'source': 'iss',
    //         'layout': {
    //             // This icon is a part of the Mapbox Streets style.
    //             // To view all images available in a Mapbox style, open
    //             // the style in Mapbox Studio and click the "Images" tab.
    //             // To add a new image to the style at runtime see
    //             // https://docs.mapbox.com/mapbox-gl-js/example/add-image/
    //             'icon-image': 'rocket-15'
    //         }
    //     });

    //     // Update the source from the API every 2 seconds.
    //     const updateSource = setInterval(async () => {
    //         const geojson = await getLocation(updateSource);
    //         map.getSource('iss').setData(geojson);
    //     }, 2000);

    //     async function getLocation(updateSource) {


    //         // Make a GET request to the API and return the location of the ISS.
    //         try {
    //             const response = await fetch(
    //                 'https://api.wheretheiss.at/v1/satellites/25544', {
    //                     method: 'GET'
    //                 }
    //             );
    //             const {
    //                 latitude,
    //                 longitude
    //             } = await response.json();
    //             // Fly the map to the location.
    //             // map.flyTo({
    //             // center: [longitude, latitude],
    //             // speed: 0.5
    //             // });
    //             // Return the location of the ISS as GeoJSON.
    //             return {
    //                 'type': 'FeatureCollection',
    //                 'features': [{
    //                     'type': 'Feature',
    //                     'geometry': {
    //                         'type': 'Point',
    //                         'coordinates': [longitude, latitude]
    //                     }
    //                 }]
    //             };
    //         } catch (err) {
    //             // If the updateSource interval is defined, clear the interval to stop updating the source.
    //             if (updateSource) clearInterval(updateSource);
    //             throw new Error(err);
    //         }
    //     }
    // });

    // });


}


const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
export default getUserLocation;