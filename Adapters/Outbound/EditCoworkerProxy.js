const { UpdateEntityById } = require('../../Repository/DAO');

const EditCoworkerProxy = async ({name, city, text, id}) => {
  try {
    
    const result = await UpdateEntityById({name, city, text, id});
    return result;

  } catch (error) {
    
    return {
      error: error.message,
      status: 500
    };

  }
};

module.exports = { EditCoworkerProxy };