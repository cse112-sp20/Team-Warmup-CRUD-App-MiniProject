const appendNewElementFromForm = require("./Table");

test("displays first and last", () => {
  document.body.innerHTML =
    '<div class="newNameInput">' +
    '<form id="firstNameForm">' +
    '<input type="text" id="firstName" value="testFirst" name="firstName"><br>' +
    "</form>" +
    '<form id="lastNameForm">' +
    '<input type="text" id="lastName" value="testLast" name="lastName">' +
    "</form>" +
    '<button id="addButton" onclick="appendNewElementFromForm()">add</button>' +
    "</div>" +
    '<div class="container">' +
    '<table id="nameTable">' +
    "<tr>" +
    '<th width="37%">First</th>' +
    '<th width="37%">Last</th>' +
    '<th width="26%">Edit</th>' +
    "</tr>" +
    "</table>" +
    "</div>";

  appendNewElementFromForm();
  //console.log(document.getElementById("nameTable").innerHTML);
  expect(document.getElementById("nameTable").innerHTML).toEqual(
    "<tbody>" +
      "<tr>" +
      '<th width="37%">First</th>' +
      '<th width="37%">Last</th>' +
      '<th width="26%">Edit</th>' +
      "</tr>" +
      "<tr>" +
      "<td>" +
      '<input type="text" value="testFirst" readonly="true" style="background-color: transparent;">' +
      "</td>" +
      "<td>" +
      '<input type="text" value="testLast" readonly="true" style="background-color: transparent;">' +
      "</td>" +
      "<td>" +
      '<button onclick="removeRow(this)">Delete</button>' +
      '<button onclick="editRow(this)">Edit</button>' +
      "</td>" +
      "</tr>" +
      "</tbody>"
  );
});
