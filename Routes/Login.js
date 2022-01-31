const router = require('express').Router();
const Joi = require('joi');
const Token = require('../Helpers/Token');

router.post('/login', async (req, res, next) => {
  try {
    const { username } = req.body;
    const validateBody = Joi.object().keys({ username: Joi.string().required() });

    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
      res.status(406).send({
        error: `Body can't be empty`,
        code: 406
      });
    } else if (validateBody.validate(req.body).error !== undefined || null) {
      res.status(400).json({
        error: validateBody.validate(req.body).error.message,
        code: 400
      });
    } else {
      const token = await Token(username);
      res.status(200).send(token);
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      code: 500
    });
  }
});

module.exports = router;