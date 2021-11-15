const { postPayment, sendEmailReceipt, setDate} = require('./controller.js');

// Give Square credentials to front-end
exports.giveCredentials = async (req,res) => {
  res.status(200).send({
    APPLICATION_ID: process.env.APPLICATION_ID, 
    LOCATION_ID: process.env.LOCATION_ID
  })
}

//handle back-end payment process
exports.createPayment = async (req,res) => {

    const purchaseInfoObj = req.body;

    purchaseInfoObj.transactionDate = setDate();

    //post payment
    const payment =  await postPayment(purchaseInfoObj);

    //send response and email
    if (payment.status === 'Transaction Complete') {
      res.status(200).send({status: 'Transaction Complete.'});
      purchaseInfoObj.transactionInfo = payment;
      await sendEmailReceipt(purchaseInfoObj);
      console.log(payment.status);
    } else {
      res.status(400).send({status: 'Unable To Process Payment.'});
    }
}

