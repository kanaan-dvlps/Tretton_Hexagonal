const { AddEntities, GetEntitiesCount, FindEntities, FilteredData } = require('../../Repository/DAO');

const HandleCoworkersInsertion = async (EntityArray) => {
  try {
    const hasEntities = await FindEntities();
    const count = await GetEntitiesCount();
console.log(count);
    if (EntityArray.length > count) {
      const result = await AddEntities(EntityArray);
      console.log(1);
      return {
        data: result,
        totalLength: count
      };
    } else if (hasEntities.length == 0) {
      const result = await AddEntities(EntityArray);
      console.log(2);
      return {
        data: result,
        totalLength: count
      };
    } else if (hasEntities.length > 0) {
      console.log(3);
      return {
        data: hasEntities,
        totalLength: count
      };
    }

  } catch (error) {

    return {
      error: error,
      status: 500
    };

  }
}

module.exports = HandleCoworkersInsertion;