const { EditCoworker } = require('../DomainLogic/CoworkersDomain');

const HandleEditPort = async ({name, city, text, id}) => {
  try {
    
    const result = await EditCoworker({name, city, text, id});
    return result

  } catch (error) {

    return {
      error: error.message,
      status: 500
    };

  }
};

module.exports = HandleEditPort;