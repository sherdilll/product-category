import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchProducts } from "./store/actions";
import { useLocation, useHistory } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [limit] = useState(10); // Items per batch
  const [skip, setSkip] = useState(0);

  const history = useHistory();
  const location = useLocation();

  // Parsing URL query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = queryParams.get("category");
    const searchFromUrl = queryParams.get("search");
    if (categoryFromUrl) setSelectedCategory(categoryFromUrl);
    if (searchFromUrl) setSearchTerm(searchFromUrl);
  }, [location.search]);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Fetch products based on category or search term
  useEffect(() => {
    dispatch(
      fetchProducts({
        skip,
        limit,
        category: selectedCategory,
        search: searchTerm,
      })
    );
  }, [dispatch, selectedCategory, searchTerm, skip, limit]);

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSkip(0); // Reset skip for pagination
    const queryParams = new URLSearchParams();
    if (category) queryParams.set("category", category);
    if (searchTerm) queryParams.set("search", searchTerm);
    history.push({ search: queryParams.toString() });
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
    setSkip(0); // Reset skip for pagination
    const queryParams = new URLSearchParams();
    if (selectedCategory) queryParams.set("category", selectedCategory);
    if (searchValue) queryParams.set("search", searchValue);
    history.push({ search: queryParams.toString() });
  };

  return (
    <div>
      <h1>Product Listing</h1>

      <select
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>

      <button onClick={() => setSkip(skip + limit)}>Load More</button>
    </div>
  );
};

export default App;
