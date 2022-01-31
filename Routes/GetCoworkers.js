const router = require('express').Router();
const FetchCoworkersAdapter = require('../Adapters/Inbound/FetchCoworkersAdapter');

router.get('/coworkers', async (req, res) => {
  try {
    const { start, end, filter } = req.query;
    let SKIP = Number(start);
    let LIMIT = Number(end);

    const result = await FetchCoworkersAdapter(filter, SKIP, LIMIT);
    res.status(200).send(result);

  } catch (error) {
    
    res.status(500).send({
      error: error.message,
      code: 500
    });

  }
});

module.exports = router;