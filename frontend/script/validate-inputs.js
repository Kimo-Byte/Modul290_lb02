// read form element
let ALL_INPUT_VALID;

const form = document.getElementById('form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');


// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}


// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
        ALL_INPUT_VALID = false;
    }
}
// Check Phonenumber is valid
// +41 11 111 11 11
// +41 (0) 11 111 11 11
// +41111111111
// +41(0)111111111
// 00411111111
// 0041 11 111 11 11
// 0041 (0) 11 111 11 11
// 011 111 11 11
// 0111111111
function checkPhone(input) {
    const re = /(\b(0041|0)|\B\+41)(\s?\(0\))?(\s)?[1-9]{2}(\s)?[0-9]{3}(\s)?[0-9]{2}(\s)?[0-9]{2}\b/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Phonenumber is not valid');
        ALL_INPUT_VALID = false;
    }
}

// Check Password is valid
// Min 1 uppercase letter.
// Min 1 lowercase letter.
// Min 1 special character.
// Min 1 number.
// Min 8 characters.
// Max 30 characters.
function checkPassword(input) {
    const re = /^[A-Za-z]\w{7,14}$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Password is not strong enough');
        ALL_INPUT_VALID = false;
    }
}

// Check required fields
function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
            isRequired = true;
            ALL_INPUT_VALID = false;
        } else {
            showSuccess(input);
        }
    });

    return isRequired;
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input,
            `${getFieldName(input)} must be at least ${min} characters`
        );
        ALL_INPUT_VALID = false;
    } else if (input.value.length > max) {
        showError(input,
            `${getFieldName(input)} must be less than ${max} characters`
        );
        ALL_INPUT_VALID = false;
    } else {
        showSuccess(input);
    }
}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Validate form input elements
function validateForm() {
    if (!checkRequired([firstName, lastName, email, phone, password])) {
        checkLength(firstName, 3, 25);
        checkLength(lastName, 3, 25);
        checkLength(phone, 10, 12);
        checkLength(password, 8, 25);
        checkEmail(email);
        checkPhone(phone);
        checkPassword(password);
    }
}

/**
 * Make a testcall after the page is loaded
 */
window.onload = () => {
    console.log(`Make test call to the server ...`);
    getWelcome().then(
        result => {
            console.log(`Response from server: ${result}`);
        },
        error => {
            console.log(error)
        });
};


// Event listeners
form.addEventListener('submit', function (e) {
    ALL_INPUT_VALID = true;
    e.preventDefault();
    //First validate form
    validateForm();
    //Send data
    if (ALL_INPUT_VALID) {
        let formData = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            phone: phone.value,
            password: password.value
        };
        console.log(`All input is valid. Send data to server: 
      ${JSON.stringify(formData)}`);

        //Variant 1
        //sendForm1(formData);
        //Variant 2
        sendForm2(formData).then(
            result => {
                console.log(`Response from server: ${result}`);
                window.location.href = './confirm.html';
            }).catch(err => {
            console.log(`Error occurred: ${err}`)
        });
    } else {
        console.log("At least one validation failed. No data sent to contact-server.");
    }

});
