import elements from '../element-factory';
import acceptInvitation from '../events-logic/accept-invitation';
import rejectInvitation from '../events-logic/reject-invitation';

function renderCardInvitationEvent({imageLink = '#', title ='', location='', date='', time='', id=''}){

    const eventCardDiv = document.querySelector('.event-cards');
    const invitationsEventContainer = elements.createDiv({
        classList: "invitation"
    });

    const eventCard = elements.createDiv({
        classList: "event-on-calendar-page"
    });

    const imgTag = elements.createImage({
        src: imageLink,
        alt: "event"
    });

    const backgroundImgDiv = elements.createDiv({
        classList: "img-event" 
    });
    backgroundImgDiv.style.backgroundImage = `url(${imageLink})`;


    const cardInfoDiv = elements.createDiv({
        classList: "event-on-calendar-page__info"
    });

    const cardInfoTitle = elements.createHeading({
        size: 4,
        classList: "event-on-calendar-page__title",
        textContent: title
    });

    const cardInfoLocation =elements.createParagraph({
        textContent: location,
        classList: "event-on-calendar-page__location"
    });

    const cardInfoDateTime =elements.createParagraph({
        textContent: `${date} | ${time}`,
        classList: "event-on-calendar-page__location"
    });

    const btnsDiv = elements.createDiv({
        classList: "btns"
    });

    const pLeft = elements.createParagraph({
        textContent: "Weiger",
        classList: 'reject'
    });

    pLeft.addEventListener('click', (e)=>{
        rejectInvitation(e);
    })
    const pRight = elements.createParagraph({
        textContent: "Accepteer",
        classList: 'accept'
    });

    pRight.addEventListener('click',(e)=>{
        acceptInvitation(e);
    })

    const cardId =elements.createParagraph({
        textContent: id,
        classList: "card-event-id hide"
    });

    eventCard.addEventListener('click',()=>{
        window.location.href = `${window.location.protocol}//${window.location.host}/evenement/${id}`;
        
    });

    eventCardDiv.append(invitationsEventContainer);
    invitationsEventContainer.append(eventCard, btnsDiv);
    eventCard.append(imgTag, backgroundImgDiv, cardInfoDiv);
    cardInfoDiv.append(cardInfoTitle, cardInfoLocation, cardInfoDateTime, cardId);
    btnsDiv.append(pLeft, pRight);


}
export default renderCardInvitationEvent;

