import elements from '../element-factory';
import register from '../register';


function showRegisterPage() {

    const spaDiv = document.querySelector('.content-spa');

    const registerOrLoginPage = elements.createDiv({
        classList: "register-login-page container"
    });
    const titleLogIn = elements.createHeading({
        size: 1,
        textContent: "Registreer"
    });

    const formLoginRegister = elements.createFormTag({
        classList: "register-login-form",
        method: "post"
    });

    // _____________________firstname input & label__________________________________

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

    // ________________lastname input & label____________________
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

    // _____________________email input & label_______________________
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

    // ___________________password input & label_______________________
    const passwordLabel = elements.createLabel({
        textContent: 'Wachtwoord',
        labelFor: "password"
    });

    const passwordInput = elements.createInputTag({
        type: "password",
        id: 'password',
        name: 'password',
        required: true
    });

    // __________________primair btn______________________

    const primairBtnLoginPage = elements.createBtn({
        textContent: "Registreer",
        classList: 'primair',
        onClick() {
            register();
        }
    });


    // _________link to login page_________

    const pLogin = elements.createParagraph({
        textContent: "Heb je al een account?",
        classList: "to-register-page"
    });

    const linkToLoginPage = elements.createLink({
        textContent: "Log je hier in",
        href: `${window.location.protocol}//${window.location.host}/inloggen`
    })

    
    spaDiv.appendChild(registerOrLoginPage);
    registerOrLoginPage.append(titleLogIn, formLoginRegister, primairBtnLoginPage, pLogin, linkToLoginPage);
    formLoginRegister.append(firstNameLabel, firstNameInput, lastNameLabel, lastNameInput, emailLabel, emailInput, passwordLabel, passwordInput);

}


export default showRegisterPage;