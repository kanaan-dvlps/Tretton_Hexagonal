const router = require('express').Router();
const { GetCoworkerAdapter } = require('../Adapters/Inbound/GetCoworkerAdapter');
const ensureAuthenticated = require('../Middleware/Verifier');

router.get('/coworker/:id', ensureAuthenticated, async (req, res) => {

  try {

    const { id } = req.query;
    const coworker = await GetCoworkerAdapter(id);
    if (coworker) {
      res.status(200).send(coworker);
    }

    res.status(404).send(`Coworker not found`);

  } catch (error) {

    return {
      error: error.message,
      status: 500
    };

  }

});

module.exports = router;