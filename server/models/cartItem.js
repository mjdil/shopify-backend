var mongoose = require('mongoose');

// over here i am creating a model for the product, i will refer to the product using
// a unique ID, but that is automatically generated by the Mongoose ORM
var cartItem = mongoose.model('cartItem', {
  name:{
    type: String,
    required: true,
    minlength: 4,
    trim: true
  },
  id:{
    type: Number,
    required: true
  },

});

module.exports = {cartItem};
