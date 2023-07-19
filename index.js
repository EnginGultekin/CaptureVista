import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import methodOverride from "method-override";
import ejs from 'ejs'; //view engine
import photoController from './controllers/photoController.js';
import pageController from './controllers/pageController.js';


const app = express();
dotenv.config();

//Template Engine
app.set("view engine", "ejs");

// Middlewares 
app.use(express.static('public')) // We chose the folder where we will put the static files 
app.use(express.urlencoded({ extended: true }))  // Body parser 
app.use(express.json())
app.use(fileUpload())
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}))

// Routes
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);


const port = 3000;
app.listen(port, () => {
    //console.log(`Server started on port ${port}...`);
    mongoose.connect(process.env.DB_CONNECTION_STRING)
        .then(() => console.log('Connnected DB'))
        .catch((error) => console.log(error));
});
