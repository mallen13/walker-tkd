  //capture title, price, input values
  export const captureItemInputs = (form) => {
    const title = form.getElementsByClassName('itemTitle');
    const price = form.getElementsByClassName('itemPrice');
    const inputValues = form.querySelectorAll('.storeFormInput');

    let itemObj = {
    name: '',
    price: '',
    inputs: []
    };

    //add title
    itemObj.name = title[0].innerHTML;

    //add price (if exists) and convert to float
    if (price.length) itemObj.price = parseFloat(price[0].innerHTML.replace('$',''));

    //add inputs
    inputValues.forEach(input => {
        //capture number input, then other inputs
        if (input.className === 'storeFormInput storeItemAmountInput') {
            itemObj.price = parseFloat(input.value);
        } else {
            itemObj.inputs.push({[input.name]: input.value})
        }
    });
    return itemObj;
}

//render cart in DOM
export const addToCartDOM = item => {
    //row container
    const cart = document.getElementById('cartDetails');
    const rowContainer = document.createElement('div');
    cart.appendChild(rowContainer);
    rowContainer.setAttribute('class', 'cartRow')

            //div
            const rowDiv = document.createElement('div');
            rowContainer.appendChild(rowDiv);

                //div
                const rowTitleDiv = document.createElement('div');
                rowTitleDiv.setAttribute('class', 'cartItemHeaderDiv')
                rowDiv.appendChild(rowTitleDiv);

                    //remove item button
                    const removeItemBtn = document.createElement('button');
                    removeItemBtn.setAttribute('class', 'removeItemBtn');
                    rowTitleDiv.appendChild(removeItemBtn);

                        //svg
                        const xSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                        const xPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    
                        xSvg.setAttribute('fill', 'currentColor');
                        xSvg.setAttribute('viewBox', '0 0 16 16');
                        xSvg.setAttribute('stroke', 'currentColor');
                        xSvg.setAttribute('width', '16');
                        xSvg.setAttribute('height', '16');
                    
                        xPath.setAttribute(
                        'd',
                        'M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z'
                        );
          
                        xSvg.appendChild(xPath);
                        removeItemBtn.appendChild(xSvg);

                    //item name
                    const itemName = document.createElement('p');
                    rowTitleDiv.appendChild(itemName);
                    const itemNameText = document.createTextNode(item.name);
                    itemName.appendChild(itemNameText);

                //item inputs
                const listContainer = document.createElement('ul');
                rowDiv.appendChild(listContainer);

                item.inputs.forEach( item => {
                    const inputValue = document.createElement('li');
                    inputValue.setAttribute('class', 'cartInputValue'); inputValue.setAttribute('class', 'cartInputValue')
                    rowDiv.appendChild(inputValue);
                    const inputValueText = document.createTextNode(`${Object.keys(item)[0]}:  ${Object.values(item)[0]}`);
                    inputValue.appendChild(inputValueText);
                })

            //item price
            const itemPrice = document.createElement('p');
            rowContainer.appendChild(itemPrice);
            const itemPriceText = document.createTextNode(`$${item.price}`);
            itemPrice.appendChild(itemPriceText)
}

//update Dom Cart / button totals
export const updateDOMCartTotal = total => {
    document.getElementById('cartBtnText').innerHTML = `View Cart: $${total}`;
    document.getElementsByClassName('cartTotal')[0].innerHTML = `Total: $${total}`;
    total > 0 ? document.getElementById('storePayBtn').style.display='flex' : document.getElementById('storePayBtn').style.display='none';
    document.getElementById('payBtnText').innerHTML = `Pay: $${total}`;
}