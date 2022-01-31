const { GetCoworkersProxy } = require('../Adapters/Outbound/GetCoworkersProxy');

const GetCoworkersPort = async () => {
  try {
    
    const result = await GetCoworkersProxy();
    return result;

  } catch (error) {
    
    return {
      error: error.message,
      status: 500
    };

  }
};

module.exports = GetCoworkersPort;