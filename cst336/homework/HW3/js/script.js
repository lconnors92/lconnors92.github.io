//event listeners
document.querySelector("#searchForm").addEventListener("submit", function(event) {
    validateForm(event);
});



//need a displayStates? https://csumb.space/api/allStatesAPI.php
//HW3 make Display results?
async function displayStates() {
    // let state = document.querySelector("#state").value; don't need this, "state" is attribute in API
    // alert(document.querySelector("#state").value);
    let url = `https://csumb.space/api/allStatesAPI.php`;
    let response = await fetch(url);
    let data = await response.json();
    let stateList = document.querySelector("#state");
    stateList.innerHTML = "<option> Select State </option>";
    for (let i=0; i < data.length; i++) {
        stateList.innerHTML += `<option value="${data[i].usps}">${data[i].state} </option>`;
    }
}


//functions HW3 keep for API implementation example
//Displaying city from Web API after entering a zip code (need async for fetch/ any await)
async function displayCity() {
    let zipCode = document.querySelector("#zip").value;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();
    let zipError = document.querySelector("#zipError");
    if (data.city) {
        zipError.innerHTML = "";
        document.querySelector("#city").innerHTML = data.city;
        document.querySelector("#city").style.color = "lightblue";
        document.querySelector("#latitude").innerHTML = data.latitude;
        document.querySelector("#latitude").style.color = "lightblue";
        document.querySelector("#longitude").innerHTML = data.longitude;
        document.querySelector("#longitude").style.color = "lightblue";
    }
    else {
        zipError.innerHTML = "Zip code not found!";
        zipError.style.color = "red";
        document.querySelector("#city").innerHTML = "";
        document.querySelector("#latitude").innerHTML = "";
        document.querySelector("#longitude").innerHTML = "";
    }
    
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
    if (username.length === 0) {
        usernameError.innerHTML = "Username Required!";
        usernameError.style.color = "red";
    } else if (data.available) {
        usernameError.innerHTML = " Username available!";
        usernameError.style.color = "green";
    } else if (!data.available) {
        usernameError.innerHTML = " Username taken!";
        usernameError.style.color = "red";
    } 
}

//Validate form data
function validateForm(e) {
    let isValid = true;
    //validate that at least one field is not blank
    let fName = document.querySelector("#fName").value;
    let lName = document.querySelector("#lName").value;
    let tName = document.querySelector("#tName").value;
    let zip = document.querySelector("#zip").value;
    let city = document.querySelector("#city").value;
    let email = document.querySelector("#email").value;
    if (!fName && !lName && !tName && !zip && !city && !email){
        document.querySelector("#searchError").innerHTML = "You must enter at least one value to view spy search results!";
        document.querySelector("#searchError").style.color = "red";
        isValid = false;
    }

    if (!isValid) {
        e.preventDefault();
    }

}

async function examplePwd() {
    let password = document.querySelector("#password").value;
    let url = `https://csumb.space/api/suggestedPassword.php?length=8`;
    let response = await fetch(url);
    let data = await response.json();
    let suggestedPwd = document.querySelector("#suggestedPwd");
    suggestedPwd.innerHTML = `Password must be 6+ characters, suggested password: ${data.password} `;
    suggestedPwd.style.color = "lightblue";
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