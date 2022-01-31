const { FindEntities } = require('../../Repository/DAO');

const GetCoworkersProxy = async () => {
  try {
    
    const result = await FindEntities();
    return result;

  } catch (error) {

    return {
      error: error.message,
      status: 500
    };

  }
};

module.exports = {
  GetCoworkersProxy
}