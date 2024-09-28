const initialState = {
  categories: [],
  products: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_PRODUCTS":
      return { ...state, products: [...state.products, ...action.payload] };
    default:
      return state;
  }
};
