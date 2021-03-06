const form = document.getElementById("form");
const password1El = document.getElementById("password1");
const password2El = document.getElementById("password2");
const messageContainer = document.querySelector(".message-container");
const message = document.getElementById("message");

let isValid = false;
let passwordsMatch = false;

function validateForm() {
    // using contraint API
    isValid = form.checkValidity();
    
    // style main message error 
    if(!isValid){
    message.textContent = "Please fill out all fields.";
    message.style.color = "red";
    messageContainer.style.borderColor = "red";
    return;
    }
    // check if passwords match
    if (password1El.value === password2El.value) {
        passwordsMatch = true;
        password1El.style.borderColor = "rgb(219, 198, 76)";
        password2El.style.borderColor = "rgb(219, 198, 76)";
    } else {
        passwordsMatch = false; 
        message.textContent = "Make sure passwords match.";
        message.style.color = "red";
        messageContainer.style.borderColor = "red";
        password1El.style.borderColor = "#222";
        password2El.style.borderColor = "#222";
        return;
    }

    // if form is valid and passwords match
    if(isValid && passwordsMatch) {
        message.textContent = "Successfully Registered!";
        message.style.color = "rgb(219, 198, 76)";
        messageContainer.style.borderColor = "rgb(219, 198, 76)"
    }

}

function storeFormData(){
    const user = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        website: form.website.value,
        password: form.password.value,
    }; 
    // do something with user data
    console.log(user);
}

function processFormData(e) {
e.preventDefault();

// validate form
    validateForm();
    // submit date if valid
    if( isValid && passwordsMatch) {
        storeFormData();
    }
}


// Event listener
form.addEventListener("submit", processFormData)