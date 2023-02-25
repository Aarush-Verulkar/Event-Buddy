const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/customerDB", { useNewUrlParser: true })


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));


var eN;
var vII;
var vPP;
var vAA;
/*************GET Req ******************/
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
  });
  
  app.get("/login.html", function (req, res) {
    res.sendFile(__dirname + "/login.html");
  });
  
  app.get("/signup.html", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
  });

  app.get("/customer", function (req, res) {
    res.sendFile(__dirname + "/customer.html");
  });
  
  app.get("/eventmanager", function (req, res) {
    res.sendFile(__dirname + "/eventmanager.html");
  });
  

  app.get("/registeredEventManager", function (req, res) {
    res.sendFile(__dirname + "/registeredEventManager.html");
  });
  
  app.get("/signupCustomer", function (req, res) {
    res.sendFile(__dirname + "/signupCustomer.html");
  });
  
  app.get("/signupEventManager", function (req, res) {
    res.sendFile(__dirname + "/signupEventManager.html");
  });

  app.get("/about", function (req, res) {     /***** Added By Aarush ******/
    res.sendFile(__dirname + "/about.html");
  });

  app.get("/payment", function (req, res) {     /***** Added By Aarush ******/
    res.sendFile(__dirname + "/payment.html");
  });

 

/************************POST REQ***********************/

app.post("/signup", function(req, res){
    var btns = req.body.btn;
    var namesss = req.body.namesss;
    
    if(btns==="1"){
        res.sendFile(__dirname + "/signupCustomer.html");
    }

    if(btns==="2"){
        res.sendFile(__dirname + "/signupEventManager.html");
    }
})

app.post("/registeredEventManager", function(req, res){
    res.sendFile(__dirname + "/registeredEventManager.html");
    
})

app.post("/login", function(req, res){
  let btns = req.body.btn;
  if (btns === "cust") {
    Customer.find({}, function(err, foundCustomer){
      foundCustomer.forEach(customer => {
         if (customer.name === req.body.usrname && customer.password === req.body.password) {
           console.log(customer);
           res.redirect("/customerPage")
         } else
         {
           
         }
      });
    });
  }

  if (btns === "events") {

    EventManager.find({name: req.body.usrname}, function(err, foundEventManager){
      foundEventManager.forEach(eventManager => {
        
         if (eventManager.name === req.body.usrname && eventManager.password === req.body.password) {
           console.log(eventManager);
           res.render("eventManagerPage", {foundEventManager: eventManager.name, vI:eventManager.venuInfo, vP:eventManager.venuPricing, vA:eventManager.venuAdd, contact:eventManager.contactNo, email:eventManager.email});
         } 
      });
    });
  }

  
})



/************************DATABASE-WORK**************************/

const customerSchema = new mongoose.Schema({
    name: String,
    contactNo: Number,
    password: String
});

const Customer = mongoose.model("customer", customerSchema);

app.post("/customer", function(req,res){
  const newName = req.body.names;
  const contactNo = req.body.contactNo;
  const passkey = req.body.password
  
  
  const user = new Customer ({
    name: newName,
    contactNo: contactNo,
    password: passkey
  })
  user.save();
  console.log(newName);
  res.redirect("/customerPage");
})


/******************EVENT-MANAGER-DATABASE*****************************/

const eventManagerSchema = new mongoose.Schema({
  name: String,
  contactNo: Number,
  address: String,  // added by aarush
  password: String,
  venuPricing:String,
  venuInfo: String,
  venuAdd:String,
  email:String,
  img:
  {
      data: Buffer,
      contentType: String
  }
});
const EventManager = mongoose.model("eventManager", eventManagerSchema);

app.post("/eventManager", function(req,res){
const eventManName = req.body.names;
const contactNo = req.body.contactNo;
const address = req.body.address    // added by aarush 
const passkey = req.body.password
const vI = req.body.venuInfo;
const vP = req.body.vP;
const vA = req.body.vA;
const email = req.body.email;

eN = eventManName;
vII = req.body.vI;
vPP = req.body.vP;
vAA = req.body.vAA;

const eventUser = new EventManager ({
  name: eventManName,
  contactNo: contactNo,
  address: address,
  password: passkey,
  venuInfo: vI,
  venuPricing: vP,
  venuAdd: vA,
  email: email,

})


eventUser.save();
console.log(eventManName);
res.render("eventManagerPage", {foundEventManager: eventManName, vI:vI, vP:vP, vA:vA, email:email, contact:contactNo});
})




/***************************Customer Page*****************************************/

app.get("/customerPage", function(req,res){
  
  EventManager.find({}, function(err, foundEventManager){
    if(err){
      console.log(err);
    }else{
      Customer.find({}, function(err, foundCustomer){
        res.render("customerPage", {foundEventManager: foundEventManager, foundCustomer: foundCustomer});
     });
    
    }
 });
})

app.get("/errorPage", function(req,res){
  res.render("errorPage");
})

/**************EVENT MANAGER ********************************/

app.get("/eventManagerPage", function(req,res){
  console.log(eN);

})




  /****************END***********************/
  app.listen(3000, function () {
    console.log("server running on port 3000");
  });