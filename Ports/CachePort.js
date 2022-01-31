const { HandleCaching } = require('../Adapters/Outbound/CacheProxy');

const CachePort = async (KEY, DATA) => {
  try {
    
    const result = await HandleCaching(KEY, DATA);
    return result;

  } catch (error) {
    
    return {
      error: error.message,
      code: 500
    };

  }
};

module.exports = { CachePort };