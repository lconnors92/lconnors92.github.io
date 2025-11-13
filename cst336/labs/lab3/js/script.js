//event listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("focus", checkUsername);
document.querySelector("#signupForm").addEventListener("submit", function(event) {
    validateForm(event);
});

displayStates();

//need a displayStates? https://csumb.space/api/allStatesAPI.php
async function displayStates() {
    let state = document.querySelector("#state").value;
    // alert(document.querySelector("#state").value);
    let url = `https://csumb.space/api/allStatesAPI.php`;
    let response = await fetch(url);
    let data = await response.json();
    let stateList = document.querySelector("#state");
    stateList.innerHTML = "<option> Select State </option>";
    for (let i=0; i < data.length; i++) {
        stateList.innerHTML += `<option>${data[i].state} </option>`;
    }
}


//functions
//Displaying city from Web API after entering a zip code (need async for fetch/ any await)
async function displayCity() {
    let zipCode = document.querySelector("#zip").value;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();
    document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#latitude").innerHTML = data.latitude;
    document.querySelector("#longitude").innerHTML = data.longitude;
}

//display counties based on 2-letter abbrev of state
async function displayCounties() {
    let state = document.querySelector("#state").value;
    // alert(document.querySelector("#state").value);
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();
    let countyList = document.querySelector("#county");
    countyList.innerHTML = "<option> Select County </option>";
    for (let i=0; i < data.length; i++) {
        countyList.innerHTML += `<option> ${data[i].county} </option>`;
    }
}

//checking username
async function checkUsername() {
    let username = document.querySelector("#username").value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();
    let usernameError = document.querySelector("#usernameError");
    if (data.available) {
        usernameError.innerHTML = " Username available!";
        usernameError.style.color = "green";
    } 
    else {
        usernameError.innerHTML = " Username taken";
        usernameError.style.color = "red";
    } 
}

//Validate form data
function validateForm(e) {
    let isValid = true;
    //validate username
    let username = document.querySelector("#username").value;
    if (username.length == 0) {
        document.querySelector("#usernameError").innerHTML = "Username Required!";
        isValid = false;
    }
    //validate password
    let password = document.querySelector("#password").value;
    let passwordRetype = document.querySelector("#passwordRetype").value;
    document.querySelector("#suggestedPwd").innerHTML = "";
    document.querySelector("#passwordError").innerHTML = "";

    if (password.length < 6) {
        document.querySelector("#suggestedPwd").innerHTML = "Example pw: h0tdog42";
        //generate password with: https://csumb.space/api/suggestedPassword.php?length=8
        isValid = false;
    }
    if (password != passwordRetype) {
        document.querySelector("#passwordError").innerHTML = "Passwords do not match!";
        isValid = false;
    }
    if (!isValid) {
        e.preventDefault();
    }

}

//Validate password at least 6 chars and retype password is eqal
// function validatePassword(e) {
//     let isValid = true;
//     let password = document.querySelector("#password").value;
//     let passwordRetype = document.querySelector("#passwordRetype").value;
//     document.querySelector("#suggestedPwd").innerHTML = "";
//     document.querySelector("#passwordError").innerHTML = "";

//     if (password.length < 6) {
//         document.querySelector("#suggestedPwd").innerHTML = "Example pw: h0tdog42";
//         isValid = false;
//     }
//     if (password != passwordRetype) {
//         document.querySelector("#passwordError").innerHTML = "Passwords do not match!";
//         isValid = false;
//     }
//     if (!isValid) {
//         e.preventDefault();
//     }
// }