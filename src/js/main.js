import elements from './element-factory.js';
import showLoginPage from './views/login-view.js';
import showRegisterPage from './views/register-view';

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
    onClick(){
        // window.location.href = "#";
        divCenter.remove();
        showLoginPage();
    }
});

const registerBtn = elements.createBtn({
    textContent: "Registreer",
    classList: 'secundary',
    onClick(){
        // window.location.href = "#";
        divCenter.remove();
        showRegisterPage();
    }
});

contentSpaDiv.appendChild(divCenter);
divCenter.append(logoStartScreen, loginBtn, registerBtn);


export default contentSpaDiv;








// let container = document.querySelector('.container');

// let button = elements.createBtn({
//     textContent: 'click on this link', 
//     onClick(){
//         window.location.href = "https://www.viki.com/tv/38232c-my-beautiful-man#episodes";
//     }, 
//     classList: 'primair'
// });
// const header2 = elements.createHeading(2, 'hi');
// bodyElement.append(button, header2);

// button.textContent = 'hello';