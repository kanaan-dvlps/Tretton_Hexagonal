const GetCoworkerPort = require('../../Ports/GetCoworkerPort');

const GetCoworkerAdapter = async (id) => {
  try {
    
    const result = await GetCoworkerPort(id);
    return result;

  } catch (error) {

    return {
      error: error.message,
      status: 500
    };

  }
};

module.exports = {
  GetCoworkerAdapter
}