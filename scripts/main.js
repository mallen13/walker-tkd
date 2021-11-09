import navMenuFunctionality  from './nav/nav.js';

//run scripts
navMenuFunctionality();

//prevent enter key from submitting forms
window.addEventListener('keydown', e => {
    if (e.code === 'Enter') {
        e.preventDefault();
    }
})

