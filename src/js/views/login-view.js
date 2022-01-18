import elements from '../element-factory';
import login from '../login';
import signInGoogle from '../login-google';

function showLoginPage() {

    const spaDiv = document.querySelector('.content-spa');

    const registerOrLoginPage = elements.createDiv({
        classList: "register-login-page container"
    });
    const titleLogIn = elements.createHeading({
        size: 1,
        textContent: "Log in"
    });

    const formLoginRegister = elements.createFormTag({
        classList: "register-login-form",
        method: "post"
    });

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

    const primairBtnLoginPage = elements.createBtn({
        textContent: "Log in",
        classList: 'primair',
        onClick() {
            login();
        }
    });

    const lineLoginPage = elements.createLine({});
    const WordOnLine = elements.createHeading({
        size: 3,
        textContent: "OF",
        classList: "word-on-line"
    });

    const secundaryBtnLoginPage = elements.createBtn({
        classList: "login-externe-provider",
        onClick() {
            signInGoogle();
        }
    });

    const googleIcon = elements.createI({
        classList: "fab fa-google"
    });

    const pRegister = elements.createParagraph({
        textContent: "Heb je nog geen account?",
        classList: "to-register-page"
    });

    const linkToRegisterPage = elements.createLink({
        textContent: "Registreer je hier",
        href: `${window.location.protocol}//${window.location.host}/registreer`
    })

    spaDiv.appendChild(registerOrLoginPage);
    registerOrLoginPage.append(titleLogIn, formLoginRegister, primairBtnLoginPage, lineLoginPage, WordOnLine, secundaryBtnLoginPage, pRegister, linkToRegisterPage);
    formLoginRegister.append(emailLabel, emailInput, passwordLabel, passwordInput);
    secundaryBtnLoginPage.append(googleIcon);


}
export default showLoginPage;