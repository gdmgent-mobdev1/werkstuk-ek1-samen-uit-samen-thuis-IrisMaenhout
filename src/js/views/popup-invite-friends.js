import elements from "../element-factory";

function renderInviteFriendsPopup(text){

    const overlay = elements.createOverlay();

    const inviteUsersPopUp = elements.createDiv({
        classList: "invite-friends",
    });
    const fixedHeader = elements.createDiv({
        classList: "invite-friends__fixed-header",
    });

    const div = elements.createDiv({});

    const titlePopup = elements.createHeading({
        size: 2,
        textContent: text
    });

    const iClose = elements.createI({
        classList: "fas fa-times"
    });

    iClose.addEventListener('click', ()=>{
        inviteUsersPopUp.remove();
        overlay.remove();
    })

    const divSearch = elements.createDiv({
        classList: "search"
    });

    const iSearch = elements.createI({
        classList: "fas fa-search"
    });

    const inputSearch = elements.createInputTag({
        type: "search",
        placeholder: "Zoek een persoon",
        id: "search"
    });


    const personsDiv = elements.createDiv({
        classList: "friends"
    });

    const contentSpaDiv = document.querySelector('.content-spa');
    contentSpaDiv.append(overlay, inviteUsersPopUp);
    inviteUsersPopUp.append(fixedHeader, personsDiv);
    fixedHeader.append(div, divSearch);
    div.append(titlePopup, iClose);
    divSearch.append(iSearch, inputSearch);
}
export default renderInviteFriendsPopup;