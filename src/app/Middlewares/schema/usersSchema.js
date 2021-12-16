const { celebrate, Segments, Joi } = require("celebrate");

module.exports = {

  signIn: celebrate({
    [Segments.BODY]: Joi.object().keys({
      form_email: Joi.string().email().required(),
      form_password: Joi.string().required()
    })
  }),

  signUp: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      image: Joi.string(),
      phone: Joi.number(),
      province: Joi.string(),
      password: Joi.string().required(),
    })
  }),
  
  Delete: celebrate({
    [Segments.HEADERS]: Joi.object().keys({
      id: Joi.number().required(),
      authorization: Joi.string().required()
    })
  })
}
