export const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
};

export const actionTypes = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CHANGE_QUANTITY: 'CHANGE_QUANTITY',
};

export const getTotal = (cart) => {
  return cart.reduce(
    (accumulated, currentItem) =>
      accumulated + Number(currentItem.price) * Number(currentItem.quantity),
    0
  );
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'ADD_TO_CART':
      let repeated = false;
      const itemAdded = state.cart.map((shoe) => {
        if (shoe.id === action.item.id) {
          repeated = true;
          return {
            ...shoe,
            quantity: shoe.quantity + 1,
          };
        }
        return shoe;
      });
      if (!repeated) itemAdded.push(action.item);
      console.log('ADDED: ', itemAdded);
      localStorage.setItem('cart', JSON.stringify(itemAdded));
      return {
        ...state,
        cart: itemAdded,
      };
      break;
    case 'CHANGE_QUANTITY':
      console.log('CAMBIAMOS...', action.id);
      const updatedQuantity = state.cart.map((shoe) => {
        if (shoe.id === action.id) {
          return {
            ...shoe,
            quantity: action.newQuantity,
          };
        }
        return shoe;
      });
      console.log('CHANGED QUANTITY: ', updatedQuantity);
      localStorage.setItem('cart', JSON.stringify(updatedQuantity));
      return {
        ...state,
        cart: updatedQuantity,
      };
      break;
    case 'REMOVE_ITEM':
      const updatedList = state.cart.filter((shoe) => shoe.id !== action.id);
      localStorage.setItem('cart', JSON.stringify(updatedList));
      return {
        ...state,
        cart: updatedList,
      };
    default:
      return state;
      break;
  }
};

export default reducer;
