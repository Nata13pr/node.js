const express = require('express');

const carRouter = require('./routes/car.router')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/cars", carRouter);

app.use("*", (req, res) => {
    res.status(404).json("Route not found");
});

app.listen(4200, () => {
    console.log("Server listen 4200");
});
