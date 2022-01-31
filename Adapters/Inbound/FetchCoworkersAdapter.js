const axios = require('axios');
const FetchCoworkersPort = require('../../Ports/FetchCoworkersPort');

const HandleFetchCoworkers = async (filter, SKIP, LIMIT) => {
  try {
    
    const api = await axios({
      method: 'get',
      url: 'https://tretton37.com/meet',
    });    
    const { data } = api;
    const result = await FetchCoworkersPort(filter, SKIP, LIMIT, data);

    return result;

  } catch (error) {
    
    return {
      error: error,
      status: 500
    };

  }
};

module.exports = HandleFetchCoworkers;