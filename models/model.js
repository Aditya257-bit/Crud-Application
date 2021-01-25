const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    productid : {
        type: Number,
        unique: true,
        required: true
    },
    productname : {
        type: String,
        unique: true,
        required: true
    }, 
    categoryid : {
        type: Number,
        unique: true,
        required: true
    },
    categoryname : {
        type: String,
        required: true,
        required: true
    }
});

mongoose.model('Product', schema);

