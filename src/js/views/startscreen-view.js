import elements from '../element-factory';
import showLoginPage from './login-view';
import showRegisterPage from './register-view';

function startscreen() {
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
}

export default contentSpaDiv;
export default startscreen;