const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.create-edit-event i');
const closeCallPopup = document.querySelector('.call .fixed-header .close');
const closeInvitePopup = document.querySelector('.invite-friends__fixed-header div i');
const continueBtn = document.querySelector('.continue-btn-meldet');
const sendBtnMeldet = document.querySelector('.send-btn-meldet');
const deactivateBtn = document.querySelector('.deactivate');
const vehicles = document.querySelectorAll('.vehicles');
const routeDurationClose = document.querySelector('.route-duration .close');

const smallPopup = document.querySelector('.small-popup');
const editEventPopup = document.querySelector('.create-edit-event');
const callPopup = document.querySelector('.call');
const inviteFriends = document.querySelector('.invite-friends');
const meldetPopup1 = document.querySelector('.meldet-form__part-1');
const meldetPopup2 = document.querySelector('.meldet-form__part-2');
const warningSendingLocation = document.querySelector('.warning-sending-location');
const warningTop = document.querySelector('.warning-top');
const vehiclesOptions = document.querySelector('.directions-vehicles-choice');
const routeDuration = document.querySelector('.route-duration');
const directions = document.querySelector('.directions');



const showSmallPopupBtn = document.querySelector('.show-small-popup');
const showEditEvent = document.querySelector('.show-edit-event');
const showCallPopup = document.querySelector('.show-call-popup');
const showInviteUser = document.querySelector('.show-invite-user');
const showMeldetPopup = document.querySelector('.show-meldet-popup');
const showWarningSendingLocation = document.querySelector('.show-warning-sending-location');
const showWarningTop = document.querySelector('.show-warning-top');
const hideWarningTop = document.querySelector('.hide-warning-top');
const showVehiclesOptions = document.querySelector('.show-vehicles-options');


const yesNo = document.querySelectorAll('.small-popup div p');

showSmallPopupBtn.addEventListener('click', () => {
    smallPopup.classList.remove('hide');
    overlay.classList.remove('hide');
});

showEditEvent.addEventListener('click', () => {
    editEventPopup.classList.remove('hide');
    overlay.classList.remove('hide');
});

showCallPopup.addEventListener('click', () => {
    callPopup.classList.remove('hide');
    overlay.classList.remove('hide');
});

showInviteUser.addEventListener('click', () => {
    inviteFriends.classList.remove('hide');
    overlay.classList.remove('hide');
});

showMeldetPopup.addEventListener('click', () => {
    meldetPopup1.classList.remove('hide');
    overlay.classList.remove('hide');
});

continueBtn.addEventListener('click', ()=>{
    meldetPopup1.classList.add('hide');
    meldetPopup2.classList.remove('hide');

});

sendBtnMeldet.addEventListener('click', ()=>{
    meldetPopup2.classList.add('hide');
    overlay.classList.add('hide');
});

deactivateBtn.addEventListener('click', ()=>{
    warningSendingLocation.classList.add('hide');
    overlay.classList.add('hide');
});

showWarningSendingLocation.addEventListener('click', ()=>{
    warningSendingLocation.classList.remove('hide');
    overlay.classList.remove('hide');
});

showWarningTop.addEventListener('click', ()=>{
    warningTop.classList.remove('hide');
    showWarningTop.classList.add('hide');
    hideWarningTop.classList.remove('hide');
});

hideWarningTop.addEventListener('click', ()=>{
    warningTop.classList.add('hide');
    showWarningTop.classList.remove('hide');
    hideWarningTop.classList.add('hide');
});

showVehiclesOptions.addEventListener('click', ()=>{
    vehiclesOptions.classList.remove('hide');
});

vehicles.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        vehiclesOptions.classList.add('hide');
        directions.classList.remove('hide');
        routeDuration.classList.remove('hide');
    });
})

routeDurationClose.addEventListener('click', ()=>{
    directions.classList.add('hide');
        routeDuration.classList.add('hide');
})




function close() {
    overlay.classList.add('hide');
    if (!(smallPopup.classList.contains('hide'))) {
        smallPopup.classList.add('hide');
    } else if (!(editEventPopup.classList.contains('hide'))) {
        editEventPopup.classList.add('hide');
    }else if(!(callPopup.classList.contains('hide'))){
        callPopup.classList.add('hide');
    }else if(!(inviteFriends.classList.contains('hide'))){
        inviteFriends.classList.add('hide');
    }else if(!(meldetPopup1.classList.contains('hide'))){
        meldetPopup1.classList.add('hide');
    }else if(!(meldetPopup2.classList.contains('hide'))){
        meldetPopup2.classList.add('hide');
    }else if(!(warningSendingLocation.classList.contains('hide'))){
        warningSendingLocation.classList.add('hide');
    }else{

    }

}

closeBtn.addEventListener("click", () => {
    editEventPopup.classList.add('hide');
    overlay.classList.add('hide');
});

closeInvitePopup.addEventListener("click", () => {
    inviteFriends.classList.add('hide');
    overlay.classList.add('hide');
});

closeCallPopup.addEventListener('click', close);

yesNo.forEach((btn) => {
    btn.addEventListener('click', close);
})

overlay.addEventListener('click', close);