import elements from '../element-factory';
import contentSpaDiv from '../main';
import extraInfo from '../extra-info-user';
import addAvatar from '../add-avatar';
import showgenerateAvatar from '../generateAvatar';

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
} from '../firebase-config';

function showAddInfoPage() {
    const auth = getAuth();
    const db = getFirestore();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            showgenerateAvatar();

            const addExtraUserInfoPage = elements.createDiv({
                classList: "add-extra-user-info-page container"
            });

            const titleExtraInfo = elements.createHeading({
                size: 1,
                textContent: "Vul verdere info in"
            });

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

            const formExtraInfo = elements.createFormTag({
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

            const primairBtnLoginPage = elements.createBtn({
                textContent: "Opslaan",
                classList: 'primair',
                onClick() {
                    extraInfo();
                }
            });


            contentSpaDiv.appendChild(addExtraUserInfoPage);
            addExtraUserInfoPage.append(titleExtraInfo, imageAvatarDiv, formExtraInfo, primairBtnLoginPage);
            imageAvatarDiv.append(imgAvatar, uploadImg);
            uploadImg.append(uploadImgIcon, uploadImgInput);
            formExtraInfo.append(userNameLabel, userNameInput, phoneNumberLabel, phoneNumberInput);


            addAvatar();
        } else {
            console.log('not loged in');
        }
    });

}

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
export default showAddInfoPage;