const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const mongoose = require("mongoose");
const app = express();
// const pdf = require("pdf-lib");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs"); //initilise ejs

app.use(express.static(__dirname + "/public"));
mongoose.connect("mongodb://localhost:27017/volunteersDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const volunteerSchema = {
  name: String,
  portfolio: String,
};

const Volunteer = new mongoose.model("Volunteer", volunteerSchema);

// const volunteer = new Volunteer({
//   name: "kartik mandhan",
//   portfolio: "Technical Championship",
// });
// volunteer.save();
app.get("/", function (req, res) {
  res.render("home");
});
app.post("/", function (req, res) {
  const fullName = _.toLower(req.body.fName + " " + req.body.lName);

  const portfolio = req.body.portfolio;
  Volunteer.findOne({ name: fullName }, function (err, foundVolunteer) {
    if (err) {
      console.log(err);
    } else {
      if (foundVolunteer) {
        if (foundVolunteer.portfolio === portfolio) {
          res.render("success", {
            name: _.startCase(fullName),
          });
        } else {
          const message = "It seems you have selected a wrong portfolio!";
          // res.se
          res.render("failure", {
            message: message,
          });
        }
      } else {
        const message = "We can't find you as a part of the  Mindspark team.";
        res.render("failure", {
          message: message,
        });
      }
    }
  });
});
app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
