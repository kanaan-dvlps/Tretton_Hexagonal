const { GetCoworker } = require('../DomainLogic/CoworkersDomain');

const GetCoworkerPort = async (id) => {
  try {
    
    const result = await GetCoworker(id);
    return result;

  } catch (error) {
    
    return {
      error: error.message,
      status: 500
    };

  }
};

module.exports = GetCoworkerPort;