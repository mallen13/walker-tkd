    //FAQ accordion
    const accordions = document.querySelectorAll('.accordion');
    const accordionMinuses = document.querySelectorAll('#accordionMinus');
    const accordionPluses = document.querySelectorAll('#accordionPlus');

    //add event listener for each accordion
    accordions.forEach( (accordion, i) => accordion.addEventListener("click", () => expandAccordion(accordion, i)))

      //toggle accordion body and hide plus/ minus
    const expandAccordion = (accordion, i) => {
        const accordionBody = accordion.nextElementSibling;
        //close
        if (accordionBody.style.maxHeight) {
            accordionBody.style.maxHeight = null;
            accordionMinuses[i].style.display = "";
            accordionPluses[i].style.display = "block";
        //expand   
        } else {
            accordions.forEach( accordion => accordion.nextElementSibling.style.maxHeight = null )
            accordionBody.style.maxHeight = 300 + "px";
            accordionMinuses[i].style.display = "block";
            accordionPluses[i].style.display = "none";
        }
    }
