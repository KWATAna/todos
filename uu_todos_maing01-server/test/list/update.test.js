const { TestHelper } = require("uu_appg01_server-test");



const CMD = "list/get";
afterAll(async () => {
    await TestHelper.dropDatabase();
    await TestHelper.teardown();
});

beforeAll(async () => {
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
    await TestHelper.executePostCommand("sys/uuAppWorkspace/init", dtoIn, session);

});



describe("Testing the list/get uuCmd...", () => {
    test("HDS", async () => {
        let session = await TestHelper.login("AwidLicenseOwner", false, false);
        console.log("five")
        let helpingVar = await TestHelper.executePostCommand("list/create", {name:"adadd"});
        console.log({...helpingVar})
        let result = await TestHelper.executePostCommand("list/update", {id:helpingVar.id, name:"hahaha"}, session);
        expect(result.status).toEqual(200);
        expect(result.data.uuAppErrorMap).toBeDefined();
      });







   
      
    
});
