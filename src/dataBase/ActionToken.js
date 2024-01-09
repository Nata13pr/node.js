const { schema,model,Schema } = require( 'mongoose' );

const emaiActions = require( '../constants/email.action.enum' );

const ActionTokenSchema = new Schema(
    {
        carId : {
            type : Schema.Types.ObjectId,
            ref : 'car',
            required : true,
        },

        token : {
            type : String,
            required : true,
        },

        actionType : {
            type : String,
            enum : Object.values( emaiActions ),
            required : true,
        },
    },
    { timestamps : true }
);

module.exports = model( 'action_tokens',ActionTokenSchema );