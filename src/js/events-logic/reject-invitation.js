import elements from "../element-factory";
import renderCardEvent from "../views/event-cards-view";
import renderCardInvitationEvent from "../views/event-invitation-card-view";
import 'regenerator-runtime/runtime';

import {
    initializeApp
} from 'firebase/app';

import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged
} from 'firebase/auth';


import {
    getFirestore,
    collection,
    addDoc,
    query,
    where,
    onSnapshot,
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove
} from 'firebase/firestore';



import {
    getFirebaseConfig
} from '../firebase-config';


function rejectInvitation(e) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const db = getFirestore();
            const target = e.target;
            const btnDiv = target.parentElement;
            const invitationDiv = btnDiv.parentElement;

            const cardId = invitationDiv.querySelector('.card-event-id').textContent;

            const eventRef = doc(db, "events", cardId);

            async function updateEventMembers(){
                await updateDoc(eventRef, {
                    rejectedUsers: arrayUnion(user.uid)
                });
    
                
                await updateDoc(eventRef, {
                    invitedUsers: arrayRemove(user.uid)
                });

                location.reload();
            }

            updateEventMembers();

            

        } else {

        }
    })

}


const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

export default rejectInvitation;