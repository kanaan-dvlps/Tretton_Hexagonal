const { HandleFilterarion } = require('../Adapters/Outbound/CoworkersFilterationProxy');

const DAOFilterationPort = async (filter, SKIP, LIMIT) => {
  try {
    
    const result = await HandleFilterarion(filter, SKIP, LIMIT);
    return result;

  } catch (error) {

    return {
      error: error.message,
      code: 500
    };

  }
};

module.exports = DAOFilterationPort;