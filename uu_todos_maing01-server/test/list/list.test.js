const { TestHelper } = require("uu_appg01_server-test");


const CMD = "item/list";
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
        let ls = await TestHelper.executePostCommand("list/create", {name:"dae2"});
        let fs = await TestHelper.executePostCommand("list/create", {name:"dada"});
        let ks = await TestHelper.executePostCommand("list/create", {name:"adsd"}); 

        let wow = await TestHelper.executeGetCommand("list/list", {});

        console.log({...wow})
        expect(wow).toBeDefined();
    
      });







      
    
});