const redis = require('redis');

const client = redis.createClient({
  host: 'tretton_caching',
  url: process.env.REDIS_URI,
  port: process.env.REDIS_PORT,
});

const { GetEntitiesCount } = require('../../Repository/DAO');

const HandleRetrivingCache = async (KEY) => {
  try {

    await client.connect();
    const hasCache = await client.GET(KEY);
    const count = await GetEntitiesCount();
    console.log(count);
    await client.disconnect();

    if (hasCache) {
      return {
        data: JSON.parse(hasCache),
        totalLength: count
      };
    }

    return null;

  } catch (error) {

    return {
      error: error.message,
      code: 500
    };

  }
};

module.exports = { HandleRetrivingCache };