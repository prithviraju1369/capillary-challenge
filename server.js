var express = require('express');
var path=require('path');
var app = express();
var router=express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


mongoose.connect('mongodb://prithviraju1369:prithviraju1369@ds135690.mlab.com:35690/capillary');


app.use(express.static(path.join(__dirname, './dist')));

app.use(bodyParser.urlencoded({ extended: false }));
 
app.use(bodyParser.json());

//schema
var GamesSchema= mongoose.Schema({
   title:{
       type:String,
       required:true
   },
   platform:{
       type:String,
       required:true
   },
   score:{
       type:Number,
       required:true
   },
   genre:{
       type:String,
       required:true
   },
   editors_choice:{
       type:String,
       required:true
   }
   
});

 var Games=mongoose.model('Games', GamesSchema);  


app.get('/games',function(req,res){
    var searchTerm=req.query.val;
    var par={};
    if(searchTerm){
        searchGames(searchTerm,res);
    }else{
        allGames(res);
    }
    
});

function allGames(callback){
    Games.find({},function(err,docs){
       if(err){
           console.log(err);
       }
       callback.send(docs);
   });
}

function searchGames(text,callback){
    var regexValue='\.*'+text+'\.*';
    Games.find({title:new RegExp(regexValue, 'i')},function(err,docs){
       if(err){
           console.log(err);
       }
       callback.send(docs);
   });
}

/// app runs in port
app.listen(process.env.PORT || 3000,function(){
    console.log('listening at 3000');
})
