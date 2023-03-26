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
      
        <CardMedia
          component="img"
          image={product.image}
        />
        <CardContent> 
        <Typography color="textSecondary" variant="h5"> {product.name}
         </Typography>
          <Typography color="textSecondary" variant="subtitle2">
           ${product.cost}
          </Typography>
          <Rating name="simple-controlled"value={product.rating}/> 
         </CardContent>
         <Button sty className="button" variant="contained">{<AddShoppingCartOutlined/>}  ADD TO CART</Button>
      
    </Card>
  );
};

export default ProductCard;
