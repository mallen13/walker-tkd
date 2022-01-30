export let PurchaseDetails = {
    billingInfo: {},
    paymentToken: '',
    addItem: function(item){
      let itemsInStorage = localStorage.getItem('cartItems');
      //if cart items in storage, parse the array, add to it, then stringify and update
      if (itemsInStorage) {
        let cartItems = JSON.parse(itemsInStorage);
        cartItems.push(item);
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
      } else {
        localStorage.setItem('cartItems', JSON.stringify([item]));
      }
    },
    removeItem: function(itemName){
      let itemsInStorage = JSON.parse(localStorage.getItem('cartItems'));
      itemsInStorage.forEach( (item,i)=> {
        if (item.name === itemName) {
            itemsInStorage.splice(i,1);
            localStorage.setItem('cartItems', JSON.stringify(itemsInStorage))
        }
      })
    },
    getItems: function(){
      const items = localStorage.getItem('cartItems');
      if (items) {
        return JSON.parse(items)
      } else {
        return []
      }
    },
    getSubtotal: function(){
      let total = 0;
      let items = this.getItems();
      items.forEach( item => total += item.price)
      return total;
    },
    getTotal: function(){
      let total = 0;
      let items = this.getItems();
      items.forEach( item => total += item.price);

      let fee = 0;
      //calc fee of 2.9% + 30 cents
      //if (total > 0) fee = Math.round(100 * total * .029) / 100 + .3;
      return total + fee;
    }
  }

export const ItemsList = [
    {
      name: 'Monthly School Membership',
      description: 'Monthly family school membership. Does not include USCDKA membership.',
      price: 20.00,
      textInputs: ['Family Name'],
      selectInputs: [
        {
            label: 'Month',
            options: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November','December']
        },
      ],
      numberInputs: []
    },
    {
      name: 'Annual School Membership',
      description: '12 Month Annual family school membership. Does not include USCDKA membership.',
      price: 30.00,
      selectInputs: [],
      textInputs: ['Family Name'],
      numberInputs: []
    },
    {
      name: 'Belt Testing Fee',
      description: 'For Gup Students (Colored Belts). Includes belt, testing fee, and USCDKA promotion certificate.',
      price: 30.00,
      selectInputs: [
        {
            label: 'Belt Size',
            options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        },
        {
            label: 'Next Rank',
            options: ['9th Gup (Yellow)', '8th Gup (Gold)', '7th Gup (Orange)', '6th Gup (Green)', 
                      '5th Gup (Blue)', '4th Gup (Red)', '3rd Gup (Purple)', '2nd Gup (Brown)', '1st Gup (Brown w/ Black Stripe)']
        }
      ],
      textInputs: ['Student Name'],
      numberInputs: []
    },
    {
      name: 'Taekwondo Uniform',
      description: 'Walker Taekwondo Academy branded uniform.',
      price: 30,
      selectInputs: [
          {
              label: 'Uniform Size',
              options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
          }
      ],
      textInputs: ['Student Name'],
      numberInputs: []
    },
    {
      name: 'Donation',
      description: 'Donate to the school or sponsor a specific student or event. Minimum of $15.',
      price: '',
      selectInputs: [],
      textInputs: ['Memo'],
      numberInputs: ['Donation Amount']
    }
  ]