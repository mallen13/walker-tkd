import { generatePaymentToken, postData, displayPayProcessingScreen, collectCheckoutInputs } from './checkoutController.js';

const handleCheckout = (card,PurchaseDetails) => {

    //listen for checkout submit
    const checkoutForm = document.getElementById('checkoutForm');

    //hanlde checkout submit
    checkoutForm.addEventListener('submit', async e => {
        e.preventDefault();
        
        if (PurchaseDetails.getTotal() > 0 ) {
            //show processing screen
            displayPayProcessingScreen('pending');

            //collect inputs
            PurchaseDetails.billingInfo = collectCheckoutInputs();

            //generate payment token
            PurchaseDetails.paymentToken = await generatePaymentToken(card);

            //if no payment token or failed to post, post error. Else post success
            !PurchaseDetails.paymentToken || await postData(PurchaseDetails) === 'Payment Failed'
                ?  displayPayProcessingScreen('error')
                :  displayPayProcessingScreen('success')
        } else {
            alert('History has been cleared . Please try again.');
            localStorage.removeItem('cartItems');
            location.reload();
        }
    })
}

export default handleCheckout;