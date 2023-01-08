var express = require('express');
var router = express.Router();

const userModel  = require('./users.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// router.get('/create' , function(req,res){
//   userModel.create({name:req.query.name , username:req.query.username })
//   .then(function(created){
//     res.send(created);
//   })
// })

// router.get('/find', function(req, res) {
//  userModel.findOne({username:"beta"})
//  .then(function(presentuser){
//   res.send(presentuser);
//  })
// });

// router.get('/deleted', function(req, res, next) {
//   userModel.findOneAndDelete({username:"beta"})
//   .then(function(deleteduser){
//    res.send(deleteduser);
//   })
// });

// router.get('/update', function(req, res, next) {
//   userModel.findOneAndUpdate({username:"beta"} , {name:"harsh"})
//   .then(function(updateduser){
//    res.send(updateduser);
//   })
// });





module.exports = router;
