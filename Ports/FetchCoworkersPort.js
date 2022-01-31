const { GetCoworkers } = require('../DomainLogic/CoworkersDomain');

const FetchCoworkersPort = async (filter, SKIP, LIMIT, data) => {
  try {
    
    const result = await GetCoworkers(filter, SKIP, LIMIT, data);
    return result;

  } catch (error) {

    return {
      error: error.message,
      status: 500
    };

  }
}

module.exports = FetchCoworkersPort;