"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/list-error.js");

const WARNINGS = {
  unsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },
  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`,
  },
  listDoesNotExist: {
    code: `${Errors.Delete.UC_CODE}listDoesNotExist`,
  },
};

class ListAbl {

  constructor() {
    this.validator = Validator.load();
    this.listDao = DaoFactory.getDao("list");
    this.mainDao = DaoFactory.getDao("todosMain")
    this.itemDao = DaoFactory.getDao("item")

  }

  async list(uri, dtoIn, session, uuAppErrorMap = {}, dtoOut = {}) {
    const awid = uri.getAwid()
    // HDS 1 Validation of dtoIn.
    let validationResult = this.validator.validate("listListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );
    if(!dtoIn.pageInfo){
      dtoIn.pageInfo = {}
    }
    if(!dtoIn.pageInfo.pageIndex){
      dtoIn.pageInfo.pageIndex = 0
    }
    if(!dtoIn.pageInfo.pageSize){
      dtoIn.pageInfo.pageSize = 1000
    }


    // HDS 2 System checks existence and state of the todoInstance uuObject.

    const uuTodosMain = await this.mainDao.getByAwid(awid)

    if (!uuTodosMain) {
      throw new Errors.Delete.TodoInstanceDoesNotExist({uuAppErrorMap}, {awid})
    }

    if (uuTodosMain.state !== 'active') {
      throw new Errors.Delete.TodoInstanceIsNotInProperState({uuAppErrorMap}, {expectedState: "active", awid, currentState: uuTodosMain.state })
    }


    // HDS 3 System lists basic attributes of all uuObject list from the uuAppObjectStore (using list DAO list) and saves them in dtoOut.itemList.


    dtoOut.itemList = await this.listDao.list(awid)




    // HDS 4 Returns properly filled dtoOut.
    return {
      ...dtoOut,
      ...dtoIn,
      uuAppErrorMap
    }



  }

  async delete(uri, dtoIn, session, uuAppErrorMap = {}) {
    const awid = uri.getAwid()

    // HDS 1 Validation of dtoIn.
    let validationResult = this.validator.validate("listDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );
    if(!dtoIn.forceDelete){
      dtoIn.forceDelete = false
    }



    // HDS 2 System checks existence and state of the todoInstance uuObject.

    const uuTodosMain = await this.mainDao.getByAwid(awid)

    if (!uuTodosMain) {
      throw new Errors.Delete.TodoInstanceDoesNotExist({uuAppErrorMap}, {awid})
    }

    if (uuTodosMain.state !== 'active') {
      throw new Errors.Delete.TodoInstanceIsNotInProperState({uuAppErrorMap}, {expectedState: "active", awid, currentState: uuTodosMain.state })
    }


    // HDS 3 System gets the uuObject list from the uuAppObjectStore and checks its existence (using list DAO get with awid and dtoIn.id).

    let uuObject = await this.listDao.get(awid, dtoIn.id)
    if(!uuObject){
      ValidationHelper.addWarning(uuAppErrorMap, WARNINGS.listDoesNotExist, {id: dtoIn.id})
    }



    // HDS 4 System loads all active items related to the list (using item DAO listByListAndState, where listId = dtoIn.id and state = active) and verifies that count of active items in the list is 0.
    let inForItem = {...dtoIn, awid, listId:dtoIn.id, state: "active"}
    let uuItems = await this.itemDao.listByListIdAndState(inForItem)
    let itemLength = uuItems.itemList.length
    if(!dtoIn.forceDelete){
    if(itemLength>0){
      throw new Errors.Delete.ListContainsActiveItems({uuAppErrorMap}, {id:dtoIn.id, itemList: uuItems.itemList})
    }
  }
  
    
    
    // HDS 5 System deletes all item uuObjects in the list from uuAppObjectStore (using item DAO deleteManyByListId with awid and dtoIn.id).
    let uuDeleteMany = {...dtoIn, awid}
    await this.itemDao.deleteManyByListId(uuDeleteMany)



    // HDS 6 System deletes list from the uuAppObjectStore (using list DAO delete with awid and dtoIn.id).

    let uuDeleteList = {...dtoIn, awid}
    await this.listDao.delete(uuDeleteList)

    // HDS 7 Returns properly filled dtoOut.
    return {
      uuAppErrorMap
    }
    
  }

  async update(uri, dtoIn, session, uuAppErrorMap = {}) {
    const awid = uri.getAwid()
    
    // HDS-1 Validation of dtoIn.
    let validationResult = this.validator.validate("listUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );


    // HDS-2 System checks existence and state of the todoInstance uuObject.

    const uuTodosMain = await this.mainDao.getByAwid(awid)

    if (!uuTodosMain) {
      throw new Errors.Create.TodoInstanceDoesNotExist({uuAppErrorMap}, {awid})
    }

    if (uuTodosMain.state !== 'active') {
      throw new Errors.Create.TodoInstanceIsNotInProperState({uuAppErrorMap}, {expectedState: "active", awid, currentState: uuTodosMain.state })
    }


    // HDS-3 System verifies that the inserted date is not from the past (it cannot be older than today's date).

    if(dtoIn.deadline){
      const curDate = new Date().getTime()
      const inDate = new Date(dtoIn.deadline).getTime()

      if(curDate>inDate){
        throw new Errors.Update.DeadLineDateIsFromThePast({uuAppErrorMap}, { deadline: dtoIn.deadline })
      }

           
    }

    // HDS-4 Updates uuObject list (using list DAO update).
    let uuObject = {...dtoIn, awid}
    try {
      uuObject = await this.listDao.update(uuObject)
    } catch(e) {
      
      throw new Errors.Update.ListDoesNotExist({uuAppErrorMap}, { "cause": e })
    
    }


    // HDS-5 Returns properly filled dtoOut.



    return {
      ...uuObject,
      uuAppErrorMap
    }

  }

  async get(uri, dtoIn, session, uuAppErrorMap = {} ) {

    const awid = uri.getAwid();

    // HDS 1 Validation of dtoIn.
    let validationResult = this.validator.validate("listGetDtoInType", dtoIn);
    // A1, A2
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );



    // HDS 2 System checks existence and state of the todoInstance uuObject.
    const uuTodosMain = await this.mainDao.getByAwid(awid)

    if (!uuTodosMain) {
      throw new Errors.Get.TodoInstanceDoesNotExist({uuAppErrorMap}, {awid})
    }

    if (uuTodosMain.state !== 'active') {
      throw new Errors.Get.TodoInstanceIsNotInProperState({uuAppErrorMap}, {expectedState: "active", awid, currentState: uuTodosMain.state })
    }



    // HDS 3 System gets uuObject list from uuAppObjectStore (using list DAO get with awid and dtoIn.id).

    const uuObject = await this.listDao.get(awid, dtoIn.id)
    if(!uuObject){
      
      throw new Errors.Get.ListDoesNotExist({uuAppErrorMap}, {id: dtoIn.id})

    }




    // HDS 4 Returns properly filled dtoOut.
    return {
      ...uuObject,
      uuAppErrorMap
    }

    
  }

  async create(uri, dtoIn, session) {
    
    const awid = uri.getAwid();


    // HDS 1  Validation of dtoIn.

    let validationResult = this.validator.validate("listCreateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    // HDS 2 System checks existence and state of the todoInstance uuObject.
    const uuTodosMain = await this.mainDao.getByAwid(awid)

    if (!uuTodosMain) {
      throw new Errors.Create.TodoInstanceDoesNotExist({uuAppErrorMap}, {awid})
    }

    if (uuTodosMain.state !== 'active') {
      throw new Errors.Create.TodoInstanceIsNotInProperState({uuAppErrorMap}, {expectedState: "active", awid, currentState: uuTodosMain.state })
    }
    
    // HDS 3 System verifies that the inserted date is not from the past (it cannot be older than today's date).
    if(dtoIn.deadline){
      const curDate = new Date().getTime()
      const inDate = new Date(dtoIn.deadline).getTime()

      if(curDate>inDate){
        throw new Errors.Create.DeadLineDateIsFromThePast({uuAppErrorMap}, { deadline: dtoIn.deadline })
      }

           
    }


    // HDS 4 System creates uuObject list in uuAppObjectStore (using list DAO create).

    const uuObject = {awid,...dtoIn}
    let uuReturn = null
    try {
      uuReturn = await this.listDao.create(uuObject)
    } catch(e) {
      
      throw new Errors.Create.ListDaoCreateDaoFailed({uuAppErrorMap}, { "cause" : e })
 
    }

    // HDS 5 Returns properly filled dtoOut.
    return {
      ...uuReturn,
      uuAppErrorMap
    }

  }

}

module.exports = new ListAbl();
