function getUserLocation() {



    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

            mapboxgl.accessToken = 'pk.eyJ1IjoiaXJpczI1IiwiYSI6ImNrbnlpNDAycTFncDQydnBzNHZtenc5YmgifQ.bd83th8-EvfgccRGiPtctA';
            const map = new mapboxgl.Map({
                container: 'map-full-screen', // container ID
                style: 'mapbox://styles/iris25/cky0jc36o94xi14qu6wwn0abf',
                center: [4.3499986, 50.8499966], // starting position [lng, lat]
                zoom: 7
                // attributionControl: false    
            });

            map.addControl(new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true,
                showUserHeading: true,
                showAccuracyCircle: true
            }));



        });
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }

}
export default getUserLocation;