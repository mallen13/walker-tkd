//hide tournament form.  hide big form, display short form
const tournamentForm = document.getElementById('tournamentForm');
const tournamentFormBtn = document.getElementById('tournamentFormBtn');
tournamentFormBtn.addEventListener("click", () => {tournamentForm.style.display = "none";});


//used only when promoting the tournament event
window.onload = () => {
    tournamentForm.style.maxHeight = '500px';
    tournamentForm.style.padding = "0.5rem 1rem 1.5rem 1rem";
}