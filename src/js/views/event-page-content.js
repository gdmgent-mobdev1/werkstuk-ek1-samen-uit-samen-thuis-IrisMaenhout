import elements from '../element-factory';
import locationEvent from '../location/location-event';

function showContentEventPage({street = '', city = '', info = '', createdOn ='', editedOn = '', urlAvatarCreator ='', nameCreator=''}) {

    const eventPage = document.querySelector('.event-page-spa');

    const eventContent = elements.createDiv({
        classList: "event-content container"
    })
    const titleInfo = elements.createHeading({
        size: 2,
        textContent: "Info"
    });

    const contentInfo = elements.createParagraph({
        textContent: info
    });

    const titleLocation = elements.createHeading({
        size: 2,
        textContent: "Locatie"
    });

    const mapDiv = elements.createDiv({
        classList: "map-div-location"
    });

    mapDiv.id = "map";
    
    const streetP = elements.createParagraph({
        textContent: street,
        classList: "location-text"
    });
    const cityP = elements.createParagraph({
        textContent: city,
        classList: "location-text"
    });

    const titleExtraInfo = elements.createHeading({
        size: 2, 
        textContent: "Extra info"
    });
    const titleCreatedBy = elements.createHeading({
        size: 3, 
        textContent: "Gecreëerd door:"
    });

    const divCreator = elements.createDiv({
        classList: 'div-person',
    });

    const avatarCreator = elements.createImage({
        src: urlAvatarCreator, 
        alt: "avatar-creator",
        classList: "avatar-creator"
    });

    const nameCreatorP = elements.createParagraph({
        textContent: nameCreator,
        classList: "name-creator"
    });

    const titleCreatedOn = elements.createHeading({
        size: 3, 
        textContent: "Gecreëerd op:"
    });

    const dateCreated = elements.createParagraph({
        textContent: createdOn
    });

   eventPage.after(eventContent);
    eventContent.append(titleInfo, contentInfo, titleLocation, mapDiv, streetP, cityP, titleExtraInfo, titleCreatedBy, divCreator, titleCreatedOn, dateCreated);
    divCreator.append(avatarCreator, nameCreatorP);

    if(editedOn != null){
        const titleEditedOn = elements.createHeading({
            size: 3, 
            textContent: "Gewijzigd op:"
        });

        const dateEdited= elements.createParagraph({
            textContent: editedOn
        });
        eventContent.append(titleEditedOn, dateEdited);
    }

    locationEvent();



}
export default showContentEventPage;