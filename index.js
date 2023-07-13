import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome Photo App');
})

const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});
