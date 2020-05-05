const newButtons =
  "<button onclick=removeRow(this)>Delete</button><button onclick=editRow(this)>Edit</button>";
const NUMBER_OF_TEXT_COLS = 2;
const INPUT_FIELD_IDX = 0;

// Append a new element using first and last name from HTML form.
function appendNewElementFromForm() {
  var firstNameInput = document.getElementById("firstName");
  var lastNameInput = document.getElementById("lastName");
  var table = document.getElementById("nameTable");

  appendNewElement(table, firstNameInput.value, lastNameInput.value);
}

// Append new name to given table.
function appendNewElement(table, first, last) {
  if (first.length == 0 || last.length == 0) {
    return;
  }

  // Insert a new row at the bottom with 3 columns.
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);

  firstInput = newReadOnlyInput(first);
  lastInput = newReadOnlyInput(last);

  // Put 2 readonly text fields in first 2 columns. Then give it a set of edit buttons.
  cell1.appendChild(firstInput);
  cell2.appendChild(lastInput);
  cell3.innerHTML = newButtons;

  // Reset the input form.
  resetForm();
}

// Create a new readonly text field with good style.
function newReadOnlyInput(initialText) {
  var input = document.createElement("INPUT");
  input.setAttribute("type", "text");
  input.setAttribute("value", initialText);
  input.setAttribute("readonly", true);
  input.style.backgroundColor = "transparent";
  input.style.border = "none";

  return input;
}

// Empty out the used forms.
function resetForm() {
  document.getElementById("firstNameForm").reset();
  document.getElementById("lastNameForm").reset();
}

// Flip the editability of a row's text fields.
function editRow(clicked) {
  row = clicked.parentNode.parentNode;

  if (clicked.editable) {
    clicked.editable = false;
    clicked.innerText = "Edit";
    makeRowUneditable(clicked.parentNode.parentNode);
  } else {
    clicked.editable = true;
    clicked.innerText = "Done";
    makeRowEditable(clicked.parentNode.parentNode);
  }
}

// Make row's text fields editable.
function makeRowEditable(row) {
  cols = row.children;

  for (i = 0; i < NUMBER_OF_TEXT_COLS; i++) {
    cols[i].children[INPUT_FIELD_IDX].removeAttribute("readonly");
  }
}

// Make row's text fields uneditable.
function makeRowUneditable(row) {
  cols = row.children;

  for (i = 0; i < NUMBER_OF_TEXT_COLS; i++) {
    cols[i].children[INPUT_FIELD_IDX].setAttribute("readonly", true);
  }
}

// Remove row where button was clicked.
function removeRow(clicked) {
  var parent = clicked.parentNode.parentNode;
  parent.parentNode.removeChild(parent);
}
