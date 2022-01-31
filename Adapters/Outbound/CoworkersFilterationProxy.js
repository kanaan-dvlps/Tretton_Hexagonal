const { FilteredData, GetEntitiesCount } = require('../../Repository/DAO');

const HandleFilterarion = async (filter, SKIP, LIMIT) => {
  try {
    
    if (filter) {
      
      const result = await FilteredData(filter, SKIP, LIMIT);
      return result;

    };

    return {
      error: `CONSTRAINT: This function only handles filterations`,
      code: 406
    };

  } catch (error) {
    
    return {
      error: error.message,
      code: 500
    };

  }
};

module.exports = { HandleFilterarion }