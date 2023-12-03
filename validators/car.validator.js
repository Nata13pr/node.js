const Joi=require('joi');

module.exports={
    newCarValidator:Joi.object({
        brand: Joi.string().alphanum().min(2).max(100).required(),
        year:Joi.number().integer().min(1980).max(2023),
    })
}
