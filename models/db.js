const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Product', 
{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
.then(() => {
    console.log("Connected Successfully");
}).catch((err) => {
    console.log(err);
});

require('./model');