import { addNavEventListeners, toggleNav } from "./navController.js";
const navMenuFunctionality = () => {

    //popup nav menu functionality
    let navBtnArray = [];
    navBtnArray.push(
        document.getElementById('exitNavBtn'),
        document.getElementById('navBackgroundOverlay'),
        document.getElementById('navBackgroundOverlay'),
        document.getElementById('showNavBtn')
    )

    addNavEventListeners(toggleNav,navBtnArray);


    //expend sub-menu on click
    const navMenuBtn = document.getElementById('navMenuBtn');

    let subMenuOpen = false;
  
    navMenuBtn.addEventListener('click', () => {
        const navSubMenu = document.getElementById('navSubMenu');
        const navMenuArrow = document.querySelector('.navMenuBtnArrow');

        if (subMenuOpen) {
            navSubMenu.style.animation = 'closeSubMenu 0.4s 0s 1 forwards';
            navMenuArrow.style.animation = 'subMenuArrowUp 0.4s 0s 1 forwards';
            subMenuOpen = false;
        } else { 
            navSubMenu.style.animation = 'openSubMenu 0.4s 0s 1 forwards';
            navMenuArrow.style.animation = 'subMenuArrowDown 0.4s 0s 1 forwards';
            subMenuOpen = true;
        }
    })

}

export default navMenuFunctionality;