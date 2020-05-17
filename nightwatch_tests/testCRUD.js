module.exports = {
  "Test CRUD": function (browser) {
    browser
      // Load the tables.html page and verify that the create form exists
      .url(require("path").resolve(__dirname + "../../site/content/table.html"))
      .waitForElementVisible("body")
      .assert.visible("input[id=firstName]")
      .assert.visible("input[id=lastName]")
      .assert.visible("button[id=addButton]")
      // Test Create
      .setValue("input[id=firstName]", "Thom")
      .setValue("input[id=lastName]", "Pow")
      .click("button[id=addButton]")
      // Test Read
      .waitForElementPresent('button[onclick="removeRow(this)"]')
      .assert.visible("input[value=Thom]")
      .assert.visible("input[value=Pow]")
      // Test Update
      .click('button[onclick="editRow(this)"]')
      .setValue("input[value=Thom]", "as")
      .setValue("input[value=Pow]", "ell")
      .click('button[onclick="editRow(this)"]')
      .assert.attributeEquals("input[value=Thom]", "value", "Thomas")
      .assert.attributeEquals("input[value=Pow]", "value", "Powell")
      // Test Delete
      .click('button[onclick="removeRow(this)"]')
      .waitForElementNotPresent('button[onclick="removeRow(this)"]')
      .end();
  },
};
