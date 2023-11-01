const formDiv = document.getElementById("form-div");
const successDiv = document.getElementById("success-div");
const continueButton = document.getElementById("continue-button");

const inputName = document.getElementById("input-name");
const inputCardNumber = document.getElementById("input-card-number");
const inputExpMonth = document.getElementById("input-month");
const inputExpYear = document.getElementById("input-year");
const inputCvc = document.getElementById("input-cvc");
const confirmButton = document.getElementById("confirm-button");

const oneToFour = document.getElementById("one-to-four");
const fiveToEight = document.getElementById("five-to-eight");
const nineToTwelve = document.getElementById("nine-to-twelve");
const thirteenToSixteen = document.getElementById("thirteen-to-sixteen");

const cardName = document.getElementById("name");
const cardExpMonth = document.getElementById("month-span");
const cardExpYear = document.getElementById("year-span");
const cardCvc = document.getElementById("cvc");

const spanErrorName = document.getElementById("name-input-error");
const spanErrorCardNumber = document.getElementById("card-number-input-error");
const spanErrorExpDate = document.getElementById("expdate-input-error");
const spanErrorCVC = document.getElementById("cvc-input-error");


confirmButton.addEventListener("click", e => {
    e.preventDefault

    let name = inputName.value.trim();
    let number = inputCardNumber.value.trim();
    let month = inputExpMonth.value.trim();
    let year = inputExpYear.value.trim();
    let cvc = inputCvc.value.trim();
    let regex = new RegExp('^[0-9]+$');
    let currentMonth = new Date().getMonth() + 1;
    let currentYear = new Date().getFullYear().toString().slice(2, 4);

    if(name == "" || (number == "" || !number.match(regex) || number.length != 16) || (month == "" || !month.match(regex) || month > 12) || (year = "" || !year.match(regex) || year < currentYear) || (year == currentYear && month <= currentMonth) || (cvc == "" || !cvc.match(regex) || cvc.length != 3)){
        if(name == ""){
            spanErrorName.innerHTML = "Can't be blank";
            spanErrorName.style.display = "flex";
            inputName.parentElement.classList.add("border-error");
        }

        if(number == ""){
            cardNumberError("Can't be blank");
        }else if(!number.match(regex)){
            cardNumberError("Wrong format, numbers only");
        }else if(number.length != 16){
            cardNumberError("Must contain 16 digits");
        }

        if(month == ""){
            dateError("Can't be blank");
            inputExpMonth.parentElement.classList.add("border-error");
        }else if(!month.match(regex)){
            dateError("Wrong format");
            inputExpMonth.parentElement.classList.add("border-error");
        }else if(month > 12){
            dateError("Invalid date");
            inputExpMonth.parentElement.classList.add("border-error");
        }

        if(year == ""){
            dateError("Can't be blank");
            inputExpYear.parentElement.classList.add("border-error");
        }else if(!year.match(regex)){
            dateError("Wrong format");
            inputExpYear.parentElement.classList.add("border-error");
        }else if(year < currentYear){
            dateError("Invalid date");
            inputExpYear.parentElement.classList.add("border-error");
        }else if(year == currentYear && month <= currentMonth){
            dateError("Invalid date");
            inputExpYear.parentElement.classList.add("border-error");
            inputExpMonth.parentElement.classList.add("border-error");
        }

        if(cvc == ""){
            cvcError("Can't be blank");
            inputCvc.parentElement.classList.add("border-error");
        }else if(!cvc.match(regex)){
            cvcError("Wrong format");
        }else if(cvc.length != 3){
            cvcError("Invalid CVC");
        }
        
    }else{
        formDiv.style.display = "none";
        successDiv.style.display = "flex";
    }

});

continueButton.addEventListener("click", e => {
    location.reload();
})

function cardNumberError(message){
    spanErrorCardNumber.innerHTML = message;
    spanErrorCardNumber.style.display = "flex";
    inputCardNumber.parentElement.classList.add("border-error");
}

function dateError(message){
    spanErrorExpDate.innerHTML = message;
    spanErrorExpDate.style.display = "flex";
}

function cvcError(message){
    spanErrorCVC.innerHTML = message;
    spanErrorCVC.style.display = "flex";
    inputCvc.parentElement.classList.add("border-error");
}

function typingName(){
    let name = inputName.value.trim();

    cardName.innerHTML = name;
    spanErrorName.style.display = "none";
    inputName.parentElement.classList.remove("border-error");
}

function typingNumber(){
    let number = inputCardNumber.value.trim();

    oneToFour.innerHTML = number.slice(0, 4);
    fiveToEight.innerHTML = number.slice(4, 8);
    nineToTwelve.innerHTML = number.slice(8, 12);
    thirteenToSixteen.innerHTML = number.slice(12, 16);

    spanErrorCardNumber.style.display = "none";
    inputCardNumber.parentElement.classList.remove("border-error");
}

function typingExpDate(){
    let expMonth = inputExpMonth.value.trim();
    let expYear = inputExpYear.value.trim();

    cardExpMonth.innerHTML = expMonth;
    cardExpYear.innerHTML = expYear;

    spanErrorExpDate.style.display = "none";
    if(inputExpMonth.parentElement.classList.contains("border-error")){
        inputExpMonth.parentElement.classList.remove("border-error");
    }
    if(inputExpYear.parentElement.classList.contains("border-error")){
        inputExpYear.parentElement.classList.remove("border-error");
    }
}

function typingCvc(){
    let cvc = inputCvc.value.trim();
    cardCvc.innerHTML = cvc;
    
    spanErrorCVC.style.display = "none";
    inputCvc.parentElement.classList.remove("border-error");
}