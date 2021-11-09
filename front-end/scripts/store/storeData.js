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
          console.log(itemName)
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
    getTotal: function(){
      let total = 0;
      let items = this.getItems();
      items.forEach( item => total += item.price)
      return total;
    }
  }

export const ItemsList = [
    {
      name: 'Monthly School Membership',
      description: 'Monthly family school membership. Does not include USCDKA membership.',
      price: 20.00,
      selectInputs: [],
      textInputs: ['Family Name'],
      numberInputs: []
    },
    {
      name: 'Annual School Membership',
      description: 'Annual family school membership. Does not include USCDKA membership.',
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
      description: 'Donate to the school or sponsor a specific student or event. Minimum of $5.',
      price: '',
      selectInputs: [],
      textInputs: ['Memo'],
      numberInputs: ['Dollar Amount (Ex: 5 = $5, 50 = $50) ']
    }
  ]