const { TestHelper } = require("uu_appg01_server-test");


const CMD = "item/get";
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
        let ls = await TestHelper.executePostCommand("list/create", {name:"fukkk"});
        console.log(ls.id)
        let mid = await TestHelper.executePostCommand("item/create", { listId: ls.id, text:"adadd"});
        let helpingVar = await TestHelper.executePostCommand("item/update", { id: mid.id, text:"hahahaha"});

        console.log({...helpingVar})
        expect(helpingVar.status).toEqual(200);
        expect(helpingVar.uuAppErrorMap).toBeDefined();
      });







      
    
});