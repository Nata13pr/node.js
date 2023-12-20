const express = require( 'express' );
const mongoose = require( 'mongoose' );

const { MONGO_URL,PORT } = require( './configs/configs.js' );
const authRouter = require( './routes/auth.router' );
const carRouter = require( './routes/car.router' );

mongoose.connect( MONGO_URL );

const app = express();

app.use( express.json() );
app.use( express.urlencoded( { extended : true } ) );

app.use( '/auth', authRouter );
app.use( '/cars', carRouter );


app.use( '*', ( req, res ) => {
    res.status( 404 ).json( 'Route not found' );
} );

app.use( ( err,req,res ) => {
    res.status( err.status || 500 ).json( {
        error : err.message || 'Unknown Error',
        code : err.status || 500,
    } );
} );

app.listen( PORT, () => {
    console.log( 'Server listen 5000' );
} );
