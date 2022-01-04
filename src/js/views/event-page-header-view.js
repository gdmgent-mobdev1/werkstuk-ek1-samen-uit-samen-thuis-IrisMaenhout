import elements from '../element-factory';
import showHeaderWhenScrolling from './event-page-header-scrolled-view';
import showPopUpEditEvent from './create-edit-event-view';
import renderInviteFriendsPopup from './popup-invite-friends';

function showEventPage({
    imageLink = '#',
    title = '',
    date = '',
    time = '',
    going = 'I want to go'
}) {

    const eventPage = elements.createDiv({
        classList: "event-page-spa"
    })
    const divEventHeader = elements.createDiv({
        classList: "header-event"
    });

    const backroundImgEvent = elements.createDiv({
        classList: "img-event"
    });
    backroundImgEvent.style.backgroundImage = `url(${imageLink})`

    const contentDiv = elements.createDiv({
        classList: "content"
    });

    const iBack = elements.createI({
        classList: "fas fa-chevron-left"
    });

    iBack.addEventListener('click', ()=>{
        window.location.href = `${window.location.protocol}//${window.location.host}/home`;
    });

    const divBtns = elements.createDiv({
        classList: "btns-left hide"
    });

    const btnChange = elements.createBtn({
        classList: "btn-header-event update",
        onClick(){
            showPopUpEditEvent({
                status: "updaten",
                textPrimairBtn: "Opslaan"
            });
        }
    });
    const btnAddUser = elements.createBtn({
        classList: "btn-header-event add-user",
        onClick(){
            renderInviteFriendsPopup();
        }
    });
    const btnRemoveUser = elements.createBtn({
        classList: "btn-header-event remove-user"
    });

    const iChange = elements.createI({
        classList: "fas fa-pencil-alt"
    });
    const iAddUser = elements.createI({
        classList: "fas fa-user-plus"
    });
    const iRemoveUser = elements.createI({
        classList: "fas fa-user-minus"
    });

    const imgEvent = elements.createImage({
        src: imageLink,
        alt: "event"
    });

    const InfoHeaderDiv = elements.createDiv({
        classList: "info"
    });

    const HeaderTitle = elements.createHeading({
        size: 1,
        textContent: title,
        classList: "title"
    });

    const divTimeDate = elements.createDiv({
        classList: "time-date"
    });

    const pDate = elements.createParagraph({});
    pDate.innerHTML = `<i class="far fa-calendar-alt"></i>${date}`;

    const pTime = elements.createParagraph({});

    pTime.innerHTML = `<i class="far fa-clock"></i>${time}`

    const btnHeader = elements.createBtn({
        classList: 'transparent-btn-going',
        textContent: going,
        onclick() {}
    });

    const contentSpaDiv = document.querySelector('.content-spa');
    contentSpaDiv.appendChild(eventPage);
    eventPage.appendChild(divEventHeader);
    divEventHeader.append(backroundImgEvent, contentDiv);
    contentDiv.append(iBack, divBtns, imgEvent, InfoHeaderDiv, btnHeader);
    divBtns.append(btnChange, btnAddUser, btnRemoveUser);
    btnChange.appendChild(iChange);
    btnAddUser.appendChild(iAddUser);
    btnRemoveUser.appendChild(iRemoveUser);
    InfoHeaderDiv.append(HeaderTitle, divTimeDate);
    divTimeDate.append(pDate, pTime);

    window.addEventListener("scroll", function () {
        const contentEventPage = this.document.querySelector('.event-content');

        if (window.scrollY > (divEventHeader.offsetTop + divEventHeader.offsetHeight)) {
            eventPage.innerHTML = '';
            showHeaderWhenScrolling(imageLink, title, going);
            const contentPage = document.querySelector('.event-page-spa');
            contentEventPage.style.paddingTop = "10em";

        }else{
            eventPage.appendChild(divEventHeader);
            const divHeaderWhileScrolling = document.querySelector(".header-while-scrolling");
            if(divHeaderWhileScrolling != null){
                // console.log(divHeaderWhileScrolling)
                divHeaderWhileScrolling.remove();
                contentEventPage.style.paddingTop = "0em";
            }
            
        }
    });
}


export default showEventPage;