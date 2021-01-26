const express = require('express');
const mongoose = require('mongoose');
const Router = express.Router();
const Product = mongoose.model('Product');

Router.get('/', (req, res) => {
    res.render("product/addOrEdit",{
        viewTitle : "Insert Product"
    });
});

Router.post('/', (req, res) => {
    if(req.body._id == ""){
        insertRecord(req, res);
    }
    else{
        updateRecord(req, res);
    }
});

function insertRecord(req, res){
    var product = new Product();

    product.productid = req.body.productid,
    product.productname = req.body.productname,
    product.categoryid = req.body.categoryid,
    product.categoryname = req.body.categoryname

//checking for validation

if(product.productid == "" || product.productname == "" || product.categoryid == "" || product.categoryname == ""){
    res.render('product/addoredit', ({
        viewTitle: "Insert Product",
        error: "Please Enter all the Details",
        product: req.body
    }))
    return;
}

    product.save((err, doc) => {

        if(!err){
            res.redirect('product/list');
        }      
        else {
            console.log("Error Occured" + err);
        } 
    })
}

//displaying data

Router.get('/list', (req, res) => {

    let user = Product.find();

    Product.find((err, docs) => {
        if(!err){
            res.render("product/list", {
                list: docs
            })
        }
    })
    .lean()
})

Router.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, docs) => {
        if(!err){
            res.render('product/addoredit', {
                viewTitle: 'Update Product',
                product: docs
            })
        }
    })
    .lean()
})

Router.get('/delete/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, docs) => {
        if(!err){
            res.redirect('/product/list');
        }
        else{
            console.log("Error Occured during deletion");
        }
    })
})

function updateRecord(req, res){
    Product.findOneAndUpdate({_id: req.body._id}, req.body, {new:true}, (err, docs) => {
        if(!err){
            res.redirect('product/list');
        }
        else{
            if(err.name == "validationError"){
                handlevalidationError(err,req.body);
                res.render('product/addoredit', ({
                    viewTitle: 'Update Product',
                    product: req.body
                }))
            }
            else{
                console.log("Error occured during updating record" + err);
            }
        }
    })
}

Router.get('/list/:page', (req, res, next) => {
    let perPage = 9;
    let page = req.params.page || 1;
  
    Product
      .find({}) // finding all documents
      .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
      .limit(perPage) // output just 9 items
      .exec((err, products) => {
        Product.count((err, count) => { // count to calculate the number of pages
          if (err) return next(err);
          res.render('products/products', {
            products,
            current: page,
            pages: Math.ceil(count / perPage)
          });
        });
      });
  });

module.exports = Router;