import elements from '../element-factory';

function renderCardEvent({imageLink = '#', title ='', location='', date='', time='', id =''}){
    const eventCardDiv = document.querySelector('.event-cards');
    const eventsContainer = elements.createDiv({
        classList: "event"
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

    const cardId =elements.createParagraph({
        textContent: id,
        classList: "card-event-id hide"
    });

    eventsContainer.addEventListener('click',()=>{
        window.location.href = `${window.location.protocol}//${window.location.host}/evenement/${id}`;
    });

    // const calendarHome = document.querySelector('.calendar-home');
    eventCardDiv.append(eventsContainer);
    eventsContainer.append(eventCard);
    eventCard.append(imgTag, backgroundImgDiv, cardInfoDiv);
    cardInfoDiv.append(cardInfoTitle, cardInfoLocation, cardInfoDateTime, cardId);

}
export default renderCardEvent;