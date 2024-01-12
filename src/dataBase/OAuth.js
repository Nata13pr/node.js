const { Schema, model } = require( 'mongoose' );

const OAuthSchema = new Schema(
       {
              carId : {
                     type : Schema.Types.ObjectId,
                     ref : 'car',
                     required : true,
              },

              access_token : {
                     type : String,
                     required : true,
              },

              refresh_token : {
                     type : String,
                     required : true,
              },
       },
       { times : true }
);

module.exports = model( 'oauth', OAuthSchema );
