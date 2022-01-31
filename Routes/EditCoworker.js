const router = require('express').Router();
const HandleEditAdapter = require('../Adapters/Inbound/EditCoworkerAdapter');
const Joi = require('joi');

router.put('/coworker/:id', async (req, res) => {
  try {

    const { id } = req.params;
    const { name, city, text } = req.body;

    const validateBody = Joi.object().keys({
      name: Joi.string().required(),
      city: Joi.string().required(),
      text: Joi.string().required(),
    });

    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
      res.status(406).send({
        codeMessage: `Not Acceptable`,
        response: `body can't be empty`
      });
    } else if (validateBody.validate(req.body).error !== undefined || null) {
      res.status(406).json({
        codeMessage: 'Not Acceptable',
        errorMessage: validateBody.validate(req.body).error.message
      });
    } else {
      const result = await HandleEditAdapter({ name, city, text, id });
      res.status(200).send(result);
    }
  } catch (error) {

    return {
      error: error.message,
      status: 500
    };

  }
})

module.exports = router;