"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/item-error.js");

const WARNINGS = {
  unsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  }
};

class ItemAbl {

  constructor() {
    this.validator = Validator.load();
    this.listDao = DaoFactory.getDao("list");
    this.mainDao = DaoFactory.getDao("todosMain")
    this.itemDao = DaoFactory.getDao("item")
  }

  async list(uri, dtoIn, session, uuAppErrorMap = {}) {
  
  
  const awid = uri.getAwid()


  // HDS 1 Validation of dtoIn.
  let validationResult = this.validator.validate("itemListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
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

  // HDS 3 System loads from uuAppObjectStore basic attributes of all uuObject items by keys given in dtoIn, and saves them to dtoOut.itemList.
  let uuObject = {...dtoIn, awid}
  if(uuObject.listId && uuObject.state){
    
      uuObject = await this.itemDao.listByListIdAndState(uuObject)
    
  }else if(uuObject.state){
    
      uuObject = await this.itemDao.listByState(uuObject)
    
  } else {
     
      uuObject = await this.itemDao.list(uuObject)
    
  }


  // HDS 4 Returns properly filled dtoOut.

  return {
    ...uuObject
  }


  }

  async delete(uri, dtoIn, session, uuAppErrorMap = {}) {
    const awid = uri.getAwid()

    // HDS 1 Validation of dtoIn.

    let validationResult = this.validator.validate("itemDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    // HDS 2 System checks existence and state of the todoInstance uuObject.

    const uuTodosMain = await this.mainDao.getByAwid(awid)

    if (!uuTodosMain) {
      throw new Errors.Delete.TodoInstanceDoesNotExist({uuAppErrorMap}, {awid})
    }

    if (uuTodosMain.state !== 'active') {
      throw new Errors.Delete.TodoInstanceIsNotInProperState({uuAppErrorMap}, {expectedState: "active", awid, currentState: uuTodosMain.state })
    }


    // HDS 3 System gets the uuObject item from the uuAppObjectStore and checks its existence (using item DAO get with awid and dtoIn.id) and state (only active or cancelled items can be deleted). The result is saved to item.
    
    let uuItem = await this.itemDao.get(awid, dtoIn.id)
    if(!uuItem){
      throw new Errors.Delete.ItemDoesNotExist({uuAppErrorMap}, {id: dtoIn.id})
    }
    if(uuItem.state === "completed"){
      throw new Errors.Delete.ItemIsNotInCorrectState({uuAppErrorMap}, {id: dtoIn.id, currentState: uuItem.state, expectedState: ["active","cancelled"]})
    }


    // HDS 4 System deletes item from the uuAppObjectStore (using item DAO delete with awid and dtoIn.id).

    let uuObject = {...dtoIn, awid}
    uuObject = await this.itemDao.delete(uuObject)

    // HDS 5 Returns properly filled dtoOut.

    return {
      uuAppErrorMap
    }
    
  }

  async setFinalState(uri, dtoIn, session, uuAppErrorMap = {}) {
    const awid = uri.getAwid()

    // HDS 1
    let validationResult = this.validator.validate("itemSetFinalStateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.SetFinalState.InvalidDtoIn
    );


    // HDS 2

    const uuTodosMain = await this.mainDao.getByAwid(awid)

    if (!uuTodosMain) {
      throw new Errors.SetFinalState.TodoInstanceDoesNotExist({uuAppErrorMap}, {awid})
    }

    if (uuTodosMain.state !== 'active') {
      throw new Errors.SetFinalState.TodoInstanceIsNotInProperState({uuAppErrorMap}, {expectedState: "active", awid, currentState: uuTodosMain.state })
    }

    // HDS 3
    let uuItem = await this.itemDao.get(awid, dtoIn.id)
    if(!uuItem){
      throw new Errors.SetFinalState.ItemDoesNotExist({uuAppErrorMap}, {id: dtoIn.id})
    }
    if(uuItem.state !== "active"){
      throw new Errors.SetFinalState.ItemIsNotInCorrectState({uuAppErrorMap}, {id: dtoIn.id, currentState: uuItem.state, expectedState: "active"})
    }

    
    // HDS 4
    let uuObject = { ...uuItem, ...dtoIn, awid };

    try {
      uuObject = await this.itemDao.setFinalState(uuObject);
    } catch (e) {
      throw new Errors.SetFinalState.ItemDaoUpdateFailed({ uuAppErrorMap },{ "cause":{...e} });
    }


    // HDS 5
    return {
      ...uuObject,
      uuAppErrorMap
    }
    
  }

  async update(uri, dtoIn, session, uuAppErrorMap = {}) {

    const awid = uri.getAwid()
    // HDS 1 Validation of dtoIn.

    let validationResult = this.validator.validate("itemUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    // HDS 2 System checks the existence and state of the todoInstance uuObject.

    const uuTodosMain = await this.mainDao.getByAwid(awid)

    if (!uuTodosMain) {
      throw new Errors.Update.TodoInstanceDoesNotExist({uuAppErrorMap}, {awid})
    }

    if (uuTodosMain.state !== 'active') {
      throw new Errors.Update.TodoInstanceIsNotInProperState({uuAppErrorMap}, {expectedState: "active", awid, currentState: uuTodosMain.state })
    }

    // HDS 3 Verifies, that the item exists and is in an active state (using item DAO get with awid and dtoIn.id). The result is saved as "item".
    let uuItem = await this.itemDao.get(awid, dtoIn.id)
    if(!uuItem){
      throw new Errors.Update.ItemDoesNotExist({uuAppErrorMap}, {id: dtoIn.id})
    }
    if(uuItem.state !== "active"){
      throw new Errors.Update.ItemIsNotInCorrectState({uuAppErrorMap}, {id: dtoIn.id, currentState: uuItem.state, expectedState: "active"})
    }


    // HDS 4 System verifies, that the list entered in dtoIn.listId exists (using list DAO get with awid and dtoIn.listId).
    const uuList = await this.listDao.get(awid, uuItem.listId)
    if(!uuList){
      throw new Errors.Update.ListDoesNotExist({uuAppErrorMap}, {id: dtoIn.listId})
    }


    // HDS 5 System updates uuObject item in the uuAppObjectStore.

    let uuObject = { ...dtoIn, awid };

    try {
      uuObject = await this.itemDao.update(uuObject);
    } catch (e) {
      throw new Errors.Update.ItemDaoUpdateFailed({ uuAppErrorMap },{ "cause":{...e} });
    }

    // HDS 6 Returns properly filled dtoOut.
    return {
      ...uuObject,
      uuAppErrorMap
    }

    
  }

  async get(uri, dtoIn, session, uuAppErrorMap = {}) {
    const awid = uri.getAwid()
    // HDS 1 Validation of dtoIn.
    let validationResult = this.validator.validate("itemGetDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
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
    // HDS 3   System gets uuObject item from uuAppObjectStore (using item DAO get with awid and dtoIn.id).
    const uuItem = await this.itemDao.get(awid, dtoIn.id)
    if(!uuItem){
      throw new Errors.Get.ListDoesNotExist({uuAppErrorMap}, { id: dtoIn.listId })
    }
    // HDS 4 Returns properly filled dtoOut.
    return {
      ...uuItem,
      uuAppErrorMap
    } 
  }

  async create(uri, dtoIn, session) {
    const awid = uri.getAwid()
    // HDS-1 Validation of dtoIn.
    let validationResult = this.validator.validate("itemCreateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );
    // HDS-2 System checks existence and state of the todoInstance uuObject.
    const uuTodosMain = await this.mainDao.getByAwid(awid)
    if (!uuTodosMain) {
      throw new Errors.Create.TodoInstanceDoesNotExist({uuAppErrorMap}, {awid})
    }
    if (uuTodosMain.state !== 'active') {
      throw new Errors.Create.TodoInstanceIsNotInProperState({uuAppErrorMap}, {expectedState: "active", awid, currentState: uuTodosMain.state })
    }
    // HDS-3 Expands dtoIn with the key "state: active".
    dtoIn.state = 'active';
    // HDS-4 Verifies, that the list entered in dtoIn.listId exists (using list DAO get with awid and dtoIn.listId).
    const uuList = await this.listDao.get(awid, dtoIn.listId)
    if(!uuList){
      throw new Errors.Create.ListDoesNotExist({uuAppErrorMap}, { id: dtoIn.listId })
    }
    // HDS-5 System creates uuObject item in uuAppObjectStore (using item DAO create).
    let uuObject = { awid, ...dtoIn}
    let res = null
    try {
      res = await this.itemDao.create(uuObject)
    } catch(e) {
      throw new Errors.Create.ItemDaoCreateFailed({uuAppErrorMap}, { "cause":{...e} })
    }
    // HDS-6 Returns properly filled dtoOut.
    return {
      ...res,
      uuAppErrorMap
    }
  }

}

module.exports = new ItemAbl();
