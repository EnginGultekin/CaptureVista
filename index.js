import express from "express";
import ejs from 'ejs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

//Template Engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.static('public'))

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

const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});
