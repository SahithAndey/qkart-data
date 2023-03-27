import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
import ProductCard from "./ProductCard";

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 *
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

const Products = () => {
  const user = localStorage.getItem("username");
  const isLogged = user ? true : false;

  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [err, setErr] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(0);

  const performAPICall = async () => {
    try {
      setLoading(true);
      axios.get(config.endpoint + "/products").then((res) => {
        setProduct(res.data);
        setLoading(false);
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        setLoading(false);
      } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running and returns valid JSON.",
          { variant: "error" }
        );
      }
    }
  };
  useEffect(() => {
    performAPICall();
  }, []);

  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */

  const performSearch = async (text) => {
    try {
      await axios
        .get(config.endpoint + `/products/search?value=${text}`)
        .then((res) => {
          setErr(false);
          setProduct(res.data);
        });
    } catch (error) {
      if (error.response !== undefined && error.response.status === 404) {
        enqueueSnackbar("No products found", { variant: "error" });
      } else {
        
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      
      setErr(true);
    }
  };

  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  const debounceSearch = (event, debounceTimeout) => {
    const searchKey = event.target.value;
    clearTimeout(debounceTimeout);
    const time = setTimeout(() => {
      performSearch(searchKey);
    }, 500);
    setDebounceTimeout(time);
  };

  /**
   * Perform the API call to fetch the user's cart and return the response
   *
   * @param {string} token - Authentication token returned on login
   *
   * @returns { Array.<{ productId: string, qty: number }> | null }
   *    The response JSON object
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 401
   * {
   *      "success": false,
   *      "message": "Protected route, Oauth2 Bearer token not found"
   * }
   */
  const fetchCart = async (token) => {
    // if (!token) return;
    // try {
    //   // TODO: CRIO_TASK_MODULE_CART - Pass Bearer token inside "Authorization" header to get data from "GET /cart" API and return the response data
    // } catch (e) {
    //   if (e.response && e.response.status === 400) {
    //     enqueueSnackbar(e.response.data.message, { variant: "error" });
    //   } else {
    //     enqueueSnackbar(
    //       "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
    //       {
    //         variant: "error",
    //       }
    //     );
    //   }
    //   return null;
    // }
  };

  // TODO: CRIO_TASK_MODULE_CART - Return if a product already exists in the cart
  /**
   * Return if a product already is present in the cart
   *
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { String } productId
   *    Id of a product to be checked
   *
   * @returns { Boolean }
   *    Whether a product of given "productId" exists in the "items" array
   *
   */
  const isItemInCart = (items, productId) => {};

  /**
   * Perform the API call to add or update items in the user's cart and update local cart data to display the latest cart
   *
   * @param {string} token
   *    Authentication token returned on login
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { Array.<Product> } products
   *    Array of objects with complete data on all available products
   * @param {string} productId
   *    ID of the product that is to be added or updated in cart
   * @param {number} qty
   *    How many of the product should be in the cart
   * @param {boolean} options
   *    If this function was triggered from the product card's "Add to Cart" button
   *
   * Example for successful response from backend:
   * HTTP 200 - Updated list of cart items
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 404 - On invalid productId
   * {
   *      "success": false,
   *      "message": "Product doesn't exist"
   * }
   */
  const addToCart = async (
    token,
    items,
    products,
    productId,
    qty,
    options = { preventDuplicate: false }
  ) => {};

  return (
    <div>
      <Header
        isLogged={isLogged}
        hasHiddenAuthButtons={true}
        children={
          <TextField
            className="search-desktop"
            size="small"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search color="primary" />
                </InputAdornment>
              ),
            }}
            placeholder="Search for items/categories"
            name="search"
            onChange={(event) => debounceSearch(event, 500)}
          />
        }
      />

      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        onChange={(event) => debounceSearch(event.target.value)}
      />
      <Grid container>
        <Grid item className="product-grid">
          <Box className="hero">
            <p className="hero-heading">
              India's
              <span className="hero-highlight">FASTEST DELIVERY</span> to your
              door step
            </p>
          </Box>
          {loading ? (
            <Box
              className="loading"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <CircularProgress />
              <br />
              <p align="center">Loading Products</p>
            </Box>
          ):err ? (
            <Grid className="loading" item xs={12} md={12}>
              <SentimentDissatisfied />
              <br />
              <p>No products found</p>
            </Grid>
          ) : (
            <Grid container >
              {product.map((product1) => (
                <Grid item xs={6} md={3} style={{ padding: "0.5rem" }} key={product._id}>
                  <ProductCard image={product1.image} product={product1} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>

      {/* {product.map((product1) =>{
          return(
            <Grid item xs={6} md={3} style={{padding:"0.5rem"}}>
            <ProductCard 
            image={product1.image}
  
            product={product1} />
            </Grid>
        )}
          
       ) };
          */}
      {/* TODO: CRIO_TASK_MODULE_CART - Display the Cart component */}
      <Footer />
    </div>
  );
};

export default Products;
