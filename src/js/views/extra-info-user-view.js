import elements from '../element-factory';
import contentSpaDiv from '../main';

function showAddInfoPage(){
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
        src: "https://i.mydramalist.com/R5Km6_5f.jpg",
        classList: "img-avatar", 
        alt: "Avatar"
    });

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
        onClick(){
            // window.location.href = "#";
            registerOrLoginPage.remove();

        }
    });


    contentSpaDiv.appendChild(addExtraUserInfoPage);
    addExtraUserInfoPage.append(titleExtraInfo, imageAvatarDiv, formExtraInfo);
    imageAvatarDiv.append(imgAvatar, uploadImg);
    uploadImg.append(uploadImgIcon, uploadImgInput);
    formExtraInfo.append(userNameLabel, userNameInput, phoneNumberLabel, phoneNumberInput, primairBtnLoginPage);

}

export default showAddInfoPage;