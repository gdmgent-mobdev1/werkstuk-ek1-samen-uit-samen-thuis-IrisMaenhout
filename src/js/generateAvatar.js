import 'regenerator-runtime/runtime';
import elements from './element-factory';

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
    getFirebaseConfig
} from './firebase-config';

function showgenerateAvatar() {
    const auth = getAuth();
    const db = getFirestore();
    onAuthStateChanged(auth, (user) => {
        if (user) {

            function generateAvatar(text, color, backgroundColor) {
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
            
                canvas.width = 230;
                canvas.height = 230;
            
                // Draw background
                context.fillStyle = backgroundColor;
                context.fillRect(0, 0, canvas.width, canvas.height);
            
                // Draw text
                context.font = "bold 100px Lato";
                context.fillStyle = color;
                context.textAlign = "center";
                context.textBaseline = "middle";
                context.fillText(text, canvas.width / 2, canvas.height / 2);
            
                return canvas.toDataURL("image/png");
            }

            async function getnameFirebase() {
                const usersRef = collection(db, "users");
                const q = query(usersRef, where("userId", "==", getAuth().currentUser.uid));
                const querySnapshot = await getDocs(q);

                querySnapshot.forEach((result) => {
                    async function sendImgToFirebase() {
                        const firstName = result.data().firstName;
                        const lastName = result.data().lastName;
                        const profilePictureFirestore = doc(db, "users", result.id);
                        await updateDoc(profilePictureFirestore, {
                            avatar: generateAvatar(`${firstName.toUpperCase().charAt(0)} ${lastName.toUpperCase().charAt(0)}`, "white", "#6A8BF5")
                        });
                        console.log('succes');
                        
                    };
                    sendImgToFirebase();

                });
            }
            getnameFirebase();
            
        }else{
            console.log('user is not logged in');
        }
    })
}






const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

export default showgenerateAvatar;