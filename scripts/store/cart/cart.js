import * as exports from "./cartController.js";
Object.entries(exports).forEach(([name, exported]) => window[name] = exported);

const setupCart = PurchaseDetails => {
    //handle add to cart
            //add item form event listeners
            const storeItemForms = document.getElementById('storeItems').getElementsByTagName('form');
            for (const form of storeItemForms) {
                form.addEventListener('submit', e => addToCart(e,form) );
            }

            //add event listeners on cart buttons
            const addCartItemEventListeners = () => {
                const cartRows = document.getElementById('storeCart').getElementsByClassName('cartRow');
                for (const row of cartRows) {
                    const itemName = row.getElementsByTagName('div')[1].getElementsByTagName('p')[0].innerHTML
                    const removeBtn = row.getElementsByClassName('removeItemBtn')[0];
                    removeBtn.addEventListener('click', () => removeFromCart(row,itemName) )
                }
            }
        
            //render cart,get totals, and add event listeners on initial load
            PurchaseDetails.getItems().forEach( item => addToCartDOM(item) );
            updateDOMCartTotal(PurchaseDetails.getTotal());

            addCartItemEventListeners();

            //handle cart addition
            const addToCart = (e,form) => {
                e.preventDefault();
                //update purchase details
                const item = captureItemInputs(form);
                PurchaseDetails.addItem(item);
                addToCartDOM(item);
                addCartItemEventListeners();
                updateDOMCartTotal(PurchaseDetails.getTotal());
                //once complete
                form.reset();
                alert('Item Added');
            }

    //handle remove from cart
            //handle remove from cart
            const removeFromCart = (row,itemName) => {
                if (confirm('Remove Item?')) {
                    PurchaseDetails.removeItem(itemName);
                    updateDOMCartTotal(PurchaseDetails.getTotal());
                    row.remove();
                }  
            }    
}

export default setupCart;