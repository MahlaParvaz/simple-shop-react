const addProductToCard = (state, payload) => {
  const updatedCard = [...state.card];
  const updatedItemIndex = updatedCard.findIndex(
    (item) => item.id === payload.id
  );
  if (updatedItemIndex < 0) {
    updatedCard.push({ ...payload, quantity: 1 });
  } else {
    const updatedItem = { ...updatedCard[updatedItemIndex] };
    updatedItem.quantity++;
    updatedCard[updatedItemIndex] = updatedItem;
  }

  return {
    ...state,
    card: updatedCard,
    total: state.total + payload.offPrice,
  };
};

const removeProductFromCard = (state, payload) => {
  const updatedCard = [...state.card];
  const updatedItemIndex = updatedCard.findIndex(
    (item) => item.id === payload.id
  );
  const updatedItem = { ...updatedCard[updatedItemIndex] };

  if (updatedItem.quantity === 1) {
    const filteredCard = updatedCard.filter((item) => item.id !== payload.id);
    return {
      ...state,
      card: filteredCard,
      total: state.total - payload.offPrice,
    };
  } else {
    updatedItem.quantity--;
    updatedCard[updatedItemIndex] = updatedItem;
    return {
      ...state,
      card: updatedCard,
      total: state.total - payload.offPrice,
    };
  }
};

const cardReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CARD':
      return addProductToCard(state, action.payload);

    case 'REMOVE_PRODUCT':
      return removeProductFromCard(state, action.payload);
    default:
      return state;
  }
};

export default cardReducer;
