const { TestHelper } = require("uu_appg01_server-test");


const CMD = "list/get";
afterEach(async () => {
    await TestHelper.dropDatabase();
    await TestHelper.teardown();
});

beforeEach(async () => {
    await TestHelper.setup();
    await TestHelper.initUuSubAppInstance();
    await TestHelper.createUuAppWorkspace();
    let session = await TestHelper.login("AwidLicenseOwner", false, false);

    let dtoIn = {
        code: "pukdadadap",
        name: "pupopppkp",
        description: "fsfsf sfsfsfs sfdfsfsfsfs",
        uuAppProfileAuthorities: "urn:uu:GGALL",
    };
    let result = await TestHelper.executePostCommand("sys/uuAppWorkspace/init", dtoIn, session);

});

describe("Testing the list/get uuCmd...", () => {
    test("HDS", async () => {
        let session = await TestHelper.login("AwidLicenseOwner", false, false);
        console.log("five")
        let helpingVar = await TestHelper.executePostCommand("list/create", {name:"adadd"});
        console.log({...helpingVar})
        let result = await TestHelper.executeGetCommand("list/get", {id:helpingVar.id}, session);
        expect(result.status).toEqual(200);
        expect(result.data.uuAppErrorMap).toBeDefined();
      });

      test("Invalid dtoIn", async () => {
        expect.assertions(3);
        let session = await TestHelper.login("AwidLicenseOwner", false, false);
        try{
        let result = await TestHelper.executePostCommand("list/create", {}, session);
        let fin = await TestHelper.executeGetCommand("list/get", {dr:result.id}, session);

        } catch(e){
        expect(e.status).toEqual(400);
        expect(e.message).toEqual("DtoIn is not valid.")
        expect(e.code).toEqual("uu-todos-main/list/create/invalidDtoIn")
        }
      });

      test("Test - TodosIsNotInCorrectState", async () => {
        let session = await TestHelper.login("Authorities", false, false);
        const filter = `{awid: "${TestHelper.awid}"}`;
        const params = `{$set: ${JSON.stringify({ state: `vfr` })}}`;
        await TestHelper.executeDbScript(`db.todosMain.findOneAndUpdate(${filter}, ${params});`);
        let expectedError = {
          code: `${CMD}/todoInstanceIsNotInProperState`,
          message: "The application is not in proper state.",
          paramMap: { awid: TestHelper.awid, currentState:"vfr", expectedState: "active" },
        };
        expect.assertions(3);
        try {
          await TestHelper.executePostCommand("list/create", { name: "list name" }, session);
        } catch (error) {
          expect(error.status).toEqual(400);
          expect(error.message).toEqual(expectedError.message);
    
          if (error.paramMap && expectedError.paramMap) {
            expect(error.paramMap).toEqual(expectedError.paramMap);
          }
        }
      }); 


      test("TodoInstanceDoesNotExist", async () => {
        let session = await TestHelper.login("Authorities", false, false);
        let filter = `{awid: "${TestHelper.awid}"}`;
        let restore = `{$set: ${JSON.stringify({ awid: `active` })}}`;
        await TestHelper.executeDbScript(`db.todosMain.findOneAndUpdate(${filter}, ${restore});`);
        let params = `{$set: ${JSON.stringify({ awid: 77777777777777 })}}`;
        let db = await TestHelper.executeDbScript(`db.todosMain.findOneAndUpdate(${filter}, ${params});`);
        let expectedError = {
          code: "todoInstanceDoesNotExist",
          message: "TodoInstance does not exist."
        };
        try {
          let com = await TestHelper.executePostCommand("list/create", { name: "Hello list" }, session);
        } catch (error) {
         // console.log({...error})
         // let res = {...error}

          // console.log(error.code)
          expect(error.status).toEqual(400);
          expect(error.message).toEqual(expectedError.message);


          //expect(error.dtoOut).toEqual(expectedError.message);
        }
        expect.assertions(2);
      });
      
    
});



