import elements from '../element-factory';

function showHeaderWhenScrolling(imageLink = '#', title = '', going = 'I want to go') {
    const eventPage = document.querySelector('.event-page-spa');

    const divHeaderWhileScrolling = elements.createDiv({
        classList: "header-while-scrolling"
    });
    const backgroundImage = elements.createDiv({
        classList: "img-event"
    });

    backgroundImage.style.backgroundImage = `url(${imageLink})`;

    const divContent = elements.createDiv({
        classList: "content"
    });

    const iBack = elements.createI({
        classList: "fas fa-chevron-left"
    });

    iBack.addEventListener('click', ()=>{
        window.location.href = `${window.location.protocol}//${window.location.host}/home`;
    });

    const divFlex = elements.createDiv({});

    const h2Title = elements.createHeading({
        size: 2,
        textContent: title
    });

    // const btnHeader = elements.createBtn({
    //     classList: 'transparent-btn-going',
    //     textContent: going,
    //     onclick() {

    //     }
    // });

    eventPage.appendChild(divHeaderWhileScrolling);
    divHeaderWhileScrolling.append(backgroundImage, divContent);
    divContent.append(iBack, divFlex);
    divFlex.appendChild(h2Title);

}
export default showHeaderWhenScrolling;