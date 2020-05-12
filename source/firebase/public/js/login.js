// Logs in the user. 
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Grab the email and password from the login form. 
    const email = loginForm['loginEmail'].value;
    const password = loginForm['loginPassword'].value;

    // Login the user.
    try {
        auth.signInWithEmailAndPassword(email, password).then( (e) => {
            console.log("Sign in successful!")

            window.location.href = '../Home/table.html';

        })
    }

    catch(err) {
        console.log("An error occurred: " + err);
    }
    
})