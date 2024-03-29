import 'regenerator-runtime/runtime';
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
    doc,
    query,
    where,
    updateDoc
} from 'firebase/firestore';

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from 'firebase/storage';

import {
    getFirebaseConfig
} from './firebase-config';

async function addAvatar() {
    const auth = getAuth();
    const db = getFirestore();
    onAuthStateChanged(auth, (user) => {
        if (user) {

            const imagePicker = document.querySelector('.image-avatar-div label');

            function onMediaFileSelected(event) {
                event.preventDefault();
                var file = event.target.files[0];
                saveProfilePicture(file);
            }

            async function saveProfilePicture(file) {
                try {
                    const filePath = `${getAuth().currentUser.uid}/${file.name}`;
                    const newImageRef = ref(getStorage(), filePath);
                    const fileSnapshot = await uploadBytesResumable(newImageRef, file);

                    const publicImageUrl = await getDownloadURL(newImageRef);

                    updateProfile(getAuth().currentUser, {
                        photoURL: publicImageUrl
                    }).then(function () {
                        console.log('profile picture is updated');
                    }).catch(function (error) {
                        console.error(error);
                    });



                    const usersRef = collection(db, "users");
                    const q = query(usersRef, where("userId", "==", getAuth().currentUser.uid));
                    const querySnapshot = await getDocs(q);

                    querySnapshot.forEach((result) => {
                        async function uploadPictureOnFirestore() {
                            const profilePictureFirestore = doc(db, "users", result.id);
                            await updateDoc(profilePictureFirestore, {
                                avatar: publicImageUrl
                            });
                        };
                        uploadPictureOnFirestore();

                    });
                } catch (e) {
                    console.error(e);
                }
            }

            imagePicker.addEventListener('change', onMediaFileSelected);
        } else {
            console.error('no user found');
        }
    })
}

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

export default addAvatar;