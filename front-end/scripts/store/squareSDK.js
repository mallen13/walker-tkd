const initializeSquare = async () => {

    //fetch Square appID and locationID from server
    const fetchSquareCredentials = async () => {
        try {
            const response = await fetch('https://walkertkdacademy.com/square-credentials');
            //const response = await fetch('http://localhost:8675/square-credentials');
            const data = await response.json();
            return data;
        } catch(err) {
            console.log(err)
        }
    }

    const renderCardInput = async ()=> {
       //sdk initialized in head script tag on store.html

       const { APPLICATION_ID, LOCATION_ID } = await fetchSquareCredentials();
       const payments = Square.payments(APPLICATION_ID, LOCATION_ID);
   
       //setup card input and attach to DOM
       const card = await payments.card();
       await card.attach('#card-container');
   
       return card;
   }
   
   return await renderCardInput();
}

export default initializeSquare;