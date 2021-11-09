const { postPayment, sendEmailReceipt, setDate} = require('./controller.js');

exports.giveCredentials = async (req,res) => {
  res.status(200).send({
    APPLICATION_ID: process.env.APPLICATION_ID, 
    LOCATION_ID: process.env.LOCATION_ID
  })
}

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
      console.log('Process Complete');
    } else {
      res.status(400).send({status: 'Unable To Process Payment.'});
    }
}

