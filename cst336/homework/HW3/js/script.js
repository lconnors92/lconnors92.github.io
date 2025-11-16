//event listeners
document.querySelector("#searchForm").addEventListener("submit", function(event) {
    validateForm(event);
});

displayCountries();
displayCities();

//Display countries
async function displayCountries() {
    let url = `https://fakerapi.it/api/v1/persons?_seed=1234675&_quantity=80`;
    let response = await fetch(url);
    let jsonData = await response.json();
    let persons = jsonData.data; //Instead of the records being in a set called persons like the url... it's "data"... ;(
    let countriesList = document.querySelector("#country");
    countriesList.innerHTML = "<option value=''> Select Country </option>"
    for (let i=0; i < persons.length; i++) {
            countriesList.innerHTML += `<option value="${persons[i].address.country}">${persons[i].address.country}</option>`;
        }
    }

//Display cities
async function displayCities() {
    let url = `https://fakerapi.it/api/v1/persons?_seed=1234675&_quantity=80`;
    let response = await fetch(url);
    let jsonData = await response.json();
    let persons = jsonData.data; //Instead of the records being in a set called persons like the url... it's "data"... ;(
    let citiesList = document.querySelector("#city");
    citiesList.innerHTML = "<option value=''> Select City </option>"
    for (let i=0; i < persons.length; i++) {
            citiesList.innerHTML += `<option value="${persons[i].address.city}">${persons[i].address.city}</option>`;
        }
    }


//Validate form data
function validateForm(e) {
    e.preventDefault();
    let isValid = true;
    let fName = document.querySelector("#fName").value;
    let lName = document.querySelector("#lName").value;
    let country = document.querySelector("#country").value;
    let city = document.querySelector("#city").value;
    let email = document.querySelector("#email").value;
    //validate that at least one field is not blank
    if (!fName && !lName && !country && !city && !email){
        document.querySelector("#searchError").innerHTML = "You must enter at least one value to view spy search results!";
        document.querySelector("#searchError").style.color = "red";
        isValid = false;
    }

    if (isValid) {
        spySearch(fName, lName, country, city, email);
        document.querySelector("#searchError").innerHTML = "";
    }


}

//example record from url:
//{"id":1,"firstname":"Lavern","lastname":"Lowe","email":"will.nicolas@zulauf.com","phone":"+15208450979",
// "birthday":"1942-02-18","gender":"male","address":{"id":1,"street":"8869 Fritsch Cliffs",
// "streetName":"Hayes Manor","buildingNumber":"1986","city":"Ferryhaven",
// "zipcode":"05836-7861","country":"United States","country_code":"US","latitude":20.255277,"longitude":-83.196957},
// "website":"http:\/\/schmitt.com","image":"http:\/\/placeimg.com\/640\/480\/people"}
// _seed=# to fix results from faker site
async function spySearch(fName, lName, country, city, email) {
    let resultsList = document.querySelector("#results");
    resultsList.innerHTML = "F.R.E.D. is fetching the results via FAKER API, this may take a moment........";
    let matches = 0;
    let url= `https://fakerapi.it/api/v1/persons?_seed=1234675&_quantity=80`;
    let response = await fetch(url);
    let jsonData = await response.json();
    let persons = jsonData.data; //Instead of the records being in a set called persons like the url... it's "data"... ;(
    resultsList.innerHTML = `Secret Spy Person of Interest Search Results:<br>`;
    for (let i=0; i < persons.length; i++) {
        if ((persons[i].firstname.includes(fName) && fName.length != 0) || (persons[i].lastname.includes(lName) && (lName.length != 0)) || 
        (persons[i].address.country == country) || (persons[i].address.city == city) || (persons[i].email.includes(email) && email.length != 0 )) {
            resultsList.innerHTML += `<br>TARGET NAME: ${persons[i].firstname}  ${persons[i].lastname}<br> 
                                          TARGET LOCATION: ${persons[i].address.country},  ${persons[i].address.city}<br> 
                                          TARGET LATITUDE: ${persons[i].address.latitude}<br>
                                          TARGET LONGITUDE: ${persons[i].address.longitude}<br>
                                          TARGET EMAIL: ${persons[i].email}<br><br>`;
            matches++;
        }
    }
    if (matches == 0) {
        document.querySelector("#searchError").innerHTML = "Sorry, no P.O.I. to return from that search!!";
        document.querySelector("#searchError").style.color = "orange";
        resultsList.innerHTML = "No matching attributes found."
        }
}

