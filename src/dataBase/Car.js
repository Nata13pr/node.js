const { Schema, model } = require( 'mongoose' );

const CarSchema = new Schema(
    {
        brand : {
            type : String,
            required : true,
            trim : true,
        },

        year : {
            type : Number,
            default : 1990,
            required : true
        },
        email : {
            type : String,
            required : true,
            trim : true,
            lowercase : true,
            unique : true,
        },
        password : {
            type : String,
            required : true,
        }
    },
    { timestamps : true }
);

module.exports = model( 'car', CarSchema );