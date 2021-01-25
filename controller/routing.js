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
        updateRecord(req,res);
    }
});

function insertRecord(req, res){
    let product = new Product();

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
            console.log('Error Occured');
        } 
    })
}

//displaying data

Router.get('/list', (req, res) => {

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
            res.render('product/addoredit', ({
                viewTitle: 'Update Product',
                product: req. body
            }))
        }
    })
}

module.exports = Router;