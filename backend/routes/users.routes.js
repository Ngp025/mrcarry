const { json } = require('express');
const express = require('express');
const users = express.Router();
const User = require('../models/users/users');
const Products = require('../models/users/products')


// - - - - -  GET
users.get('/mclist', async (req, res) =>{
 var mcList = await User.find({},{
   _id: true,
   mcName :true,
   link: true,
   social: true,
   views: true,  
    })
    res.json(mcList.sort())
  })



// - - - - -  POST
/*
    var orderViews = []
    for(var i = 0 ; i < mcList.length ; i++){
      //console.log(mcList[i].views)
      orderViews.push(mcList[i].views)
    }
    var sortOrderViews = orderViews.sort(function(a, b){return b-a})
    var actualIndex = [0]
    var orderMcList = []
    
    function filterMc () {
      function indexHandler(){
        var newIndex = actualIndex[0]+1
        actualIndex.pop()
        actualIndex.push(newIndex)
      }
      function eliminar(array, elemento) {
        var resultado = []
        for (var i = 0; i < array.length; i++) {
          if (array[i] !== elemento) {
            resultado.push(array[i]);
          }
        }
        return resultado;
      }
      function filter(){
        var filterIndex = []
        filterIndex.pop()
        filterIndex.push(actualIndex[0])
        for(var i = 0 ; i < mcList.length ; i++){
          if( mcList[i].views === sortOrderViews[actualIndex[0]]){
            orderMcList.push(mcList[i]);
            //mcList.pop()
            var array = mcList;
            //console.log(array.length)
            array = eliminar(array, mcList[i]);
            //console.log( array.length );
          }
        }
        if (orderMcList.length === mcList.length){
          console.log("Fin")
        }else{
          indexHandler();
        }
      }
      console.log(orderMcList.length, "orderlenh")
      console.log(mcList.length, "mcList Len")
      filter()
    }

    if(orderMcList.length === mcList.length){

    }else{
      filterMc();
    }     
*/
// Views
users.post('/views/:IDU/:mcName', async (req, res) => {
  const { IDU } = req.params;
  const { mcName } = req.params
  User.findOneAndUpdate( {_id : IDU}, { $inc : {views : 1} }).then(
    console.log(`Usuario ${mcName} incremento sus vistas en 1`)
  )
})
// Inscripción
users.post('/betaregister/',
 async (req, res) => {
    //var regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    //var verify = "true" //req.params.emailVerify
    var newUserToSave = {
      name: req.body.nameR,
      mcName: req.body.mcName, 
      document: req.body.documentR,
      born: req.body.dateR,
      link: req.body.link,
      social: req.body.social || '-' ,
      tutorsName: req.body.nameTutorR || '-',
      tutorsDocument: req.body.documentTutorR || '-',
    };
    //console.log(newUserToSave , "-- Usuario a guardar")
    await User.create(newUserToSave)
    .catch((err)=>{
      console.log(err.keyValue, "error")
      res.json(err.keyValue)
    })
    .then(()=>res.json("saved"))
  },
);


module.exports = users;