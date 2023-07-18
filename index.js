import express from "express";
import dotenv from 'dotenv'
import Photo from "./models/Photo.js";
import ejs from 'ejs'; //view engine
import mongoose from "mongoose";

const app = express();
dotenv.config();

mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(() => console.log('Connnected DB'))
    .catch((error) => console.log(error));

//Template Engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.static('public')) // We chose the folder where we will put the static files
app.use(express.urlencoded({ extended: true }))  // Body parser
app.use(express.json())

// Routes
app.get('/', async (req, res) => {
    const photos = await Photo.find({});
    res.render("index", {
        photos,
    });
})

app.get('/about', (req, res) => {
    res.render("about");
})

app.get('/add', (req, res) => {
    res.render("add");
})

app.get('/photos/:id', async (req, res) => {
    const photo = await Photo.findById({ _id: req.params.id })
    res.render("photo", { photo });
})

app.post('/create_photo', async (req, res) => {
    await Photo.create(req.body);
    res.redirect('/');
})

const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});
