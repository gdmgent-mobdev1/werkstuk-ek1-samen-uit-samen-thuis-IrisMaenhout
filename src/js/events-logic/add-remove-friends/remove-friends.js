import 'regenerator-runtime/runtime';
import elements from '../../element-factory';
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
    serverTimestamp,
    arrayRemove
} from "firebase/firestore";

import {
    getFirebaseConfig
} from "../../firebase-config";

function removeFriends() {
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
            const fullUrl = window.location.href;
            const locationUrl = fullUrl.slice(rootUrl.length);
            const eventId = locationUrl.slice(11);
            const eventRef = doc(db, "events", eventId);


            const getAllUsers = async () => {
                const searchValue = document.querySelector('#search').value;
                const getAllUsersQuery = await getDocs(collection(db, "users"));
                clearResults();
                if (searchValue.length > 0) {
                    getAllUsersQuery.forEach(async (doc) => {
                        let userName = doc.data().userName;
                        userName = userName.toLowerCase();

                        const docSnap = await getDoc(eventRef);

                        if (docSnap.exists()) {
                            if (docSnap.data().invitedUsers.includes(doc.data().userId) || docSnap.data().joinedUsers.includes(doc.data().userId)) {
                                if (!(docSnap.data().creatorId.includes(doc.data().userId))) {



                                    if ((doc.data().lastName.toLowerCase()).includes(searchValue.toLowerCase()) || doc.data().firstName.toLowerCase().includes(searchValue.toLowerCase()) || doc.data().userName.toLowerCase().includes(searchValue.toLowerCase())) {

                                        const divPerson = elements.createDiv({
                                            classList: "person"
                                        });

                                        const divFlexContainer = elements.createDiv({
                                            classList: "flex-div",
                                        });

                                        const iRemoveUser = elements.createI({
                                            classList: "fas fa-user-minus"
                                        });

                                        usersListDiv.append(divPerson);
                                        divPerson.append(divFlexContainer, iRemoveUser);
                                        divFlexContainer.innerHTML = `
                                        <img src=${doc.data().avatar}
                                        alt="${doc.data().userName}">
                                        <div>
                                            <p>${doc.data().userName}</p>
                                            <i class="small-text">${doc.data().firstName} ${doc.data().lastName}</i>
                                        </div>
                                    `;

                                        iRemoveUser.addEventListener('click', async () => {

                                            await updateDoc(eventRef, {
                                                invitedUsers: arrayRemove(doc.data().userId)
                                            });

                                            iRemoveUser.style.color = '#85c45e';
                                        })

                                    }

                                }

                            }
                        } else {
                            console.error("No such document!");
                        }

                    })

                }


            }

            searchElement.addEventListener("keyup", getAllUsers);

        } else {

        }
    });
}

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
export default removeFriends;