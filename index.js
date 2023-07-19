import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import Photo from "./models/Photo.js";
import fileUpload from "express-fileupload";
import methodOverride from "method-override";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ejs from 'ejs'; //view engine
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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
app.use(fileUpload())
app.use(methodOverride('_method', 'POST', 'GET'))

// Routes
app.get('/', async (req, res) => {
    const photos = await Photo.find({}).sort('-dateCreated');
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

    const uploadDir = 'public/uploads';
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    const uploadImage = req.files.image;
    const uploadPath = __dirname + '/public/uploads/' + uploadImage.name;

    uploadImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadImage.name,
        })
    });
    res.redirect('/');
})

app.get('/photos/edit/:id', async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    res.render('edit', { photo })
})

app.put('/photos/:id', async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id })
    photo.title = req.body.title;
    photo.description = req.body.description;
    photo.save();

    res.redirect(`/photos/${photo._id}`);
})



const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});
