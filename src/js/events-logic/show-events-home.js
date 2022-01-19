import elements from "../element-factory";
import renderCardEvent from "../views/event-cards-view";
import renderCardInvitationEvent from "../views/event-invitation-card-view";
import 'regenerator-runtime/runtime';

import {
    initializeApp
} from 'firebase/app';

import {
    getAuth,
    onAuthStateChanged
} from 'firebase/auth';


import {
    getFirestore,
    collection,
    addDoc,
    query,
    where,
    onSnapshot,
    getDocs
} from 'firebase/firestore';



import {
    getFirebaseConfig
} from '../firebase-config';




function showEventsOnSpecificDay() {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            var selectedMonthAndYear;
            var selectedDay;
            var selectedDate;
            const db = getFirestore();
            const eventRef = collection(db, "events");
            const divEvents = elements.createDiv({
                classList: "event-cards"
            });

            divEvents.innerHTML = '';

            let days = document.querySelectorAll('.days .day');

            var isNumber = /\d+/;

            let selectedMonthYear = document.querySelector('.date');;

            function getMonthAndYear() {
                selectedMonthYear = selectedMonthYear.textContent.split(" ");
                let selectedMonth = selectedMonthYear[0];
                let selectedYear = selectedMonthYear[1];
                let numberMonth;

                switch (selectedMonth) {
                    case 'Januari':
                        numberMonth = '01';
                        break;
                    case 'Februari':
                        numberMonth = '02';
                        break;

                    case 'Maart':
                        numberMonth = '03';
                        break;

                    case 'April':
                        numberMonth = '04';
                        break;

                    case 'Mei':
                        numberMonth = '05';
                        break;

                    case 'Juni':
                        numberMonth = '06';
                        break;

                    case 'Juli':
                        numberMonth = '07';
                        break;

                    case 'Augustus':
                        numberMonth = '08';
                        break;

                    case 'September':
                        numberMonth = '09';
                        break;

                    case 'Oktober':
                        numberMonth = '10';
                        break;

                    case 'November':
                        numberMonth = '11';
                        break;

                    case 'December':
                        numberMonth = '12';
                        break;

                    default:
                        console.error('type error');
                }
                selectedMonthAndYear = [selectedYear, numberMonth];

                return selectedMonthAndYear;
            }
            getMonthAndYear();


            // ______save id of the event of today when the event starts on the current hour or is already started______
            let today = new Date();
            var date;
            if ((today.getMonth() + 1) < 10) {
                if (today.getDate() < 10) {
                    date = `${today.getFullYear()}-0${today.getMonth()+1}-0${today.getDate()}`;

                } else {
                    date = `${today.getFullYear()}-0${today.getMonth()+1}-${today.getDate()}`;

                }
            } else {

                if (today.getDate() < 10) {
                    date = `${today.getFullYear()}-${today.getMonth()+1}-0${today.getDate()}`;
                } else {
                    date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;

                }
            }

            const currentHour = today.getHours();

            const eventTodayQuery = query(eventRef, where("date", "==", date));

            sessionStorage.setItem('eventOfTheDay', null);
            const snapShot = onSnapshot(eventTodayQuery, (querySnapshot) => {
                querySnapshot.forEach(async (doc) => {
                    const timeEvent = doc.data().time;
                    const arrayTimeEvent = timeEvent.split(':');
                    const eventhour = parseInt(arrayTimeEvent[0]);
                    

                    if(doc.data().joinedUsers.includes(user.uid)){
                        if (eventhour <= currentHour && currentHour <= eventhour + 5) {
                            sessionStorage.setItem('eventOfTheDay', doc.id);
                            window.location.href = `${window.location.protocol}//${window.location.host}/kaart`;
                        }
                        
                    };

                });
                    
            });



            const arrows = document.querySelectorAll('.month i');
            arrows.forEach((arrow) => {
                arrow.addEventListener('click', () => {
                    selectedMonthYear = document.querySelector('.date');
                    getMonthAndYear();
                    days = document.querySelectorAll('.days .day');
                    getSelectedDay();
                    filterdDotsEvents()

                })

            });



            function getSelectedDay() {

                days.forEach((day) => {
                    day.addEventListener('click', () => {
                        selectedDay = day.innerHTML.match(isNumber);
                        selectedDay = selectedDay[0];
                        if (selectedDay < 10) {
                            selectedDate = `${selectedMonthAndYear[0]}-${selectedMonthAndYear[1]}-0${selectedDay}`
                        } else {
                            selectedDate = `${selectedMonthAndYear[0]}-${selectedMonthAndYear[1]}-${selectedDay}`
                        }
                        divEvents.innerHTML = '';
                        const activeFilter = sessionStorage.getItem('active');
                        const calendarContainer = document.querySelector('.calendar-container');

                        calendarContainer.after(divEvents);

                        const dateQuery = query(eventRef, where("date", "==", selectedDate));


                        const snapShot = onSnapshot(dateQuery, (querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                if (activeFilter == 'all') {
                                    if (doc.data().joinedUsers.includes(user.uid)) {

                                        renderCardEvent({
                                            imageLink: doc.data().imgEvent,
                                            title: doc.data().title,
                                            location: doc.data().street + ', ' + doc.data().city,
                                            date: doc.data().date,
                                            time: doc.data().time,
                                            id: doc.id

                                        })
                                        // eventDot.innerHTML += `<div class="dot-event accepted"></div>`
                                    }

                                    if (doc.data().invitedUsers.includes(user.uid)) {

                                        renderCardInvitationEvent({
                                            imageLink: doc.data().imgEvent,
                                            title: doc.data().title,
                                            location: doc.data().street + ', ' + doc.data().city,
                                            date: doc.data().date,
                                            time: doc.data().time,
                                            id: doc.id
                                        })
                                    }

                                } else if (activeFilter == 'accepted') {

                                    if (doc.data().joinedUsers.includes(user.uid)) {

                                        renderCardEvent({
                                            imageLink: doc.data().imgEvent,
                                            title: doc.data().title,
                                            location: doc.data().street + ', ' + doc.data().city,
                                            date: doc.data().date,
                                            time: doc.data().time,
                                            id: doc.id

                                        })
                                    }



                                } else {
                                    if (doc.data().invitedUsers.includes(user.uid)) {

                                        renderCardInvitationEvent({
                                            imageLink: doc.data().imgEvent,
                                            title: doc.data().title,
                                            location: doc.data().street + ', ' + doc.data().city,
                                            date: doc.data().date,
                                            time: doc.data().time,
                                            id: doc.id
                                        });

                                    }


                                }


                            });

                        });

                    })
                });
            }
            getSelectedDay();

            // ______________filter______________________

            const filterAll = document.querySelector('.all');
            sessionStorage.setItem('active', 'all');
            filterAll.addEventListener('click', () => {
                if (!(filterAll.classList.contains('active-filter'))) {
                    filterAll.classList.add('active-filter', 'all-active-filter');

                    filterAccepted.classList.remove('active-filter', 'accepted-active-filter');

                    filterInvitation.classList.remove('active-filter', 'invitation-active-filter');

                    sessionStorage.setItem('active', 'all');

                    filterdDotsEvents();

                }
            });

            const filterAccepted = document.querySelector('.accepted');

            filterAccepted.addEventListener('click', () => {
                if (!(filterAccepted.classList.contains('active-filter'))) {
                    filterAccepted.classList.add('active-filter', 'accepted-active-filter');

                    filterAll.classList.remove('active-filter', 'all-active-filter');

                    filterInvitation.classList.remove('active-filter', 'invitation-active-filter');

                    sessionStorage.setItem('active', 'accepted');

                    filterdDotsEvents();
                }
            });



            const filterInvitation = document.querySelector('.invitation');

            filterInvitation.addEventListener('click', () => {
                if (!(filterInvitation.classList.contains('active-filter'))) {
                    filterInvitation.classList.add('active-filter', 'invitation-active-filter');

                    filterAll.classList.remove('active-filter', 'all-active-filter');

                    filterAccepted.classList.remove('active-filter', 'accepted-active-filter');

                    sessionStorage.setItem('active', 'invitation');

                    filterdDotsEvents();
                }
            });

            function filterdDotsEvents() {
                days.forEach((day) => {
                    const eventDot = day.querySelector('.event-in-calendar');
                    eventDot.innerHTML = '';
                })
                divEvents.innerHTML = '';

                const activeFilter = sessionStorage.getItem('active');

                if (activeFilter == 'all') {
                    checkJoinedUsers();
                    checkInvitedUsers();
                } else if (activeFilter == 'accepted') {
                    checkJoinedUsers();
                } else {
                    checkInvitedUsers();
                }
            }

            filterdDotsEvents();


            function checkJoinedUsers() {
                const joinedUsersQuery = query(eventRef, where("joinedUsers", "array-contains", user.uid));

                const snapShot = onSnapshot(joinedUsersQuery, (querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const dateEvent = doc.data().date.split('-');
                        const dayEvent = parseInt(dateEvent[2]);

                        days.forEach((day) => {
                            const calendarDayArray = day.innerHTML.match(isNumber);
                            const calendarDay = parseInt(calendarDayArray[0]);

                            if (calendarDay === dayEvent && selectedMonthAndYear[1] === dateEvent[1] && dateEvent[0] == selectedMonthAndYear[0]) {
                                const eventDot = day.querySelector('.event-in-calendar');
                                eventDot.innerHTML += `<div class="dot-event accepted"></div>`
                            } else {

                            }
                        });


                    })
                })
            }

            function checkInvitedUsers() {
                const invitedUsersQuery = query(eventRef, where("invitedUsers", "array-contains", user.uid));

                const snapShot = onSnapshot(invitedUsersQuery, (querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const dateEvent = doc.data().date.split('-');
                        const dayEvent = parseInt(dateEvent[2]);

                        days.forEach((day) => {
                            const calendarDayArray = day.innerHTML.match(isNumber);
                            const calendarDay = parseInt(calendarDayArray[0]);

                            if (calendarDay === dayEvent && selectedMonthAndYear[1] === dateEvent[1] && dateEvent[0] == selectedMonthAndYear[0]) {
                                const eventDot = day.querySelector('.event-in-calendar');
                                eventDot.innerHTML += `<div class="dot-event invitation"></div>`
                            }
                        });



                    })
                })
            }





        } else {
            window.location.href = `${window.location.protocol}//${window.location.host}/start`;
        }
    })



}

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

export default showEventsOnSpecificDay;