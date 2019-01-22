var {product} = require('../models/product');
var {cartItem} = require('../models/cartItem');
var {user} = require('../models/user');


var requireLogin = require('../middleware/requireLogin');
module.exports = (app)=>{

// in this route, you can add x amount of product y, to your cart, allowing you to purchase multiple of a product
app.post('/product/:id/:amount', requireLogin, async (req,res)=>{
  var objId = req.params.id;
  var amount = req.params.amount;

  const productmodel = await product.findOne({_id: objId});
  var price = productmodel.price;
  var name = productmodel.name;
  var inv = productmodel.inventory;
  for (i = 0; i < amount; i++) {
    // only able to add to our cart if the inventory is greater than 0, meaning it is there!
    if (inv>0){
      req.user.cart.push([objId,name]);
      req.user.subtotal += price;
      inv -=1
    }

    }
    // so in the req.user.cart, its an array in the form of [code,name]
    const r  = await user.findOne({_id:req.user.id});
    r.cart = req.user.cart;
    r.subtotal = req.user.subtotal;
    const l = await r.save();
    console.log("hi")

    req.user.save().then((resp)=>{
      res.send(resp);
    }, (e) =>{
      res.status(400).send(e);
    });

});


// this route will allow the user to checkout their order, so it will look at the current state of the cart
// and it will decrement all inventory accordingly in addition to telling the user of their total bill!
app.get('/checkout',requireLogin, async (req,res)=>{
   var length = req.user.cart.length;
   console.log(length);
   var checkoutPrice = 0;


   for (i=0;  i< length;i++){
     var productid= req.user.cart[i][0];
     const prodo = await product.findOne({_id: productid});
     prodo.inventory -=1;
    const work = await  prodo.save();
     checkoutPrice += prodo.price;
   }
     res.send({checkout: checkoutPrice, message: "thanks for shopping at my shopify backend!"});



});


};
