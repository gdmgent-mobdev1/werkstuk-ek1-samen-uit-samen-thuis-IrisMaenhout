import elements from './element-factory.js';
import showLoginPage from './views/login-view.js';
import showRegisterPage from './views/register-view';

// import Router from './router';

// import Navigo from 'navigo'; // When using ES modules.
// const router = new Navigo('/');

let bodyElement = document.body;
let contentSpaDiv = document.querySelector('.content-spa');

const divCenter = elements.createDiv({
    classList: "beginscreen"
});
const logoStartScreen = elements.createHeading({
    size: 1,
    textContent: "Samen uit, samen thuis"
});

const loginBtn = elements.createBtn({
    textContent: "Log in",
    classList: 'primair',
    onClick() {
        // window.location.href = "#";
        divCenter.remove();
        showLoginPage();

        // router.navigate('/inloggen');
    }
});

const registerBtn = elements.createBtn({
    textContent: "Registreer",
    classList: 'secundary',
    onClick() {
        // window.location.href = "#";
        divCenter.remove();
        showRegisterPage();
        // router.navigate('/registreer');
    }
});

contentSpaDiv.appendChild(divCenter);
divCenter.append(logoStartScreen, loginBtn, registerBtn);

export default contentSpaDiv;

