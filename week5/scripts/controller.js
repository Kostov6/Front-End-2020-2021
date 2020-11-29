function validateLogin(event) {
    event.preventDefault();

    let emailString = document.getElementById("email").value;
    let passwString = document.getElementById("pass").value;

    if (validateEmailString(emailString) && validatePasswordString(passwString)) {
        document.getElementById("errors").innerText = "";
        window.auth.login(emailString, passwString, loginCallback);
        return true;
    }
    document.getElementById("errors").innerText = "Невалиден имейл или парола";
    return false;
}

function validateRegister(event) {
    event.preventDefault();

    let usernameString = document.getElementById("username").value;
    let emailString = document.getElementById("email").value;
    let passwString = document.getElementById("pass").value;

    if (validateEmailString(emailString) && validatePasswordString(passwString)) {
        document.getElementById("errors").innerText = "";
        window.auth.register(usernameString, emailString, passwString, registerCallback);
        return true;
    }
    document.getElementById("errors").innerText = "Невалиден имейл или парола";
    return false;
}

function registerCallback(success, errorCode, errorMsg) {
    if (success) {
        alert("Регистрацията е успешна");
        window.location.href = "./posts.html";
    } else {
        document.getElementById("errors").innerText = errorMsg;
    }
}

function loginCallback(success, errorCode, errorMsg) {
    if (success) {
        window.location.href = "./posts.html";
    } else {
        document.getElementById("errors").innerText = errorMsg;
    }
}

if (document.getElementById("register-form"))
    document.getElementById("register-form").addEventListener("submit", validateRegister);
if (document.getElementById("login-form"))
    document.getElementById("login-form").addEventListener("submit", validateLogin);


function validateEmailString(emailString) {
    let atDotCheck = /.*@.*\..*/;
    return emailString.length >= 5 && atDotCheck.test(emailString);
}

function validatePasswordString(passwString) {
    let capitalLetter = /.*[A-Z].*/;
    let digit = /.*\d.*/;
    let specialSign = /[\!\@\#\$\%\^\&]/;

    return passwString.length >= 6 && capitalLetter.test(passwString) && digit.test(passwString) && specialSign.test(passwString);
}