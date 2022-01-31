const { HandleRetrivingCache } = require('../Adapters/Outbound/CacheRetrivingProxy');

const RetriveCachePort = async (KEY) => {
  try {
    
    const result = await HandleRetrivingCache(KEY);
    return result;

  } catch (error) {
    
    return {
      error: error.message,
      code: 500
    };

  }
}

module.exports = { RetriveCachePort };