//add event listeners that toggle side nav
export const addNavEventListeners = (callBack,navBtnArray) => {
    navBtnArray.forEach( btn => btn.addEventListener("click", () => callBack())); 
}

  //change nav style
export const toggleNav = () => {
    const navContainer = document.getElementById('navContainer');
    const tournamentForm = document.getElementById('tournamentForm');

    const navbar = document.getElementById('navbar');
    //hide side nav
    if (navContainer.style.maxWidth) {
        setTimeout(() => navContainer.style.maxWidth = null, 300)
        navbar.style.maxWidth = null;
        navbar.style.overflowY = 'hidden';
        // tournamentForm.style.display = "flex";
    //show side nav
    } else {
        navContainer.style.maxWidth = '100vw';
        navbar.style.maxWidth = '250px';
        navbar.style.overflowY = 'auto';
        // tournamentForm.style.display = "none";
    }
}