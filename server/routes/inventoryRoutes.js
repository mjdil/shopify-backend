var {product} = require('../models/product')
var requireLogin = require('../middleware/requireLogin');
module.exports = (app)=>{

// this route is for adding a product to the marketplace and setting its inventory
app.post('/product' ,requireLogin,  (req, res) =>{
  var prod = new product({
    name : req.body.name,
    inventory: req.body.inventory,
    price: req.body.price
  });
  prod.save().then((resp)=>{
    res.send(resp);
  }, (e) =>{
    res.status(400).send(e);
  })

});

// this route is for modifying the inventory of a specific item
app.post('/product/:id', requireLogin , (req,res)=>{
  var id = req.params.id;
  var newInventory = req.body.inventory;
  console.log(id);
  console.log(newInventory);

  product.findOneAndUpdate({_id: id},{$set:{inventory: newInventory}},{new:true})
  .then((resp)=>{
    if (!resp){
      return res.status(405).send();
    }
      res.send(JSON.stringify(resp,null,2));

  }).catch((e)=>{
    res.stauts(400).send();
  });
});

// this route is for fetching all product, is you pass in true as the second parameter in the request,
//it will only return the objects that have available inventory
app.get('/product/:available',(req, res) =>{
  var choice = req.params.available;
  if (choice == "yes"){
    product.find({inventory: {$gte: 1}}).then((resp)=>{
      console.log(resp);
      res.send(JSON.stringify(resp,null,2));
    }, (e) =>{
      res.status(400).send(e);
    })
  }
  else{
    product.find().then((resp)=>{
    res.send(JSON.stringify(resp,null,2));
  }, (e) =>{
    res.status(400).send(e);
  })}

});

//This route is to search for a specfiic product, one you are aware of its id, We could have also searched
//based off of its name, but we want to keep it simple
app.get('/product/:id', (req,res)=>{
  var id = req.params.id;
  product.findOne({_id: id}).then((resp)=>{
    if (!resp){
      return res.status(404).send();
    }
      res.send(resp);

  }).catch((e)=>{
    res.status(400).send();
  });
});

//this route is if you want to delete a product from the marketplace
app.delete('/product/:id', requireLogin, (req,res)=>{
  var id = req.params.id;
  product.findOneAndRemove({_id: id}).then((resp)=>{
    if (!resp){
      return res.status(404).send();
    }
      res.send(resp);

  }).catch((e)=>{
    res.stauts(400).send();
  });
});
};
