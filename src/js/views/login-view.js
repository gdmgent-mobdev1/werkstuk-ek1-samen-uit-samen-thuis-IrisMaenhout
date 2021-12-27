import elements from '../element-factory';
import contentSpaDiv from '../main';

function showLoginPage() {
    const registerOrLoginPage = elements.createDiv({
        classList: "register-login-page container"
    });
    const titleLogIn = elements.createHeading({
        size: 1,
        textContent: "Log in"
    });

    const formLoginRegister = elements.createFormTag({
        classList: "register-login-form"
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
        onClick(){
            // window.location.href = "#";
            // registerOrLoginPage.remove();
        }
    });

    const lineLoginPage = elements.createLine({});
    const WordOnLine = elements.createHeading({
        size: 3,
        textContent: "OF",
        classList: "word-on-line"
    });

    const secundaryBtnLoginPage = elements.createBtn({
        classList: "login-externe-provider"
    });

    const googleIcon = elements.createI({
        classList: "fab fa-google"
    });

    const pRegister= elements.createParagraph({
        textContent: "Heb je nog geen account?",
        classList: "to-register-page"
    });

    const linkToRegisterPage = elements.createLink({
        textContent: "Registreer je hier",
        href: "#"
    })

    contentSpaDiv.appendChild(registerOrLoginPage);
    registerOrLoginPage.append(titleLogIn, formLoginRegister, lineLoginPage, WordOnLine, secundaryBtnLoginPage, pRegister, linkToRegisterPage);
    formLoginRegister.append(emailLabel, emailInput, passwordLabel, passwordInput, primairBtnLoginPage);
    secundaryBtnLoginPage.append(googleIcon);
}

export default showLoginPage;