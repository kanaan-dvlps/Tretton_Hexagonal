const CoworkersProxy = require('../Adapters/Outbound/CoworkersProxy');

const CoworkersPort = async (EntityArray) => {
  try {

    const result = await CoworkersProxy(EntityArray);
    return result;

  } catch (error) {

    return {
      error: error.message,
      status: 500
    };

  }
}

module.exports = CoworkersPort;