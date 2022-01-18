import elements from "../../element-factory";
function chooseVehiclePopupView({locationEvent = ''}){

    const overlay = elements.createOverlay();
    const vehiclesPopup = elements.createDiv({
        classList: "directions-vehicles-choice"
    });

    const titlePopup = elements.createHeading({
        size: 3,
        textContent: "Routebeschrijving"
    });

    const p = elements.createParagraph({
        textContent: `Van huidige locatie tot ${locationEvent}`
    });

    const divVehicles = elements.createDiv({
        classList: "vehicles"
    });

    const iCar = elements.createI({
        classList: "fas fa-car"
    });

    iCar.addEventListener('click', ()=>{
        overlay.remove();
        vehiclesPopup.remove();
        sessionStorage.setItem('vehicle', 'mapbox/driving');
        window.location.href = `${window.location.protocol}//${window.location.host}/kaart/routebeschrijving`;
    })

    const iBike = elements.createI({
        classList: "fas fa-biking"
    });

    iBike.addEventListener('click', ()=>{
        overlay.remove();
        vehiclesPopup.remove();
        sessionStorage.setItem('vehicle', 'mapbox/cycling');
        window.location.href = `${window.location.protocol}//${window.location.host}/kaart/routebeschrijving`;
    });

    const iWalking = elements.createI({
        classList: "fas fa-walking"
    });

    iWalking.addEventListener('click', ()=>{
        overlay.remove();
        vehiclesPopup.remove();
        sessionStorage.setItem('vehicle', 'mapbox/walking');
        window.location.href = `${window.location.protocol}//${window.location.host}/kaart/routebeschrijving`;
    });


    const contentSpa = document.querySelector('.content-spa');
    contentSpa.append(overlay, vehiclesPopup);
    vehiclesPopup.append(titlePopup, p, divVehicles);
    divVehicles.append(iCar, iBike, iWalking);
}

export default chooseVehiclePopupView;