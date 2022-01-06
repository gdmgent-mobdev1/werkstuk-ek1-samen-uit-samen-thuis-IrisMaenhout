
import elements from '../../element-factory';
import warningMessage from './warning-message';
import btnsMap from './btns-map';


function showPopupHelpMe(){
    const divPopup = elements.createDiv({
        classList: "warning-sending-location container"
    });

    const textDiv = elements.createDiv({
        classList: "warning"
    });
    const btnDeactivate = elements.createDiv({
        classList: "deactivate"
    });

    btnDeactivate.addEventListener('click', ()=>{
        divPopup.remove();
        clearInterval(timer);
        clearTimeout(timeout);
    });

    const pText = elements.createParagraph({
        textContent: "Je vrienden krijgen een melding binnen "
    });

    const pBtn = elements.createParagraph({
        textContent: "Deactiveren"
    });

    const boldSec = elements.createB({
        classList: "seconds",
        textContent: "3s"
    });



    
    const contentSpa = document.querySelector('.content-spa');
    contentSpa.appendChild(divPopup);
    divPopup.append(textDiv, btnDeactivate);
    textDiv.appendChild(pText);
    btnDeactivate.appendChild(pBtn);
    pText.appendChild(boldSec);

    let sec = 3

    const timer = setInterval(updateCountDown, 1000);
    function updateCountDown(){
        sec = sec - 1;
        boldSec.textContent= `${sec}s`;
    }

    function sendWarning(){
        clearInterval(timer);
        divPopup.remove();
        warningMessage({});
        btnsMap.showIamSafeBtn();
        const sosBtn = document.querySelector('.sos');
        sosBtn.remove();
        btnsMap.showCallBtn();
    }

    const timeout = setTimeout(sendWarning, 3000);
  
    

}
export default showPopupHelpMe;

