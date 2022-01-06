import elements from '../../element-factory';

function warningMessage({textContent = "Er is een melding gestuurd naar je vrienden"}){
    const divWarningMessage = elements.createDiv({
        classList: "warning-top"
    });

    const textMessage = elements.createParagraph({
        textContent: textContent
    });

    const contentSpa = document.querySelector('.content-spa');
    contentSpa.appendChild(divWarningMessage);
    divWarningMessage.appendChild(textMessage);
}

export default warningMessage;