var express = require('express');
var fs = require('fs')
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, ) {
//   fs.readdir('./uploads',function(err,data){
//     res.render('index',{data:data});
//   })
// });

/* /router pr abhi sirf hame sidenav dikhana h but we need a way to distinguish ke kb kya dikhana h 
isliye humne ya pr bhi filename pas kr rkha h jiske karan jb filename ke length will be 0 it will only display sidenav
here we have created an array which will be storing filename and wheter that is a file or folder
the readdir will read everything and stre in data then using for loop we will push everything in array
*/ 
router.get('/', function(req, res) {
  let filesa = [];
 var data =  fs.readdirSync('./uploads' , {withFileTypes:true});
  data.forEach(function(f){
    filesa.push({names:f.name , isFolder : f.isDirectory() });
  })
   console.log(filesa)
  res.render('index' , {data: filesa , filename:""});
});

/* now whenever i click a file i want its name on the top as well as the text area and so whenever we click a file we want its name so we created a 
dynamic router jiske karan hum file ka name le skte h aur jb filename ke length 0 se jada hoge to hum side nav ke alawa top nav and text area bhi dikhaenge

and we also need to read that file so that in case us file m kuch data store ho to hum wo bhi display kr ske
*/ 
router.get('/file/:filename', function(req, res) {
  let filesa = [];
 var data =  fs.readdirSync('./uploads' , {withFileTypes:true});
  data.forEach(function(f){
    filesa.push({names:f.name , isFolder : f.isDirectory() });
  })
  fs.readFile(`./uploads/${req.params.filename}`, "utf-8" ,function(err,data){
      res.render("index" ,{data:filesa,filename:req.params.filename, filedata:data})
  })
});


/* now whenver we click on save button we are saying ke aap /save/filename router pr data
 ko send kr do so now we need to create that router to is router m humne bole ke aap us file 
 ko write kro and once u do that redirect us back from where we came
*/ 
router.post('/save/:filename', function(req, res){
   fs.writeFile(`./uploads/${req.params.filename}`, req.body.data , function(err){
    res.redirect("back")
   })
  })

router.get('/filecreate',function(req,res){
  fs.writeFile(`./uploads/${req.query.createfile}`,'',function(err){
    res.redirect('/');
  })
});

router.get('/foldercreate',function(req,res){
  fs.mkdir(`./uploads/${req.query.createfolder}`,function(err){
    res.redirect('/');
  })
});

router.get('/delete/:name',function(req,res){
  fs.unlink(`./uploads/${req.params.name}`,function(err){
    res.redirect('/');
  })
})
module.exports = router;
