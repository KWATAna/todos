"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ListMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1}, { unique: true });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async get(awid, id) {
    let filter = {
      awid: awid,
      _id: id,
    };
    return await super.findOne(filter);
  }

  async update(uuObject) {
    let filter = {
      awid: uuObject.awid,
      _id: uuObject.id,
    };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }
  async delete(uuObject) {
    let filter = {
      awid: uuObject.awid,
      _id: uuObject.id,
    };
    return await super.deleteOne(filter);
  }

  async list(awid){
    let filter = {
      awid: awid
    }
    return await super.find(filter)
  }

 
}

module.exports = ListMongo;