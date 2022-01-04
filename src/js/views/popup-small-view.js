import elements from "../element-factory";

function renderSmallPopup(text){
    console.log('dit is de popup');

    const overlay = elements.createOverlay();

    const smallPopup = elements.createDiv({
        classList: "small-popup",
    });

    const pText = elements.createParagraph({
        textContent: text,
        classList: "text"
    });

    const divBtns = elements.createDiv({});

    const pYes = elements.createParagraph({
        textContent: "JA",
        classList: "yes"
    });
    const pNo = elements.createParagraph({
        textContent: "NEE",
        classList: "no"
    });

    const contentSpaDiv = document.querySelector('.content-spa');
    contentSpaDiv.append(overlay, smallPopup);
    smallPopup.append(pText, divBtns);
    divBtns.append(pYes, pNo);
}

export default renderSmallPopup;