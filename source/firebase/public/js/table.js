const newButtons = "<button onclick=removeRow(this)>Delete</button><button onclick=editRow(this)>Edit</button>"
const NUMBER_OF_TEXT_COLS = 2
const INPUT_FIELD_IDX = 0
var people = [];

// Append a new element using first and last name from HTML form.
function appendNewElementFromForm(uid,idToken){
    var firstNameInput = document.getElementById("firstName")
    var lastNameInput = document.getElementById("lastName")
    var table = document.getElementById("nameTable");

    appendNewElement(table, firstNameInput.value, lastNameInput.value,uid,idToken);
}

// Append new name to given table, and add to firebase server.
function appendNewElement(table, first, last, uid, idToken){
    if(first.length == 0 || last.length == 0){
        return;
    }

    if(uid && idToken){
        return;
    }

    // Insert a new row at the bottom with 3 columns.
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    firstInput = newReadOnlyInput(first);
    lastInput = newReadOnlyInput(last);

    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status === 200) {
                var response = req.response;
                people.push(response);
            } else {
                alert('There was a problem with the request.');
            }
        }
    };

    var payload = {
        "firstName": first,
        "lastName": last,
        "uid": uid,
        "idToken": idToken
    }



    
    req.open('POST', 'https://us-central1-remote-13.cloudfunctions.net/addItem', true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.send(JSON.stringify(payload));
    
    // Put 2 readonly text fields in first 2 columns. Then give it a set of edit buttons.
    cell1.appendChild(firstInput);
    cell2.appendChild(lastInput);
    cell3.innerHTML = newButtons;

    // Reset the input form.
    resetForm();

    //Send the first and last names to the firebase server

}

// Add new element to form, without adding to firebase
function appendNewElementNoFirebase(table, first, last){
    if(first.length == 0 || last.length == 0){
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

// On page load, get all the names from the firebase server and add them to our app's table
function getNames() {
    var req = new XMLHttpRequest();
    req.withCredentials = true;
    req.onreadystatechange = alertContents;
    req.open('GET', 'https://us-central1-remote-13.cloudfunctions.net/getItems', true);
    req.responseType = "json";
    req.send();
}

function lol() {
    var table = document.getElementById("nameTable");
    appendNewElementNoFirebase(table, "hi", "there");
}
window.onload = getNames;

// Function for checking if the server's response was correctly received (FOR GET FUNCTION)
function alertContents() {
    /*
    alert("before");
    var response = req.response;
    var person = response[0];
    var firstName = person.firstName;
    var lastName = person.lastName;
    alert(firstName);
    alert("after");
    */
    if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
            var response = req.response;
            var i;
            var table = document.getElementById("nameTable");
            //alert(response);
            for(i = 0; i < response.length; i++) {
                var person = response[i];
                var firstName = person.firstName;
                var lastName = person.lastName;
                alert("in here2");
                alert(firstName);
                appendNewElementNoFirebase(table, firstName, lastName);
            }
        } else {
            alert('There was a problem with the request.');
        }
    }
}

// Create a new readonly text field with good style.
function newReadOnlyInput(initialText){
    var input = document.createElement("INPUT");
    input.setAttribute("type", "text");
    input.setAttribute("value", initialText);
    input.setAttribute("readonly", true);
    input.style.backgroundColor = "transparent";
    input.style.border = "none";

    return input;
}

// Empty out the used forms.
function resetForm(){
    document.getElementById("firstNameForm").reset();
    document.getElementById("lastNameForm").reset();
}

// Flip the editability of a row's text fields.
function editRow(clicked){
    row = clicked.parentNode.parentNode;
    cols = row.children;

    if(clicked.editable){
        clicked.editable = false;
        clicked.innerText = "Edit";
        makeRowUneditable(clicked.parentNode.parentNode);

        var firstName = cols[0].children[INPUT_FIELD_IDX].inner
        alert(firstName);
        /*
        var dataIndex = row.rowIndex - 1;
        var person = people[dataIndex];
        var personJSON = JSON.parse(person);
        // Update the person from the selected row from the firebase server
        var req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if (req.readyState === XMLHttpRequest.DONE) {
                if (req.status === 200) {
                    //alert(personJSON.id);
                } else {
                    alert('There was a problem with the request.');
                }
            }
        };
        req.open('PUT', `https://us-central1-remote-13.cloudfunctions.net/update?id=${personJSON.id}`, true);
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.send("firstName="+first+"&lastName="+last);
        people[dataIndex].firstName = firstName;
        people[dataIndex].lastName = lastName;
        */

    } else {
        clicked.editable = true;
        clicked.innerText = "Done";
        makeRowEditable(clicked.parentNode.parentNode);
    }
}

// Make row's text fields editable.
function makeRowEditable(row){
    cols = row.children;

    for(i = 0; i < NUMBER_OF_TEXT_COLS; i++){
        cols[i].children[INPUT_FIELD_IDX].removeAttribute("readonly");
    }
}

// Make row's text fields uneditable.
function makeRowUneditable(row){
    cols = row.children;

    for(i = 0; i < NUMBER_OF_TEXT_COLS; i++){
        cols[i].children[INPUT_FIELD_IDX].setAttribute("readonly", true);
    }
}

// Remove row where button was clicked.
function removeRow(clicked){
    var parent = clicked.parentNode.parentNode;
    var dataIndex = parent.rowIndex - 1;
    var person = people[dataIndex];
    var personJSON = JSON.parse(person);
    // Delete the person from the selected row from the firebase server
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status === 200) {
                //alert(personJSON.id);
            } else {
                alert('There was a problem with the request.');
            }
        }
    };
    req.open('DELETE', `https://us-central1-remote-13.cloudfunctions.net/delete?id=${personJSON.id}`, true);
    req.send(null);
    people.splice(dataIndex, 1);

    parent.parentNode.removeChild(parent);
}
