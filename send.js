var nameError = document.getElementById('name-error');
var phoneError = document.getElementById('phone-error');
var emailError = document.getElementById('email-error');
var messageError = document.getElementById('msg-error');
var submitError = document.getElementById('submit-error');

function validateName() {
    var name = document.getElementById('contact-name').value;
    if (name.length === 0) {
        nameError.innerHTML = 'Name is required';
        return false;
    }
    if (/\d+/.test(nameField)) {
        nameError.innerHTMl= "Name cannot include numbers!";
      }
    if (!name.match(/^[A-Za-z]+(\s[A-Za-z]+)+$/)) {
        nameError.innerHTML = 'Write full name';
        return false;
    }
    nameError.innerHTML = '<i id="tick-error" class="fa-solid fa-circle-check"></i>';
    return true;
}

function validateEmail() {
    var email = document.getElementById('contact-email').value;
    if (email.length === 0) {
        emailError.innerHTML = 'Email is required';
        return false;
    }
    if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        emailError.innerHTML = 'Email invalid';
        return false;
    }
    emailError.innerHTML = '<i id="tick-error" class="fa-solid fa-circle-check"></i>';
    return true;
}

function validatePhone(){
    var phone = document.getElementById('contact-phone').value;

    if(phone.length == 0){
        phoneError.innerHTML = 'Phone no is required';
        return false;
    }
    if(phone.length !== 10){
        phoneError.innerHTML = 'Phone no should be 10 digits';
        return false;
    }
    if(!phone.match(/^[0-9]{10}$/)){
        phoneError.innerHTML = '10 Digits only';
        return false;
    }

    phoneError.innerHTML = '<i id="tick-error" class="fas fa-check-circle"></i>';
    return true;
}

function validateMessage() {
    var message = document.getElementById('contact-msg').value;
    var required = 15;
    var left = required - message.length;
    if (left > 0) {
        messageError.innerHTML = left + ' more characters required';
        return false;
    }
    messageError.innerHTML = '<i id="tick-error" class="fa-solid fa-circle-check"></i>';
    return true;
}

function validateForm() {
    if (!validateName() || !validateEmail() || !validateMessage()) {
        submitError.innerHTML = 'Please fill all fields correctly and submit';
       alert("Enter the field correctly!")
        setTimeout(function() { submitError.innerHTML = ''; }, 3000);
        return false;
    }
    submitError.innerHTML = '<i id="tick-error" class="fa-solid fa-circle-check"></i> Form submitted successfully';
    return true;
}