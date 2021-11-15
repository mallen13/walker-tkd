// Create Customer Email
exports.createCustomerEmail = purchaseInfoObj => {
  //Get teach item on order
  const getItems = () => {
    let returnString = '';
    //for each of purchase obj
    purchaseInfoObj.items.forEach( item => {
      //add item name/ price
      returnString +=`1 ${item.name} ($${item.price})<br />`
      //for each item input, add name and value
      item.inputs.forEach( input => {
        returnString += `<span style="margin-left:2rem;">&#9702; ${Object.keys(input)}: ${Object.values(input)}</span><br />`
      })
    })
    //return as HTML string
    return returnString;
  }

  // customer email HTML
  return `<div style="font-size:1.1rem;color:black">
      <p>${purchaseInfoObj.billingInfo.firstName},</p>
      <p>Walker Taekwondo Academy thanks you for your order!</p>

      <p> 
        <span style="text-decoration:underline; font-weight:bold">Billing Information:</span> <br />
        Date: ${purchaseInfoObj.transactionDate}  <br />
        First Name: ${purchaseInfoObj.billingInfo.firstName}  <br />
        Last Name: ${purchaseInfoObj.billingInfo.lastName}  <br />
        Email Address: ${purchaseInfoObj.billingInfo.email}  <br />
        Amount Billed: $${purchaseInfoObj.total}  <br />
        Payment: ${purchaseInfoObj.transactionInfo.cardBrand } ending in ${purchaseInfoObj.transactionInfo.cardLast4}  <br />
      </p>

      <p>
        <span style="text-decoration:underline; font-weight:bold">Order Details:</span> <br />
        ${getItems()}
    
      <p>For tax purposes, this receipt should be kept as a record of your non-profit donation.<p>

      <p>For questions, please contact <a href="mailto:walktertkdacademy@gmail.com">walkertkdacademy@gmail.com</a>.</p>

      <p style='font-style:italic; font-size:0.9rem'>
        Note: This email was auto-generated and cannot recieve responses. 
        If you were not the intended recipient, please disregard.
      </p>
    </div>
  `
}

// create merchange email
exports.createMerchantEmail = purchaseInfoObj => {
  //get each item from order
  const getItems = () => {
    let returnString = '';
    //get item name/ price
    purchaseInfoObj.items.forEach( item => {
      returnString +=`1 ${item.name} ($${item.price})<br />`
      //for each input, add name and value
      item.inputs.forEach( input => {
        returnString += `<span style="margin-left:2rem;">&#9702; ${Object.keys(input)}: ${Object.values(input)}</span><br />`
      })
    })
    //return html string
    return returnString;
  }
  //merchant email
  return `<div style="font-size:1.1rem;color:black">
      <p>Hello,</p>
      <p>A new order has been placed.</p>

      <p> 
        <span style="text-decoration:underline; font-weight:bold">Billing Information:</span> <br />
        Date: ${purchaseInfoObj.transactionDate}  <br />
        First Name: ${purchaseInfoObj.billingInfo.firstName}  <br />
        Last Name: ${purchaseInfoObj.billingInfo.lastName}  <br />
        Email Address: ${purchaseInfoObj.billingInfo.email}  <br />
        Amount Billed: $${purchaseInfoObj.total}  <br />
        Payment: ${purchaseInfoObj.transactionInfo.cardBrand } ending in ${purchaseInfoObj.transactionInfo.cardLast4}  <br />
      </p>

      <p>
        <span style="text-decoration:underline; font-weight:bold">Order Details:</span> <br />
        ${getItems()}
  
    </div>
  `
}