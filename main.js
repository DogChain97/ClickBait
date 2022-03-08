//mongodb: mongodb+srv://ashwin007:ashwin007@click-bait.s4yny.mongodb.net/clickbait

const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.urlencoded({
  extended: true
}));

const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized: true,
  cookie: {
    maxAge: oneDay
  },
  resave: false
}));

app.use(cookieParser());

var session;

//------------------------------------ mongo db --------------------------------

const mongoose = require('mongoose');

function initialize() {
  mongoose.connect("mongodb+srv://ashwin007:ashwin007@click-bait.s4yny.mongodb.net/clickbait", {
    useNewUrlParser: true
  });

}

const userSchema = new mongoose.Schema({
  name: String,
  mail: String,
  pass: String,
}, {
  versionKey: false
});

const prodSchema = new mongoose.Schema({
  id: String,
  Price: Number,
  quantity: Number,
  desc: String,
  Product_name: String,
  image: String,
  product_type: String
}, {
  versionKey: false
});

const feedSchema = new mongoose.Schema({
  Feedback: String,
  Given_from: String
}, {
  versionKey: false
});

const orderSchema = new mongoose.Schema({
  mail: String,
  desc: String,
  product_name: String,
  image: String
}, {
  versionKey: false
});

function udSchema() {
  return mongoose.model("user_details", userSchema, "user_details");
}

function pSchema() {
  return mongoose.model("products", prodSchema, "products");
}

function fSchema() {
  return mongoose.model("user_feedback", feedSchema, "user_feedback");
}

function oSchema() {
  return mongoose.model("order_details", orderSchema, "order_details");
}

// function genRetrieve(category) {
//   const products = pSchema();
//
//   var images = [];
//   var names = [];
//   var price = [];
//   var details = [];
//
//   products.find({
//     product_type: category
//   }, function(err, dets) {
//     if (err) {
//       console.log(err);
//     } else {
//       for (i = 0; i < dets.length; i++) {
//         images.push(dets[i].image);
//         names.push(dets[i].Product_name);
//         price.push(dets[i].Price);
//       }
//     }
//     details[0] = new Array(images);
//     details[1] = new Array(names);
//     details[2] = new Array(price);
//     return details;
//   });
// }

//------------------------------------ mongo db --------------------------------

// ------------------------------------login page-------------------------------
app.get("/login", function(req, res) {
  res.render("login", {
    code: 1
  });
});

app.post("/login", function(req, res) {
  var email = req.body.em;
  var password = req.body.pwd;
  console.log(email, password);

  initialize();

  const check = udSchema();

  check.findOne({
    mail: email,
    pass: password
  }, function(err, dets) {
    if (dets == null) {
      res.render("login", {
        code: 0
      });
    } else {
      session = req.session;
      session.email = email;
      session.userid = dets.name;
      res.redirect("/home");
    }
  })


});

app.get("/signup", function(req, res) {
  res.render("signup", {
    code: 1
  });
});

// ------------------------------------login page-------------------------------

// ------------------------------------Signup page-------------------------------

app.get("/signup", function(req, res) {
  res.render("signup", {
    code: 1
  });
});

app.post("/signup", async function(req, res) {
  var fname = req.body.fname;
  var email = req.body.em;
  var password = req.body.pwd;

  if (fname == "" || email == "" || password == "") {
    res.render("signup", {
      code: 0
    });
  } else {
    initialize();

    const userDetails = udSchema();

    const det = new userDetails({
      name: fname,
      mail: email,
      pass: password,
    });

    det.save();
    res.redirect("/login");
  }
});

// ------------------------------------Signup page-------------------------------

// ------------------------------------Nav links-------------------------------

//------------------------------------home page-----------------------------------
app.get("/home", function(req, res) {
  initialize();
  const products = pSchema();

  const images = [];
  const names = [];
  const price = []
  var i;

  products.find(function(err, dets) {
    if (err) {
      console.log(err);
    } else {
      for (i = 0; i < dets.length; i++) {
        if (i % 5 == 0 || i == 21) {
          images.push(dets[i].image);
          names.push(dets[i].Product_name);
          price.push(dets[i].Price);
        }
      }
    }
    res.render("home", {
      im: images,
      nm: names,
      pr: price
    });
  });
});

//---------------------------------------------clothing page---------------------------------------------
app.get("/clothing", function(req, res) {
  initialize();
  const products = pSchema();
  const images = [];
  const names = [];
  const price = []
  var i;
  products.find({
    product_type: "clothing"
  }, function(err, dets) {
    if (err) {
      console.log(err);
    } else {
      for (i = 0; i < dets.length; i++) {
        images.push(dets[i].image);
        names.push(dets[i].Product_name);
        price.push(dets[i].Price);
      }
    }
    res.render("clothing", {
      im: images,
      nm: names,
      pr: price
    });
  });
});

//-----------------------------------------------laptop page--------------------------------------------------
app.get("/laptops", function(req, res) {
  initialize();
  const products = pSchema();
  const images = [];
  const names = [];
  const price = []
  var i;
  products.find({
    product_type: "laptop"
  }, function(err, dets) {
    if (err) {
      console.log(err);
    } else {
      for (i = 0; i < dets.length; i++) {
        images.push(dets[i].image);
        names.push(dets[i].Product_name);
        price.push(dets[i].Price);
      }
    }
    res.render("laptops", {
      im: images,
      nm: names,
      pr: price
    });
  });
});

//-------------------------------------------------mobiles page-----------------------------------------------------
app.get("/mobiles", function(req, res) {
  initialize();
  const products = pSchema();
  const images = [];
  const names = [];
  const price = []
  var i;
  products.find({
    product_type: "mobile"
  }, function(err, dets) {
    if (err) {
      console.log(err);
    } else {
      for (i = 0; i < dets.length; i++) {
        images.push(dets[i].image);
        names.push(dets[i].Product_name);
        price.push(dets[i].Price);
      }
    }
    res.render("mobiles", {
      im: images,
      nm: names,
      pr: price
    });
  });
});

//-------------------------------------------------shoes page-----------------------------------------------------
app.get("/shoes", function(req, res) {
  initialize();
  const products = pSchema();
  const images = [];
  const names = [];
  const price = []
  var i;
  products.find({
    product_type: "shoes"
  }, function(err, dets) {
    if (err) {
      console.log(err);
    } else {
      for (i = 0; i < dets.length; i++) {
        images.push(dets[i].image);
        names.push(dets[i].Product_name);
        price.push(dets[i].Price);
      }
    }
    res.render("shoes", {
      im: images,
      nm: names,
      pr: price
    });
  });
});

//-------------------------------------------------watches page-----------------------------------------------------
app.get("/watches", function(req, res) {
  initialize();
  const products = pSchema();
  const images = [];
  const names = [];
  const price = [];
  var i;
  products.find({
    product_type: "watch"
  }, function(err, dets) {
    if (err) {
      console.log(err);
    } else {
      for (i = 0; i < dets.length; i++) {
        images.push(dets[i].image);
        names.push(dets[i].Product_name);
        price.push(dets[i].Price);
      }
    }
    res.render("watches", {
      im: images,
      nm: names,
      pr: price
    });
  });
});

//-------------------------------------------------contact page-----------------------------------------------------
app.get("/contact", function(req, res) {
  res.render("contact", {
    code: 1
  });
});

app.post("/contact", function(req, res) {
  var feed = req.body.fb;

  initialize();

  const fback = fSchema();

  const feedback = new fback({
    Feedback: feed,
    Given_from: session.email,
  });

  feedback.save();
  res.render("contact", {
    code: 0
  });
});

//-------------------------------------------------about page-----------------------------------------------------
app.get("/about", function(req, res) {
  res.render("about");
});

//-------------------------------------------------orders page-----------------------------------------------------
app.get("/orders", function(req, res) {

  initialize();
  const orders = oSchema();

  const images = [];
  const names = [];

  orders.find({
    mail: session.email
  }, function(err, ords) {
    if (err) {
      console.log(err);
    } else {
      if (ords.length == 0) {
        res.render("orders", {
          name: session.userid,
          quant: "no"
        });
      } else {
        for (var i = 0; i < ords.length; i++) {
          images.push(ords[i].image);
          names.push(ords[i].product_name);
        }
        res.render("orders", {
          name: session.userid,
          quant: ords.length,
          im: images,
          nm: names
        });
      }
    }
  });
});

//-------------------------------------------------tnc page-----------------------------------------------------
app.get("/tnc", function(req, res) {
  res.render("tnc");
});

//-------------------------------------------------product page-----------------------------------------------------

app.get("/product/:id", function(req, res) {
  var prodId = req.params.id;
  session = req.session;
  session.pid = prodId;
  var image = "";
  var name = "";
  var price = "";
  var desc = "";
  var qty = "";

  initialize();
  const product = pSchema();

  product.findOne({
    id: prodId
  }, function(err, dets) {
    if (err) {
      console.log(err);
    } else {
      image = dets.image;
      name = dets.Product_name;
      price = dets.Price;
      desc = dets.desc;
      qty = dets.quantity;

      res.render("product", {
        im: image,
        nm: name,
        pr: price,
        dc: desc,
        qt: qty
      });
    }
  });
});

//-------------------------------------------------payment page-----------------------------------------------------
app.get("/payment", function(req, res) {
  res.render("payment");
});

//payment successful
app.get("/payment/successful", function(req, res) {
  session = req.session;
  initialize();
  const product = pSchema();
  var qty = 0;

  product.findOne({ //to get value of quantity for update
    id: session.pid
  }, function(err, dets) {
    if (err) {
      console.log(err);
    } else {
      qty = dets.quantity;
      qty = qty - 1;

      product.updateOne({ //to update quantity
        id: session.pid
      }, {
        quantity: qty
      }, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("No errors");
        }
      });

      const orders = oSchema();
      const order = new orders({
        mail: session.email,
        desc: dets.desc,
        product_name: dets.Product_name,
        image: dets.image
      });
      order.save();
    }
  });

  res.render("successful", {
    id: session.pid
  });
});

//payment fail
app.get("/payment/failed", function(req, res) {
  session = req.session;
  res.render("failed", {
    id: session.pid
  });
});

//-------------------------------------------------logout-----------------------------------------------------
app.get("/logout", function(req, res) {
  req.session.destroy();
  res.redirect("/login");
});

// ------------------------------------Nav links-------------------------------

app.listen(3000, function() {
  console.log("Server is running on port 3000.")
});
