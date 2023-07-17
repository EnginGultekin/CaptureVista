import express from "express";
import ejs from 'ejs'; //view engine

const app = express();

//Template Engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.static('public')) // We chose the folder where we will put the static files
app.use(express.urlencoded({extended:true}))  // Body parser
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.render("index");
})

app.get('/about', (req, res) => {
    res.render("about");
})

app.get('/add_post', (req, res) => {
    res.render("add_post");
})

app.post('/photos', (req, res) => {
    console.log(req.body);
    res.redirect('/');
})

const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});
