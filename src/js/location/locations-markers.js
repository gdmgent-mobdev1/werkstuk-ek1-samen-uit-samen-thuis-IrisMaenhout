const parsisLocation = [4.878508, 52.369989];

const geojson = {
    type: 'FeatureCollection',
    features: [{
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: parsisLocation
        },
        properties: {
            title: 'Maria',
            description: 'Bauterstraat, Parijs'
        }
    }, {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-122.414, 37.776]
        },
        properties: {
            title: 'Mapbox',
            description: 'San Francisco, California'
        }
    }]
};
export default geojson;