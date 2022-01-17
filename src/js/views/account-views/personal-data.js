import elements from "../../element-factory";
import addAvatar from '../../add-avatar';
import showgenerateAvatar from '../../generateAvatar';


import {
    initializeApp
} from 'firebase/app';

import {
    getAuth,
    updateProfile,
    onAuthStateChanged
} from 'firebase/auth';


import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    updateDoc,
    onSnapshot
} from 'firebase/firestore';

import {
    getFirebaseConfig
} from '../../firebase-config';

function personalDataView() {
    const auth = getAuth();
    const db = getFirestore();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // showgenerateAvatar();

            const personalDataDiv = elements.createDiv({
                classList: "personal-data-div container"
            });

            //___________profile picture________________

            const imageAvatarDiv = elements.createDiv({
                classList: "image-avatar-div"
            });

            const imgAvatar = elements.createImage({
                src: '',
                classList: "img-avatar",
                alt: "Avatar"
            });

            async function getImageFirebase() {
                const usersRef = collection(db, "users");
                const q = query(usersRef, where("userId", "==", getAuth().currentUser.uid));
                // const querySnapshot = await getDoc(q);
                const snapshot = onSnapshot(q, (querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        imgAvatar.src = doc.data().avatar;
                    });

                });
            }
            getImageFirebase();


            const uploadImg = elements.createLabel({
                labelFor: "upload"
            });


            const uploadImgIcon = elements.createI({
                classList: "fas fa-camera"
            });

            const uploadImgInput = elements.createInputTag({
                type: "file",
                id: "upload",
                name: "upload"
            })


            // ______________personal info____________

            const formPersonalData = elements.createFormTag({
                classList: "register-login-form"
            });


            // ____________________________________________
            const userNameLabel = elements.createLabel({
                textContent: 'Gebruikersnaam',
                labelFor: "username"
            });

            const userNameInput = elements.createInputTag({
                type: "text",
                id: 'username',
                name: 'username',
                required: true
            });

            const phoneNumberLabel = elements.createLabel({
                textContent: 'Telefoonnummer',
                labelFor: "phone-number"
            });

            const phoneNumberInput = elements.createInputTag({
                type: "tel",
                id: 'phone-number',
                name: 'phone-number',
                required: true
            });

            // ________________________________________

            

            const firstNameLabel = elements.createLabel({
                textContent: 'Voornaam',
                labelFor: "firstname"
            });

            const firstNameInput = elements.createInputTag({
                type: "text",
                id: 'firstname',
                name: 'firstname',
                required: true
            });

            // ____________________________________
            const lastNameLabel = elements.createLabel({
                textContent: 'Achternaam',
                labelFor: "lastname"
            });

            const lastNameInput = elements.createInputTag({
                type: "text",
                id: 'lastname',
                name: 'lastname',
                required: true
            });

            // ____________________________________________
            const emailLabel = elements.createLabel({
                textContent: 'Email',
                labelFor: "email"
            });

            const emailInput = elements.createInputTag({
                type: "email",
                id: 'email',
                name: 'email',
                required: true
            });

            // __________________________________________
        

            const primairBtnLoginPage = elements.createBtn({
                textContent: "Wijzigingen opslaan",
                classList: 'primair',
                onClick() {


                }
            });

            const contentSpaDiv = document.querySelector('.content-spa');
            contentSpaDiv.appendChild(personalDataDiv);
            personalDataDiv.append(imageAvatarDiv, formPersonalData, primairBtnLoginPage);
            imageAvatarDiv.append(imgAvatar, uploadImg);
            uploadImg.append(uploadImgIcon, uploadImgInput);
            formPersonalData.append(emailLabel, emailInput, firstNameLabel, firstNameInput, lastNameLabel, lastNameInput ,userNameLabel, userNameInput, phoneNumberLabel, phoneNumberInput);

            addAvatar();
            // changePersonalData();
        } else {
            window.location.href = `${window.location.protocol}//${window.location.host}/start`;
        }
    });




}
const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

export default personalDataView;