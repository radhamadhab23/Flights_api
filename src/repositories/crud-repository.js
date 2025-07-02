const {logger}= require('../config/logger-config');
class crudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const result = await this.model.create(data);
      return result;
    } catch (error) {
      logger.error(`Error in create: ${error.message}`);
      throw error;
    }
  }
  async update(id, data) {
    try {
      const response = await this.model.update(data, { where: { id: id } });
      return response;
    } catch (error) {
      logger.error(`Error in update: ${error.message}`);
      throw error;
    }
  }

  async destroy(data) {
    try {
      const response= await this.model.destroy({ where: { id:data } });
      return response;
    } catch (error) {
      logger.error(`Error in destroy: ${error.message}`);
      throw error;
    }
  }
  async get(data) {
    try {
      const response = await this.model.findByPk(data);
      return response;
    } catch (error) {
      logger.error(`Error in get: ${error.message}`);
      throw error;
    }
  }
    async getAll() {
        try {
        const response = await this.model.findAll();
        return response;
        } catch (error) {
        logger.error(`Error in getAll: ${error.message}`);
        throw error;
        }
    }

}
module.exports=crudRepository