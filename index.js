import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Middlewares
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'temp/index.html'));
})

const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});
