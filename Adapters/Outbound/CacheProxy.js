const redis = require('redis');

const client = redis.createClient({
  host: 'tretton_caching',
  url: process.env.REDIS_URI,
  port: process.env.REDIS_PORT,
});

const HandleCaching = async (KEY, DATA) => {
  try {

    await client.connect();
    // * 86400s is equal to 24 hours and each 24 hours the chach will be rfreshed with new data to be updated
    await client.SETEX(KEY, 86400, JSON.stringify(DATA));
    await client.disconnect();

    return {
      response: `Cached Successfully`,
      code: 200
    };

  } catch (error) {

    return {
      error: error.message,
      code: 500
    };

  }
};

module.exports = { HandleCaching };