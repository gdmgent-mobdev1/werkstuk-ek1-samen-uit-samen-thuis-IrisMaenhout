import elements from "../element-factory";
import 'regenerator-runtime/runtime';

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from 'firebase/storage';

import {
    getAuth,
    onAuthStateChanged
} from 'firebase/auth';

import {
    getFirebaseConfig
} from '../firebase-config';

import {
    initializeApp
} from 'firebase/app';

function showPopUpEditEvent({
    status = 'creëren',
    textPrimairBtn = 'Creëer'
}) {

    const overlay = elements.createOverlay();

    const spaDiv = document.querySelector('.content-spa');

    const createEditEvent = elements.createDiv({
        classList: "create-edit-event"
    });

    const icon = elements.createI({
        classList: "fas fa-times"
    });

    icon.addEventListener('click', () => {
        overlay.remove();
        createEditEvent.remove();
    })

    const titlePopup = elements.createHeading({
        size: 1,
        textContent: `Evenement ${status}`
    });

    const formTag = elements.createFormTag({});

    // __________title input_________________
    const labelTitle = elements.createLabel({
        textContent: 'Title ',
        labelFor: 'title'
    });

    const inputTitle = elements.createInputTag({
        type: "text",
        id: "title",
        name: "title",
        required: true
    });

    // ________________date_________________________
    const divDatePicture = elements.createDiv({});
    const divDate = elements.createDiv({});
    const divPicture = elements.createDiv({});

    const labelDate = elements.createLabel({
        textContent: 'Datum ',
        labelFor: 'date'
    });

    const inputDate = elements.createInputTag({
        type: "datetime-local",
        id: "date",
        name: "date",
        required: true
    });

    // _________upload picture_________________
    const labelPiture = elements.createLabel({
        labelFor: 'upload'
    });

    const inputPicture = elements.createInputTag({
        type: "file",
        id: "upload",
        name: "upload",
        required: true
    });
    inputPicture.style.display = 'none';

    const pPicture = elements.createParagraph({
        textContent: "Foto "
    });

    const btnUploadImg = elements.createSpan({
        classList: "secundary",
        textContent: "Voeg een foto toe"
    });



    // ____________location________________

    const pLocation = elements.createParagraph({
        textContent: "Locatie "
    });

    const divLocation = elements.createDiv({
        classList: "location",
    });

    const inputStreet = elements.createInputTag({
        type: "text",
        id: "street-nr",
        required: true,
        placeholder: "Straat + nr"
    });

    const inputCity = elements.createInputTag({
        type: "text",
        id: "city",
        required: true,
        placeholder: "Stad + postcode"
    });

    // _________________Description_____________

    const pDescription = elements.createParagraph({
        textContent: "Beschrijving"
    });

    const textareaDescription = elements.createTextarea({
        name: "description",
        id: "description"
    });

    //____________stars required________________
    const starRequiredTitle = elements.createSpan({
        textContent: '*',
        classList: 'required'
    });
    const starRequiredDate = elements.createSpan({
        textContent: '*',
        classList: 'required'
    });
    const starRequiredPhoto = elements.createSpan({
        textContent: '*',
        classList: 'required'
    });
    const starRequiredLocation = elements.createSpan({
        textContent: '*',
        classList: 'required'
    });


    // _____________btns_______________________

    const divBtns = elements.createDiv({
        classList: 'btns'
    });

    const btnDelete = elements.createBtn({
        classList: "delete-btn",

    });

    const spanTextDeleteBtn = elements.createSpan({
        textContent: "Gebeurtenis verwijderen"
    });

    const btnCreate = elements.createBtn({
        classList: "primair"

    });

    const spanTextCreateBtn = elements.createSpan({
        textContent: textPrimairBtn
    });

    spaDiv.append(overlay, createEditEvent);
    createEditEvent.append(icon, titlePopup, formTag, divBtns);
    formTag.append(labelTitle, inputTitle, divDatePicture, pLocation, divLocation, pDescription, textareaDescription);
    divDatePicture.append(divDate, divPicture);
    divDate.append(labelDate, inputDate);
    divPicture.appendChild(labelPiture);
    labelPiture.append(pPicture, btnUploadImg, inputPicture);
    pPicture.appendChild(starRequiredPhoto);
    pLocation.appendChild(starRequiredLocation);
    divLocation.append(inputStreet, inputCity);
    labelTitle.appendChild(starRequiredTitle);
    labelDate.appendChild(starRequiredDate);


    if (status != 'creëren') {
        divBtns.append(btnDelete, btnCreate);
        btnDelete.appendChild(spanTextDeleteBtn);
        btnCreate.appendChild(spanTextCreateBtn);
    } else {
        divBtns.append(btnCreate);
        btnCreate.appendChild(spanTextCreateBtn);
    }


    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            function onMediaFileSelected(event) {
                event.preventDefault();
                var file = event.target.files[0];
                savePicture(file);
            }

            async function savePicture(file) {
                try {

                    // Upload the image to Cloud Storage.
                    const filePath = `${user.uid}/${file.name}`;
                    const newImageRef = ref(getStorage(), filePath);
                    const fileSnapshot = await uploadBytesResumable(newImageRef, file);

                    const publicImageUrl = await getDownloadURL(newImageRef);
                    sessionStorage.setItem('publicImageUrl', publicImageUrl);

                    btnUploadImg.style.borderColor = "#8aba57";
                    btnUploadImg.style.color = "#8aba57";
                    btnUploadImg.style.backgroundColor='#191F3E';

                } catch (error) {
                    btnUploadImg.style.borderColor = "#ff4a4a";
                    btnUploadImg.style.color = "#ff4a4a";
                    btnUploadImg.style.backgroundColor='#191F3E';

                }
            }


            inputPicture.addEventListener('change', onMediaFileSelected);
        } else {

        }
    });


}

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
export default showPopUpEditEvent;