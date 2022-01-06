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
            console.log(rootUrl.length);
            const fullUrl = window.location.href;
            const locationUrl = fullUrl.slice(rootUrl.length);
            console.log(locationUrl);
            const eventId = locationUrl.slice(11);

            const eventRef = doc(db, "events", eventId);


            const getAllUsers = async () => {
                const searchValue = document.querySelector('#search').value;
                const getAllUsersQuery = await getDocs(collection(db, "users"));
                clearResults();
                if (searchValue.length > 0) {
                    // usersListDiv.classList.add('hide');
                    getAllUsersQuery.forEach(async (doc) => {
                        // console.log(doc.data());
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
                                            console.log(divPerson);

                                            await updateDoc(eventRef, {
                                                invitedUsers: arrayRemove(doc.data().userId)
                                            });

                                            iRemoveUser.style.color = '#85c45e';
                                        })

                                    }

                                }

                            }
                        } else {
                            console.log("No such document!");
                        }

                    })

                } else {

                }

                // const removeUserbtns = document.querySelectorAll('.invite-friends .fa-user-minus');
                // console.log(removeUserbtns);

                // removeUserbtns.forEach((remove) => {
                //     remove.addEventListener('click', async (e) => {
                //         console.log(remove);
                //         const target = e.target;
                //         const personDivParent = target.parentElement;
                //         // console.log(personDivParent);


                //         const userId = personDivParent.querySelector('.user-id').textContent;
                //         console.log(userId);


                //         // await updateDoc(eventRef, {
                //         //     invitedUsers: arrayRemove(userId)
                //         // });

                //         add.style.color = '#85c45e';

                //         console.log('remove');


                //     })
                // })
            }

            searchElement.addEventListener("keyup", getAllUsers);




        } else {

        }
    });
}

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
export default removeFriends;