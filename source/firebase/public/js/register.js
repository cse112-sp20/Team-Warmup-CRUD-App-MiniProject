// Signs the user up for an account. 
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Grab the email and password from the register form. 
    const email = signupForm['registerEmail'].value;
    const password = signupForm['registerPassword'].value;

    // Create the new user with an email and password. 
    try {
        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            const firstName = signupForm['firstName'].value;
            const lastName = signupForm['lastName'].value;

            const uID = cred.user.uid;

            // Write this user to the database. 
            writeUserData(uID, firstName, lastName, email);

            // Reset the signup form. 
            signupForm.reset();

            // Redirect to the user login page. 
            window.location.href = '../Home/table.html';
    
        })

        
    }

    catch(err) {
        console.log("An error occurred: " + err);
    }
    
})

// Writes the user's information into the database. 
function writeUserData(uID, fname, lname, email) {
    database.ref('users/' + uID).set({
      userID: uID,
      firstName: fname,
      lastName: lname,
      email: email
    });
  }