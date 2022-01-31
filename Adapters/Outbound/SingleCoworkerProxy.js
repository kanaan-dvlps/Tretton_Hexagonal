const { FindEntityById } = require('../../Repository/DAO');

const SingleCoworkerProxy = async (id) => {
  try {
    
    const result = await FindEntityById(id);
    return result;

  } catch (error) {

    return {
      error: error.message,
      status: 500
    };

  }
};

module.exports = {
  SingleCoworkerProxy
};