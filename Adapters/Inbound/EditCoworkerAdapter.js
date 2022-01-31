const HandleEditPort = require('../../Ports/EditCoworkerPort');

const HandleEditAdapter = async ({name, city, text, id}) => {
  try {
    
    const result = await HandleEditPort({name, city, text, id});
    return result;

  } catch (error) {
    
    return {
      error: error.message,
      status: 500
    };

  }
};

module.exports = HandleEditAdapter;