import elements from "../../element-factory";

function renderHeaderAccount(text){
    const header = elements.createDiv({
        classList: "header-account"
    });

    const icon = elements.createI({
        classList: "fas fa-chevron-left"
    });

    icon.addEventListener('click', ()=>{
        window.location.href = window.location.href = window.history.back(1);
    })

    const titleHeader = elements.createHeading({
        size: 2,
        textContent: text
    });


    const contentSpaDiv = document.querySelector('.content-spa');
    contentSpaDiv.appendChild(header);
    header.append(icon, titleHeader);
}

export default renderHeaderAccount;