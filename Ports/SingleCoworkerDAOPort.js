const { SingleCoworkerProxy } = require('../Adapters/Outbound/SingleCoworkerProxy');

const SingleCoworkerPort = async (id) => {
  try {
    
    const result = await SingleCoworkerProxy(id);
    return result;

  } catch (error) {
    
    return {
      error: error.message,
      status: 500
    };

  }
};

module.exports = SingleCoworkerPort;