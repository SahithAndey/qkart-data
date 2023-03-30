import { AddShoppingCartOutlined } from "@mui/icons-material";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
  CardActionArea,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Card className="card">
      <CardMedia component="img" image={product.image} />
      <CardContent>
        <Typography color="textSecondary" variant="h5">
          
          {product.name}
        </Typography>
        <Typography color="textSecondary" variant="subtitle2">
          ${product.cost}
        </Typography>
        <Rating name="read-only" value={product.rating} readOnly/>
        <CardActions className="card-actions" >
        <Button
          className="card-button"
          variant="contained"
          startIcon={<AddShoppingCartOutlined />}
        >
          ADD TO CART
        </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
