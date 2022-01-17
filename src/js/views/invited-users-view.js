import elements from '../element-factory';

function showInvitedUsers({accepted=null, displayName = '', profilePicture}){
    const inviteAccepted = accepted;
    const personDiv = elements.createDiv({
        classList: "horizontal-scrolling-wrapper_person"
    });

    const divText = elements.createDiv({});
    divText.style.backgroundImage = `url(${profilePicture})`;

    // hover effect on the peson divs, because it does not work with sass
    divText.onmouseover = function() {
        divText.style.backgroundImage ='none';
        divText.style.backgroundColor ='#5555c5';
    }

    divText.onmouseout = function() { 
        divText.style.backgroundImage = `url(${profilePicture})`;
        divText.style.backgroundColor ='none'; }

    const h4DisplayName = elements.createHeading({
        size: 4,
        textContent: displayName
    });

    const iAccepted = elements.createI({
        classList: "fas fa-check accepted"
    });

    const iRejected = elements.createI({
        classList: "fas fa-times rejected"
    });

    const horizontalWrapper = document.querySelector('.horizontal-scrolling-wrapper');
    horizontalWrapper.append(personDiv);
    personDiv.append(divText);
    divText.appendChild(h4DisplayName);

    // adding an icon if the user accepted or rejected the invitation

    if(inviteAccepted == true){
        personDiv.append(iAccepted);
    }

    if(inviteAccepted == false){
        personDiv.append(iRejected);
    }
}
export default showInvitedUsers;