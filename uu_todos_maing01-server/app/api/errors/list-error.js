"use strict";

const TodosMainUseCaseError = require("./todos-main-use-case-error.js");
const LIST_ERROR_PREFIX = `${TodosMainUseCaseError.ERROR_PREFIX}list/`;

const Create = {
  UC_CODE: `${LIST_ERROR_PREFIX}create/`,
  InvalidDtoIn: class extends TodosMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  TodoInstanceDoesNotExist: class extends TodosMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}todoInstanceDoesNotExist`;
      this.message = "TodoInstance does not exist.";
    }
  },

  TodoInstanceIsNotInProperState: class extends TodosMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}todoInstanceIsNotInProperState`;
      this.message = "The application is not in proper state.";
    }
  },

  DeadLineDateIsFromThePast: class extends TodosMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}deadlineDateIsFromThePast`;
      this.message = "Deadline date is from the past and therefore cannot be met.";
    }
  },
  ListDaoCreateDaoFailed: class extends TodosMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}listDaoCreateFailed`;
      this.message = "Creating list by list DAO create failed.";
    }
  },
  
};

const Get = {
  UC_CODE: `${LIST_ERROR_PREFIX}get/`,

  InvalidDtoIn: class extends TodosMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  TodoInstanceDoesNotExist: class extends TodosMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}todoInstanceDoesNotExist`;
      this.message = "TodoInstance does not exist.";
    }
  },
  TodoInstanceIsNotInProperState: class extends TodosMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}todoInstanceIsNotInProperState`;
      this.message = "The application is not in proper state.";
    }
  },
  ListDoesNotExist: class extends TodosMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}listDoesNotExist	`;
      this.message = "List with given id does not exist.";
    }
  },
  
  
};

const Update = {
  UC_CODE: `${LIST_ERROR_PREFIX}update/`,

  InvalidDtoIn: class extends TodosMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TodoInstanceDoesNotExist: class extends TodosMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}todoInstanceDoesNotExist`;
      this.message = "TodoInstance does not exist.";
    }
  },
  TodoInstanceIsNotInProperState: class extends TodosMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}todoInstanceIsNotInProperState`;
      this.message = "The application is not in proper state.";
    }
  },
  ListDoesNotExist: class extends TodosMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}listDoesNotExist	`;
      this.message = "List with given id does not exist.";
    }
  },
  
};

const Delete = {
  UC_CODE: `${LIST_ERROR_PREFIX}delete/`,
  InvalidDtoIn: class extends TodosMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TodoInstanceDoesNotExist: class extends TodosMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}todoInstanceDoesNotExist`;
      this.message = "TodoInstance does not exist.";
    }
  },
  TodoInstanceIsNotInProperState: class extends TodosMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}todoInstanceIsNotInProperState`;
      this.message = "The application is not in proper state.";
    }
  },
  ListContainsActiveItems: class extends TodosMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}listContainsActiveItems`;
      this.message = "List with active items can not be deleted.";
    }
  },
  
};

const List = {
  UC_CODE: `${LIST_ERROR_PREFIX}list/`,
  InvalidDtoIn: class extends TodosMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TodoInstanceDoesNotExist: class extends TodosMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}todoInstanceDoesNotExist`;
      this.message = "TodoInstance does not exist.";
    }
  },
  TodoInstanceIsNotInProperState: class extends TodosMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}todoInstanceIsNotInProperState`;
      this.message = "The application is not in proper state.";
    }
  },
  
};

module.exports = {
  List,
  Delete,
  Update,
  Get,
  Create
};
