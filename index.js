const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Employee = require("./models/employee");


const app = express();



app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");


mongoose
  .connect("mongodb+srv://Hari:stormshadow@complaint.j59iozo.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"));

app.get("/create", (req, res) => {
  res.render("create");
  // res.send('Hello World');
});

// dashboard
app.get("/", (req, res) => {
    res.render("index")
    // res.send('Hello World');
    });

// create employee

app.post("/createEmployee", (req, res) => {
  
    const employee = new Employee({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
        address: req.body.address,
        salary: req.body.salary,
    });

    employee
      .save()
      .then((result) => {
        res.redirect('/getAllEmployees')
        // res.status(201).json(result);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  
});

// get all employees

app.get("/getAllEmployees", (req, res) => {
    Employee.find()
        .then((result) => {
            res.render("displayAll", { employees: result });
           // res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
});

// get employee by id

app.get("/getEmployeeById/:id", (req, res) => {
    Employee.findById(req.params.id)
        .then((result) => { 
            res.render('displayone', { employee: result })
            // res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
});

// update employee by id

app.post("/updateEmployeeById/:id", (req, res) => {
    Employee.findByIdAndUpdate(req.params.id, req.body)
        .then((result) => {
            res.redirect('/getAllEmployees')
            // res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
});

// delete employee by id

app.post("/deleteEmployeeById/:id", (req, res) => {
    Employee.findByIdAndDelete(req.params.id)
        .then((result) => { 
            res.redirect('/getAllEmployees')
            // res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
});


// check for updates

app.post("/checkForUpdates/:id", (req, res) => {
    Employee.findById(req.params.id)
        .then((result) => {
            console.log(result);
            res.render('update', { employee: result })
            // res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
});


app.listen(3000, () => {
  console.log("Server started on port 3000");
});
