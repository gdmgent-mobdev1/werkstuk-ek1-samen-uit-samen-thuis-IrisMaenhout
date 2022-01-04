import elements from '../element-factory';
import showCalendar from '../calendar';
import renderCardEvent from './event-cards-view';
import renderCardInvitationEvent from './event-invitation-card-view';
import showPopUpEditEvent from './create-edit-event-view';
import saveEventInFirebase from '../events-logic/create-event';

function showHomePage(){
    console.log('dit is de home pagina');

    const spaDiv = document.querySelector('.content-spa');

    const homePage = elements.createDiv({
        classList: "calendar-home container"
    });

    const title = elements.createHeading({
        size: 1,
        classList: "title-page",
        textContent: "Overzicht evenementen"
    });


    // _______________filters calendar_____________________
    const filters = elements.createDiv({
        classList: 'filters-events'
    })

    const filterBtnAll = elements.createBtn({
        textContent: "All",
        classList: "filter all active-filter all-active-filter",
        onClick(){

        }
    });
    const filterBtnAccepted = elements.createBtn({
        textContent: "Geaccepteerd",
        classList: "filter accepted",
        onClick(){

        }
    });
    const filterBtnInvitation = elements.createBtn({
        textContent: "Uitnodigingen",
        classList: "filter invitation",
        onClick(){

        }
    });

    // _______________calendar_____________________

    const calendarContainer = elements.createDiv({
        classList: "calendar-container"
    });
    const calendar = elements.createDiv({
        classList: "calendar"
    });

    const monthCalendar = elements.createDiv({
        classList: "month"
    });

    const arrowLeft = elements.createI({
        classList: "fas fa-chevron-left"
    });

    const date = elements.createHeading({
        size: 3,
        classList: "date"
    })

    const arrowRight = elements.createI({
        classList: "fas fa-chevron-right"
    });

    const weekdaysDiv = elements.createDiv({
        classList: "weekdays"
    });
    const monday = elements.createDiv({
        textContent: "MA"
    });
    const tuesday = elements.createDiv({
        textContent: "DI"
    });
    const wednesday = elements.createDiv({
        textContent: "WOE"
    });
    const thursday = elements.createDiv({
        textContent: "DO"
    });
    const friday = elements.createDiv({
        textContent: "VRIJ"
    });
    const saturday = elements.createDiv({
        textContent: "ZA"
    });
    const sunday = elements.createDiv({
        textContent: "ZO"
    });

    const daysDiv = elements.createDiv({
        classList: "days"
    });

    //___________add event btn_________________

    const divCircleOnNavContainer = elements.createDiv({
        classList: "div-circle-on-nav-container"
    });

    const addEventBtn = elements.createBtn({
        classList: "add-event-btn",
        onClick(){
            showPopUpEditEvent({});
            saveEventInFirebase();
        }
    });

    const addEventBtnPlusIcon = elements.createI({
        classList: "fas fa-plus"
    });



    spaDiv.appendChild(homePage);
    homePage.append(title, filters, calendarContainer);
    filters.append(filterBtnAll, filterBtnAccepted, filterBtnInvitation);
    calendarContainer.appendChild(calendar);
    calendar.append(monthCalendar, weekdaysDiv, daysDiv);
    monthCalendar.append(arrowLeft, date, arrowRight);
    weekdaysDiv.append(monday, tuesday, wednesday, thursday, friday, saturday, sunday);

    const navContainer = document.querySelector(".nav-container");
    navContainer.appendChild(divCircleOnNavContainer)
    divCircleOnNavContainer.appendChild(addEventBtn);
    addEventBtn.appendChild(addEventBtnPlusIcon);

    showCalendar();
    
}
export default showHomePage;