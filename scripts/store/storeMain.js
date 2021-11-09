import { PurchaseDetails, ItemsList } from './storeData.js';
import { setupStoreNav, renderStoreItem } from './storeSetup.js';
import setupCart from './cart/cart.js';
import handleCheckout from './checkout/checkout.js';
import initializeSquare from './squareSDK.js';

const store = async () => {
  setupStoreNav(PurchaseDetails); 
  ItemsList.forEach( item => renderStoreItem(item)) ;
  setupCart(PurchaseDetails);
  const card = await initializeSquare();
  handleCheckout(card,PurchaseDetails);
}

store();
