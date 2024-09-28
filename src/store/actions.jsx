import axios from "axios";

export const fetchCategories = () => async (dispatch) => {
  const response = await axios.get("https://dummyjson.com/products/categories");
  dispatch({ type: "SET_CATEGORIES", payload: response.data });
};

export const fetchProducts =
  ({ skip, limit, category, search }) =>
  async (dispatch) => {
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    if (category) url += `&category=${category}`;
    if (search) url += `&search=${search}`;
    const response = await axios.get(url);
    dispatch({ type: "SET_PRODUCTS", payload: response.data.products });
  };
