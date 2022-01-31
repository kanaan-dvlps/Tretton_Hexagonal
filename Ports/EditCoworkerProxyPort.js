const { EditCoworkerProxy } = require('../Adapters/Outbound/EditCoworkerProxy');

const EditCoworkerProxyPort = async ({name, city, text, id}) => {
  try {
    
    const result = await EditCoworkerProxy({name, city, text, id});
    return result;

  } catch (error) {
    return {
      error: error.message,
      status: 500
    };
  }
};

module.exports = EditCoworkerProxyPort;