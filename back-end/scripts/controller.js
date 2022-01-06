const fetch = require('node-fetch');
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require('uuid');
const { createCustomerEmail, createMerchantEmail, createErrorEmail} = require('./emails.js')

//convert date from square to 'Month, Day, Year' format
exports.setDate = () => {

  const getMonthName = month => {
    switch (month) {
      case 1: return 'January'
        break;
      case 2: return 'February'
        break;
      case 3: return 'March'
        break;
      case 4: return 'April'
        break;
      case 5: return 'May'
        break;
      case 6: return 'June'
        break;
      case 7: return 'July'
        break;
      case 8: return 'August'
        break;
      case 9: return 'September'
        break;
      case 10: return 'October'
        break;
      case 11: return 'November'
        break;
      case 12: return 'December'
        break;
    }
  }

  const today = new Date();
  const month = getMonthName(today.getMonth() + 1);
  const day = today.getDate();
  const year = today.getFullYear();

  return `${month} ${day}, ${year}`
}


// Post to Square
exports.postPayment = async paymentInfoObj => {

    //post headers/body
    const settings = {
      method: 'POST',
      headers: {
       'Authorization': process.env.SQUARE_ACCESS_TOKEN,
       'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        source_id: paymentInfoObj.paymentToken,
        idempotency_key: uuidv4(),
        amount_money: {
          amount: paymentInfoObj.total * 100,
          currency: "USD"
        },
        accept_partial_authorization: false,
        note: `${paymentInfoObj.billingInfo.firstName} ${paymentInfoObj.billingInfo.lastName}'s order.`
      })
    }

    try {
      //don't post if transaction empty
      if (
        paymentInfoObj.total <=0 ||
        paymentInfoObj.items.length < 1 ||
        paymentInfoObj.billingInfo.length < 1||
        paymentInfoObj.paymentToken === ''
      ) throw ('Insufficient Data')

      const response = await fetch('https://connect.squareup.com/v2/payments', settings);
      // const response = await fetch('https://connect.squareupsandbox.com/v2/payments', settings);
      const data = await response.json();

        let transactionObj;

        //if payment info returned
        if (data.payment) {
            //payment status complete or other
            if (data.payment.status === 'COMPLETED') {
                transactionObj = {
                    status: 'Transaction Complete',
                    cardBrand: data.payment.card_details.card.card_brand,
                    cardLast4: data.payment.card_details.card.last_4
                 }
                console.log('Payment Accepted');
            } else {
                throw ('Transaction Error. Card not accepted.')
            }
        //if payment info not returned
        } else {
            console.log('Error: ' + data.errors[0].code + ': ' + data.errors[0].detail)
            throw data.errors[0].code + ': ' + data.errors[0].detail
        }
        return transactionObj;
        //catch errors
    } catch(err) {
        return {status: err}
    }
}


//Nodemailer
exports.sendEmailReceipt = async purchaseInfoObj => {
    try {
        let transporter = nodemailer.createTransport({
            host: "walkertkdacademy.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: 'purchases@walkertkdacademy.com', 
              pass: process.env.EMAIL_PW,
            },
        });
    
        //send email receipt to customer
        await transporter.sendMail({
            from: '"Walker Taekwondo Academy" <purchases@walkertkdacademy.com>', 
            to: `${purchaseInfoObj.billingInfo.email}`,
            subject: "Order Confirmation", 
            html: createCustomerEmail(purchaseInfoObj)
        });

        //send email to merchant
        await transporter.sendMail({
          from: '"Walker Taekwondo Academy" <purchases@walkertkdacademy.com>', 
          to: `walkertkdacademy@gmail.com, info@mattallen.tech`,
          subject: "New Order Placed", 
          html: createMerchantEmail(purchaseInfoObj)
        });

        console.log('Emails Sent');
    
    } catch (err) {
        console.log(err)
    }
}

//Send Error Email
exports.sendErrEmail = async (purchaseInfoObj,err) => {
  try {
      let transporter = nodemailer.createTransport({
          host: "walkertkdacademy.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: 'purchases@walkertkdacademy.com', 
            pass: process.env.EMAIL_PW,
          },
      });
  
      //send email receipt to customer
      await transporter.sendMail({
          from: '"Walker Taekwondo Academy" <purchases@walkertkdacademy.com>', 
          to: `info@mattallen.tech`,
          subject: "Order Error", 
          html: createErrorEmail(purchaseInfoObj,err)
      });

      console.log('Err Email Sent');
  
  } catch (err) {
      console.log(err)
  }
}