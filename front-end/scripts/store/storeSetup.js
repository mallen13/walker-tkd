export const setupStoreNav = (myObj) => {
  //get elements

    //store checkout section
    const storeCheckout = document.getElementById('storeCheckout');
    const backToCartBtn = document.getElementById('backToCartBtn');

    //store cart section
    const storeCart = document.getElementById('storeCart');
    const showCheckoutBtn = document.getElementById('showCheckoutBtn');
    const backToItemsBtn = document.getElementById('backToItemsBtn');

    //store items section
    const storeItems= document.getElementById('storeItemsSection');
    const showCartBtn = document.getElementById('showCartBtn');

  //add event listeners
  const addStoreNav = (btnName, hideSection, showSection) => {
    btnName.addEventListener('click', () => {
      hideSection.className='displayNone';
      showSection.className='';
    })
  }

  addStoreNav(showCartBtn,storeItems,storeCart)

  addStoreNav(backToItemsBtn,storeCart,storeItems);
  addStoreNav(showCheckoutBtn,storeCart,storeCheckout);

  addStoreNav(backToCartBtn,storeCheckout,storeCart);
}

export const renderStoreItem = (item) => {
  //get store
  const store = document.getElementById('storeItems');

  //create item form & attach to store
  const itemForm = document.createElement('form');
  itemForm.className= 'storeItemForm';
  store.appendChild(itemForm);

      //title
      const itemTitle = document.createElement('label');
      itemForm.appendChild(itemTitle);
      itemTitle.setAttribute('class','itemTitle');
        const titleText = document.createTextNode(item.name);
        itemTitle.appendChild(titleText);
      
      //description
      const itemDescription = document.createElement('label');
      itemForm.appendChild(itemDescription);
        const descriptionText = document.createTextNode(item.description);
        itemDescription.appendChild(descriptionText);
      
      //price
      if (item.price) {
        const itemPrice = document.createElement('label');
        itemPrice.setAttribute('class','itemPrice');
        itemForm.appendChild(itemPrice);  
        //is price a num or string
        const priceText = document.createTextNode(`$${item.price}`);
        itemPrice.appendChild(priceText);
      }
      

      //create selects
      item.selectInputs.forEach( selectItem => {
        //label
        const selectLabel = document.createElement('label');
        itemForm.appendChild(selectLabel);
        const selectLabelText = document.createTextNode(selectItem.label + ':');
        selectLabel.appendChild(selectLabelText);
         
        //select
        const sizeSelect = document.createElement('select');
        selectLabel.appendChild(sizeSelect);
        sizeSelect.setAttribute('name',selectItem.label);
        sizeSelect.setAttribute('class','storeFormInput');
        sizeSelect.setAttribute('required','true');

        const option = document.createElement('option');
          sizeSelect.appendChild(option);
          option.setAttribute('disabled','true');
          option.setAttribute('value','');
            const optionText = document.createTextNode('Select');
            option.appendChild(optionText);

        //create options
        selectItem.options.forEach( (selectOption,i) => {
          const option = document.createElement('option');
          sizeSelect.appendChild(option);
          option.setAttribute('value',selectOption);
            const optionText = document.createTextNode(selectOption);
            option.appendChild(optionText);
        })
      })

      //create dollar number inputs
      item.numberInputs.forEach( inputName => {
        const numberInputLabel = document.createElement('label');
        numberInputLabel.setAttribute('class','dollarInput');
        itemForm.appendChild(numberInputLabel);
        const numberInputLabelText = document.createTextNode(inputName + ':');
        numberInputLabel.appendChild(numberInputLabelText);

        const numberInput = document.createElement('input');
        numberInputLabel.appendChild(numberInput);
          numberInput.setAttribute('class','storeFormInput storeItemAmountInput');
          numberInput.setAttribute('type','number');
          numberInput.setAttribute('inputmode','numeric');
          numberInput.setAttribute('name',inputName);
          numberInput.setAttribute('step','any');
          numberInput.setAttribute('min', 15);
          numberInput.setAttribute('max', 1000);
          numberInput.setAttribute('placeholder', '0');
          numberInput.setAttribute('autocomplete','off');
          numberInput.setAttribute('required','true');
      })
      
      //create text inputs
      item.textInputs.forEach( inputName => {
        const textLabel = document.createElement('label');
        itemForm.appendChild(textLabel);
        const textLabelText = document.createTextNode(inputName + ':');
        textLabel.appendChild(textLabelText);

        const textInput = document.createElement('input');
        textLabel.appendChild(textInput);
        textInput.setAttribute('class','storeFormInput');
        textInput.setAttribute('name',inputName);
        textInput.setAttribute('placeholder',inputName);
        textInput.setAttribute('autocomplete','off');
        textInput.setAttribute('required','true');
      })
    

      //submit
      const addToCartBtn = document.createElement('button');
      itemForm.appendChild(addToCartBtn);
        addToCartBtn.setAttribute('type','submit');
        // addToCartBtn.setAttribute('value','Add to Cart');
        addToCartBtn.setAttribute('class','flex flexRow storeAddBtn');

          //svg
          const cartSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          const cartPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
          cartSvg.setAttribute('fill', 'currentColor');
          cartSvg.setAttribute('viewBox', '0 0 20 20');
          cartSvg.setAttribute('stroke', 'white');
          cartSvg.setAttribute('width', '20');
          cartSvg.setAttribute('height', '20');
        
          cartPath.setAttribute(
            'd',
            'M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z'
          );
        
          cartSvg.appendChild(cartPath);
          addToCartBtn.appendChild(cartSvg);

        const btnText = document.createTextNode('Add To Cart');
        addToCartBtn.appendChild(btnText);
}