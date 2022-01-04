import {
    initializeApp
} from "firebase/app";

import {
    getAuth,
    onAuthStateChanged,
} from 'firebase/auth';

import {
    getFirestore,
    collection,
    getDocs,
    updateDoc,
    arrayUnion,
    getDoc,
    setDoc,
    addDoc,
    doc,
    query,
    where,
    serverTimestamp
} from "firebase/firestore";

import {
    getFirebaseConfig
} from "../../firebase-config";

function inviteFriends() {
    const searchElement = document.querySelector('#search');
    const db = getFirestore();
    const usersListDiv = document.querySelector('.invite-friends .friends');

    function clearResults() {
        usersListDiv.innerHTML = "";
    }

    getAuth().onAuthStateChanged(function (user) {
        if (user) {

            // __________get event id_________________
            const rootUrl = `${window.location.protocol}//${window.location.host}`;
            console.log(rootUrl.length);
            const fullUrl = window.location.href;
            const locationUrl = fullUrl.slice(rootUrl.length);
            console.log(locationUrl);
            const eventId = locationUrl.slice(11);
            console.log(eventId);


            const getAllUsers = async () => {
                const searchValue = document.querySelector('#search').value;
                const getAllUsersQuery = await getDocs(collection(db, "users"));
                clearResults();
                if (searchValue.length > 0) {
                    // usersListDiv.classList.add('hide');
                    getAllUsersQuery.forEach((doc) => {
                        // console.log(doc.data());
                        let userName = doc.data().userName;
                        userName = userName.toLowerCase();

                        // console.log(userName);



                        if ((doc.data().lastName.toLowerCase()).includes(searchValue.toLowerCase()) || doc.data().firstName.toLowerCase().includes(searchValue.toLowerCase()) || doc.data().userName.toLowerCase().includes(searchValue.toLowerCase())) {

                            // const docRef = doc(db, "events", eventId);
                            // const docSnap = await getDoc(docRef);

                            // if (docSnap.exists()) {
                            //     console.log("Document data:", docSnap.data());

                            //     if(docSnap.data().invitedUsers.includes())
                            // } else {
                            //     // doc.data() will be undefined in this case
                            //     console.log("No such document!");
                            // }

                            // if (doc.data().)
                            usersListDiv.innerHTML +=
                                `
                                <div class="person">
                                    <div class="flex-div">
                                        <img src=${doc.data().avatar}
                                            alt="${doc.data().userName}">
                                        <div>
                                            <p>${doc.data().userName}</p>
                                            <i class="small-text">${doc.data().firstName} ${doc.data().lastName}</i>
                                            <p class="user-id hide">${doc.data().userId}</p>
                                        </div>
                                    </div>
                                    <i class="fas fa-user-plus"></i>
                                </div>
                            `
                        }
                    })
                } else {

                }

                const addUserbtns = document.querySelectorAll('.fa-user-plus');

                addUserbtns.forEach((add) => {
                    add.addEventListener('click', async (e) => {
                        const target = e.target;
                        const personDivParent = target.parentElement;
                        // console.log(personDivParent);

                        const eventRef = doc(db, "events", eventId);
                        const userId = personDivParent.querySelector('.user-id').textContent;
                        console.log(userId);


                        await updateDoc(eventRef, {
                            invitedUsers: arrayUnion(userId)
                        });
                        add.style.color = '#85c45e';




                    })
                })
            }

            searchElement.addEventListener("keyup", getAllUsers);




        } else {

        }
    });
}

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
export default inviteFriends;