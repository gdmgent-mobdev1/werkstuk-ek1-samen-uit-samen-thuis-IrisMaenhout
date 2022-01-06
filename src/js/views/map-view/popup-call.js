import elements from "../../element-factory";
function showPopupCallSeomeone(){
    const overlay = elements.createOverlay();
    const popup = elements.createDiv({
      classList: "call"  
    });

    const fixedHeader = elements.createDiv({
        classList: "fixed-header"
    });

    const divInFixedHeader = elements.createDiv({});

    const buttonClose = elements.createBtn({
        classList: "close",
        onClick(){
            popup.remove();
            overlay.remove();
            const callBtn = document.querySelector('.callBtn');
        }
    });

    const iClose =elements.createI({
        classList: "fas fa-times"
    });

    const title = elements.createHeading({
        size: 2,
        textContent: "Bellen naar:"
    });

    const line = elements.createLine({});

    const divPersons = elements.createDiv({
        classList: "persons"
    });

    const contentSpa = document.querySelector('.content-spa');
    contentSpa.append(overlay, popup);
    popup.append(fixedHeader, divPersons);
    fixedHeader.append(divInFixedHeader, line);
    divInFixedHeader.append(buttonClose, title);
    buttonClose.appendChild(iClose);

}
export default showPopupCallSeomeone;

/* <div class="call hide">
            <div class="fixed-header">
                <div>
                    <button class="close"><i class="fas fa-times"></i></button>
                    <h2>Bellen naar:</h2>
                </div>
                <hr>
            </div>
            <div class="persons">
                <a class="person" href="tel:0489034493">
                    <img src="images/politie.png" alt="bel politie">
                    <p>Politie</p>
                </a>
                <a class="person" href="tel:0489034493">
                    <img src="https://www.thenews.com.pk/assets/uploads/updates/2021-01-13/773676_9402039_294840_094028_updates_updates.jpg"
                        alt="bel politie">
                    <p>Politie</p>
                </a>
                <a class="person" href="tel:0489034493">
                    <img src="https://images.unsplash.com/photo-1494708001911-679f5d15a946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        alt="bel politie">
                    <p>Politie</p>
                </a>
                <a class="person" href="tel:0489034493">
                    <img src="images/politie.png" alt="bel politie">
                    <p>Politie</p>
                </a>
                <a class="person" href="tel:0489034493">
                    <img src="https://www.thenews.com.pk/assets/uploads/updates/2021-01-13/773676_9402039_294840_094028_updates_updates.jpg"
                        alt="bel politie">
                    <p>Politie</p>
                </a>
                <a class="person" href="tel:0489034493">
                    <img src="https://images.unsplash.com/photo-1494708001911-679f5d15a946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        alt="bel politie">
                    <p>Politie</p>
                </a>
            </div>
        </div> */
