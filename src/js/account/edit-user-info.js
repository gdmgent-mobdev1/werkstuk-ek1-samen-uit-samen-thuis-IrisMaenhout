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
    doc,
    getDoc,
    getDocs,
    query,
    where,
    onSnapshot,
    updateDoc
} from 'firebase/firestore';




import {
    getFirebaseConfig
} from '../firebase-config';

function changePersonalData() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const db = getFirestore();

            const q = query(collection(db, "users"), where("userId", "==", user.uid));

            async function getUserDoc() {
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {

                    inputValues(doc);

                    const sendInfoToFirestoreBtn = document.querySelector('.primair');
                    sendInfoToFirestoreBtn.addEventListener('click', () => {
                        updateFirestore(doc);
                    });
                });

            }
            getUserDoc();


            // values of input fields
            function inputValues(doc) {
                const email = document.getElementById('email');
                email.value = doc.data().email;

                const userName = document.getElementById('username');
                userName.value = doc.data().userName;
                const phoneNumber = document.getElementById('phone-number');
                phoneNumber.value = doc.data().phoneNumber;

                const firstname = document.getElementById('firstname');
                firstname.value = doc.data().firstName;

                const lastname = document.getElementById('lastname');
                lastname.value = doc.data().lastName;

            }

            // update firestore
            function updateFirestore(docUser) {

                const email = document.getElementById('email').value;

                const userName = document.getElementById('username').value;

                const phoneNumber = document.getElementById('phone-number').value;

                const firstname = document.getElementById('firstname').value;

                const lastname = document.getElementById('lastname').value;


                const inputfields = document.querySelectorAll('input');



                if (email != '' && userName != '' && phoneNumber != '' && firstname != '' && lastname != '') {

                    inputfields.forEach((input) => {
                        input.style.backgroundColor = '#31354C';
                    });

                    const userRef = doc(db, "users", docUser.id);

                    async function updateDocument() {
                        await updateDoc(userRef, {
                            email : email,
                            firstName: firstname,
                            lastName: lastname,
                            phoneNumber: phoneNumber,
                            userName: userName
                        });

                        location.reload();

                    }

                    updateDocument();


                } else {


                    inputfields.forEach((input) => {
                        if (input.value == '') {
                            input.style.backgroundColor = '#532a32';
                        } else {
                            input.style.backgroundColor = '#31354C';
                        }
                    })
                }
            }
        }
    })
}

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
export default changePersonalData;