//Even Listener(s)
document.querySelector("button").addEventListener("click", gradeQuiz);

//Global Variables
var score = 0;
var attempts = localStorage.getItem("total_attempts");

displayQ4Choices();

//Functions
function displayQ4Choices() {
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
    q4ChoicesArray = _.shuffle(q4ChoicesArray);
    for (let i=0; i < q4ChoicesArray.length; i++) {
        document.querySelector("#q4Choices").innerHTML += ` <input type="radio" name="q4" id= "${q4ChoicesArray[i]}" 
            value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label>`;
    }
}//displayQ4choices


function isFormValid() {
    let isValid = true;
    if(document.querySelector("#q1").value == "") {
        isValid = false;
        document.querySelector("#validationFdbk").innerHTML = "Question 1 was not answered.";
    }
    return isValid;
}//isFormValid

function rightAnswer(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/checkmark.png' alt='Checkmark'>";
    score += 20;
}

function wrongAnswer(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
    document.querySelector(`#q${index}Feedback`).className = "bg-warning text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='xmark'>";
}


function gradeQuiz() {
    console.log("Grading quiz...");
    document.querySelector("#validationFdbk").innerHTML = ""; //resets validation fdbk
    if (!isFormValid()) {
        return;
    }

    //variables
    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    let q4Response = document.querySelector("input[name=q4]:checked").value;
    let q5Response = document.querySelector("#q5").value.toLowerCase();


    //Grading question 1
    if (q1Response == "sacramento") {
        rightAnswer(1);
    }
    else {
        wrongAnswer(1);
    }


    //Grading question 2
    if (q2Response == "mo") {
        rightAnswer(2);
    }
    else {
       wrongAnswer(2);
    }

    //Grading question 3
    if (document.querySelector("#Jefferson").checked && document.querySelector("#Roosevelt").checked && 
        !document.querySelector("#Jackson").checked && !document.querySelector("#Franklin").checked) {
        rightAnswer(3);
    }
    else {
       wrongAnswer(3);
    }

    // Grading question 4
    if (q4Response == "Rhode Island") {
        rightAnswer(4);
    }
    else {
       wrongAnswer(4);
    }

    //Grading question 5
    if (q5Response == "sacramento") {
        rightAnswer(5);
    }
    else {
        wrongAnswer(5);
    }

    //Display quiz score and attempts per assignment specs:
    document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;
    document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;
    if (score < 80) {
        document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;
        document.querySelector(`#totalScore`).className = "bg-danger text-black";
    } else if (score == 80) {
        document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;
        document.querySelector(`#totalScore`).className = "bg-success text-black";
    } else if (score > 80) {
        document.querySelector("#totalScore").innerHTML = `Total Score: ${score}! NICE WORK!!`;
        document.querySelector(`#totalScore`).className = "bg-success text-white";
    }
    localStorage.setItem("total_attempts", attempts);

}//gradeQuiz