const express = require('express');
const product = express.Router();
const Products = require('../models/users/products')

// GET

product.get('/getProduct', async (req, res) =>{
    var productList = await User.find({},{
      _id: true,
      name :true,
      description: true,
      image: true,
      price: true,  
       })
       res.json(productList)
     })

// POST

product.post('/priceSubmit/',
 async (req, res) => {
    //var regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    //var verify = "true" //req.params.emailVerify
    var newProduct = {
      name: req.body.name,
      description: req.body.description, 
      image: req.body.image,
      price: req.body.price
    };
    console.log(newProduct)
    //console.log(newUserToSave , "-- Usuario a guardar")
    await Products.create(newProduct)
    .catch((err)=>{
        console.log(err.keyValue, "error")
        res.json(err.keyValue)
      })
    .then(()=>res.json("saved"))
  },
);

module.exports = product;