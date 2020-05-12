var click = 0;

function submitForm(){
    firstName = document.getElementById("firstName");
    lastName  = document.getElementById("lastName");
    emailAdress = document.getElementById("email");

    console.log(firstName.value + " " + lastName.value + " " + emailAdress.value);

    if(click == 0){
        highlightRequiredField(firstName);
    } else {
        goToTablePage();
    }
    
    click = click + 1;
}

function highlightRequiredField(field){
    field.style.borderColor = "red";
}

function resetHighlightRequiredField(field){
    field.style.borderColor = "black";
}

function goToTablePage(){
    window.location.href = "table.html"
}