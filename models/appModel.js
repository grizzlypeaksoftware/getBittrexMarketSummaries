const events = require("events");
const eventEmitter = new events();
var https = require("https");
var AppModel = function(){};

AppModel.prototype.InitEvents = function(){
    eventEmitter.on("MarketSummariesObtained", function(data, res){        
        for(var i = 0; i< data.result.length; i++){
            var last = data.result[i].Last;
            var prev = data.result[i].PrevDay;

            var percentChange = ((last - prev) / prev) * 100;
            data.result[i].PercentChange = percentChange;
        }
        res.render("test", data);
    });
};

AppModel.prototype.GetMarketSummaries = function(req,res){
    const url = "https://bittrex.com/api/v1.1/public/getmarketsummaries";
    https.get(url, response => {        
        response.setEncoding("utf8");
        let body = "";
        response.on("data", data => {
            body += data;
        });
        response.on("end", () => {
            body = JSON.parse(body);            
            eventEmitter.emit("MarketSummariesObtained", body, res);
            //console.log(body);
        });
    });
};


module.exports = new AppModel();