const Coworker = require('../Models/Coworkers');

const GetEntitiesCount = async () => {
  try {

    const count = await Coworker.find().count().lean();
    return count;

  } catch (error) {

    return {
      error: error.message,
      status: 500
    };

  }
};

const FindEntities = async () => {
  try {

    const entities = await Coworker.find().lean();
    return entities;

  } catch (error) {

    return {
      error: error.message,
      status: 500
    };

  }
}

const FindEntityById = async (id) => {
  try {

    const entity = await Coworker.find({ _id: id }).lean();
    return entity;

  } catch (error) {

    return {
      error: error.message,
      status: 500
    };

  }
};

const AddEntity = async (Entity) => {
  try {

    const newEntity = await new Coworker(Entity);
    const savedEntity = await newEntity.save();
    return savedEntity;

  } catch (error) {

    return {
      error: error.message,
      status: 500
    };

  }
};

const AddEntities = async (EntityArray) => {
  try {

    const newEntities = await Coworker.insertMany(EntityArray);
    return newEntities;

  } catch (error) {

    return {
      error: error.message,
      status: 500
    };

  }
};

const UpdateEntityById = async (Data) => {
  try {
    const { name, city, text, id } = Data;
    const updatedModel = await Coworker.findOneAndUpdate({ _id: id }, {
      $set: {
        name: name,
        city: city,
        text: text
      },
    },
      {
        new: true
      });

    return updatedModel;

  } catch (error) {

    return {
      error: error.message,
      status: 500
    };

  }
};

const FilteredData = async (filter, SKIP, LIMIT) => {
  try {

    const FilteredEntities = await Coworker.find({
      $or: [
        { name: { $regex: new RegExp("^" + filter, "i") } },
        { country: { $regex: new RegExp("^" + filter, "i") } },
        { city: { $regex: new RegExp("^" + filter, "i") } }
      ]
    }).skip(SKIP).limit(LIMIT).lean();

    return FilteredEntities;

  } catch (error) {

    return {
      error: error.message,
      status: 500
    };

  }
}

module.exports = {
  GetEntitiesCount,
  FindEntities,
  FindEntityById,
  AddEntity,
  AddEntities,
  UpdateEntityById,
  FilteredData,
}