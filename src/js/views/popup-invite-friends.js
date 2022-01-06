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

    // inviteFriends();
    // removeFriends();
}
export default renderInviteFriendsPopup;
/* <div class="invite-friends hide">
            <div class="invite-friends__fixed-header">
                <div>
                    <h2>Vrienden uitnodigen</h2>
                    <i class="fas fa-times"></i>
                </div>
                <div class="search">
                    <i class="fas fa-search"></i>
                    <input type="search" placeholder="Zoek een persoon">
                </div>
            </div>

            <div class="friends">
                <div class="person">
                    <div>
                        <img src="https://images.unsplash.com/photo-1494708001911-679f5d15a946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                            alt="bel politie">
                        <p>Ben clark</p>
                    </div>
                    <i class="fas fa-user-plus"></i>
                </div>
                

            </div>
        </div> */