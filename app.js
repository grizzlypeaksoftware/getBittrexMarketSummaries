const express = require("express");
const app = express();

app.engine('pug', require('pug').__express)
app.set('views', __dirname + '/views');
app.set("view engine", 'pug');

const appModel = require("./models/appModel.js");
appModel.InitEvents();

app.get('/',function(req, res){        
    appModel.GetMarketSummaries(req,res);   
});

app.listen(1974, () => console.log('app listening'));
