//attempt to get payment token
export const generatePaymentToken = async card => {
    try {
    const result = await card.tokenize();
    if (result.status === 'OK') {
        return result.token;
    }
    } catch (e) {
        console.error('error: ' + e);
        return null;
    }
}

 //post to server
export const postData = async (PurchaseDetails) => {
    const settings = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            items: PurchaseDetails.getItems(),
            billingInfo: PurchaseDetails.billingInfo,
            paymentToken: PurchaseDetails.paymentToken,
            total: PurchaseDetails.getTotal()
        })
      }

    const status = async () => {
        try {
            const response = await fetch('https://walkertkdacademy.com/create-payment', settings);
            // const response = await fetch('http://localhost:8675/create-payment', settings);
            const data = await response.json();
            if (response.status === 200) {
                console.log(data.status)
                return data;
            } else {
                throw data.status;
            }
        } catch(err) {
            console.log('Error: ' + err)
            return 'Payment Failed';
        }
    }

    return await status();
}

//gather billing form info 
export const collectCheckoutInputs = () => {
    const checkoutForm = document.getElementById('checkoutForm');
    const fNameInput = document.getElementById('checkoutFName');
    const lNameInput = document.getElementById('checkoutLName');
    const emailInput = document.getElementById('checkoutEmail');
    return {
        firstName: fNameInput.value,
        lastName: lNameInput.value,
        email: emailInput.value
    }
}

//show processing screen 
export const displayPayProcessingScreen = (status) => {
    const overlay = document.getElementById('payStatusOverlay');
    overlay.style.display = 'flex';

    const paymentProcessingMsg = document.getElementById('paymentProcessingMsg');
    const showErrorMsg = document.getElementById('orderErrorMsg');
    const showSuccessMsg = document.getElementById('orderSuccessMsg');
    const exitBtn = document.getElementById('overlayExitBtn');

    showSuccessMsg.style.display = 'none';
    showErrorMsg.style.display = 'none';
    paymentProcessingMsg.style.display = 'none';

    exitBtn.addEventListener('click', e => {
        overlay.style.display = 'none';
        if (status === 'success') {
            localStorage.removeItem('cartItems');
            location.reload();
        } 
    });

    if (status === 'success') {
        showSuccessMsg.style.display = 'block';
        exitBtn.style.display = 'block';
    } else if (status === 'error') {
        showErrorMsg.style.display = 'block';
        exitBtn.style.display = 'block';
    } else if (status === 'pending') {
        paymentProcessingMsg.style.display = 'block';
    };
}