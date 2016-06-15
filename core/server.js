var os = require('os');
var express = require('express');
var path = require('path');
var bodyParser  = require('body-parser');
var fs = require("fs-extra");


app = express();
var http = require('http').Server(app);

app.use(express.static(process.cwd() + '/public'));
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ limit: '50mb' }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, uid");
  next();
});

var port = process.env.PORT || 1411;
app.set('port', port);

app.locals.name = 'SmartAlarm';

var controllers = { },controllers_path = process.cwd() + '/controllers';
console.log("loading controllers")

fs.readdirSync(controllers_path).forEach(function (file) 
{
    if (file.indexOf('.js') != -1) 
    {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file);
        console.log(file);
    }
});

process.on("uncaughtException", function(err) 
{
  console.log({data:'uncaughtException', error: err.stack}); 
});

http.listen(app.get('port'), function() 
{
  console.log(app.locals.name+' server running...');
  console.log('Port: '+ app.get('port'));
  console.log(new Date());
});

global.authenticating_user=function(req,res,next){
    var r = {msg:[],status:0};
    var uid = req.headers.uid;

    if (typeof (uid) !== 'string'){
        r.msg.push('headers not found',uid)
        return res.status(404).json(r);
    }
    User.get_user(uid,function(result){
        if (!result.status){
            r.msg.push('user not found')
            return res.status(404).json(r);
        }
        req.user = result.user;
        console.log("auth complete")
        next();
    })
}

app.get('/', function(req,res,next){ });


//users
app.post('/users/update_user', controllers.user_controller.update_user); 
//app.post('/users/get_user', controllers.user_controller.get_user); 




app.get('/*', function(req, res) 
{
    //console.log({data:'page not found', url: req.url});
    res.json({msg:['page not allowed '+app.locals.name]});
});
