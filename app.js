const express = require('express');
const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/cars");

const carRouter = require('./routes/car.router')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/cars", carRouter);

app.use("*", (req, res) => {
    res.status(404).json("Route not found");
});

app.use((err,req,res,next)=>{
    res.status(err.status||500).json({
        error:err.message || "Unknown Error",
        code:err.status || 500,
    })
})

app.listen(5000, () => {
    console.log("Server listen 5000");
});
