import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchProducts } from "../store/actions";
import { useLocation, useHistory } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";

const ProductListing = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    dispatch(
      fetchProducts({
        skip,
        limit,
        category: selectedCategory,
        search: searchTerm,
      })
    ).finally(() => setLoading(false));
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
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Product Listing
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <Select
            fullWidth
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            displayEmpty
            variant="outlined"
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            placeholder="Search products..."
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Grid>
      </Grid>

      <Box mt={4}>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{product.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {product.description.length > 100
                        ? product.description.substring(0, 100) + "..."
                        : product.description}
                    </Typography>
                    <Typography variant="h6" color="primary" mt={2}>
                      ${product.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSkip(skip + limit)}
            disabled={loading}
          >
            Load More
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductListing;
