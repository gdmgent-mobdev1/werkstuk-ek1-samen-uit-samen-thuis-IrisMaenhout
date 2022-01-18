import elements from '../element-factory';

function renderNav(){
    const spaDiv = document.querySelector('.content-spa');

    const navContainer = elements.createDiv({
        classList: "nav-container"
    });

    const navElement = elements.createNav({
    });

    const LogoNav = elements.createHeading({
        size: 2,
        classList: "logo",
        textContent: "Samen uit, samen thuis"
    });

    const ulNav = elements.createUl({
    });

    const liNavItemHome = elements.createLi({
    });
    const liNavItemProfile = elements.createLi({
    });

    const aNavItemHome = elements.createLink({
        classList: "active-link-nav",
        href: `${window.location.protocol}//${window.location.host}/home`

    });
    const divNavItemHome = elements.createDiv({
        classList: "icon"
    });

    const iNavItemHome = elements.createI({
        classList: "fas fa-home"
    });

    const pNavItemHome = elements.createParagraph({
        textContent: "Home"
    });



    const aNavItemProfile = elements.createLink({
        href:`${window.location.protocol}//${window.location.host}/account`

    });

    aNavItemHome.addEventListener('click', ()=>{
        if(!(aNavItemHome.contains("active-link-nav"))){
            aNavItemHome.classList.add('active-link-nav');
        }

        if(aNavItemProfile.contains("active-link-nav")){
            aNavItemProfile.classList.remove('active-link-nav');
        }
    });

    aNavItemProfile.addEventListener('click', ()=>{
        if(!(aNavItemProfile.contains("active-link-nav"))){
            aNavItemProfile.classList.add('active-link-nav');
        }

        if(aNavItemProfile.contains("active-link-nav")){
            aNavItemHome.classList.remove('active-link-nav');
        }
    });

    const divNavItemProfile = elements.createDiv({
        classList: "icon"
    });

    const iNavItemProfile = elements.createI({
        classList: "fas fa-user"
    });

    const pNavItemProfile = elements.createParagraph({
        textContent: "Account"
    });

    spaDiv.appendChild(navContainer);

    navContainer.appendChild(navElement);
    navElement.append(LogoNav, ulNav);
    ulNav.append(liNavItemHome, liNavItemProfile);
    liNavItemHome.appendChild(aNavItemHome);
    aNavItemHome.append(divNavItemHome, pNavItemHome);
    divNavItemHome.appendChild(iNavItemHome);

    liNavItemProfile.appendChild(aNavItemProfile);
    aNavItemProfile.append(divNavItemProfile, pNavItemProfile);
    divNavItemProfile.appendChild(iNavItemProfile);
}

export default renderNav;