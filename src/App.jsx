import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductListing from "./components/ProductListing";

const App = () => {
  return (
    <div>
      <h1>Product Listing App</h1>
      <Routes>
        <Route path="/" element={<ProductListing />} />
      </Routes>
    </div>
  );
};

export default App;
// 2. The app currently does not handle error states well (e.g., when the API request fails).
// 3. Infinite scrolling is not yet implemented.
// 4. There's no clear feedback if no products are available (a message could be displayed).
// 5. Since we're using client-side pagination, it could become inefficient with very large data sets.
