const repaymentInputContainer = document.querySelector(".repaymentInputContainer");
const interestOnlyInputContainer = document.querySelector(".interestOnlyInputContainer");
const clearButton = document.getElementById("clearButton");
const calculateButton = document.getElementById("calculateButton");
const clearState = document.getElementById("clearState");
const resultsState = document.getElementById("resultsState");
const monthlyRepayment = document.getElementById("monthlyRepayment");
const totalRepay = document.getElementById("totalRepay");
const radioInputs = [repaymentInputContainer, interestOnlyInputContainer]

calculateButton.addEventListener("click", calculate);
repaymentInputContainer.addEventListener("click", repaymentRadioChecked);
interestOnlyInputContainer.addEventListener("click", interestRadioChecked);
clearButton.addEventListener("click", clearForm);

radioInputs.forEach(item =>{
    item.addEventListener("click", hide);
})

let formatter = new Intl.NumberFormat('en-GB', {
});

const allInputs = document.querySelectorAll('input');
allInputs.forEach(item => {                                     //input fields validation
    item.addEventListener("keydown", function(e){
    if (!e.code.startsWith("Digit") && e.key!=="Backspace" && e.key!=="." || e.key==="." && this.value.includes(".")){
        e.preventDefault();
    }
})
});

allInputs.forEach(item => {                                     //input fields validation
    item.addEventListener("focusout", function(e){
    if(item.id==="mortAm"){
        validationError(document.getElementById("inputContainerMortAmount"), document.getElementById("poundIcon"), document.getElementById("mortAm"), document.getElementById("mortgageAm"));
    }
    if(item.id==="mortTerm"){
        validationError(document.getElementById("inputContainerTerm"), document.getElementById("yearsIcon"), document.getElementById("mortTerm"), document.getElementById("mortgageTerm"));
    }
    if(item.id==="intRate"){
        validationError(document.getElementById("inputContainerRate"), document.getElementById("percentIcon"), document.getElementById("intRate"), document.getElementById("interestRate"));
    }
    
    })
});

function validationError(elementName1, elementName2, elementInput, containerName){
    if(!(+elementInput.value)){
        elementName1.style.borderColor="red";
        elementName2.style.backgroundColor="red";
        elementName2.style.color="white";
        containerName.querySelector('.erroritle').style.display="block";
    } else{
        elementName1.style.borderColor="hsl(200, 26%, 54%)";
        elementName2.style.backgroundColor="hsl(202, 86%, 94%)";
        elementName2.style.color="hsl(200, 24%, 40%)";
        containerName.querySelector('.erroritle').style.display="none";
    }
    }

function repaymentRadioChecked(){
    document.getElementById('typeRepayment').checked = true;
    if  (document.getElementById('typeRepayment').checked){
        document.querySelector(".customRadio1").style = "background-color: hsl(61, 70%, 52%)"
        document.querySelector(".customRadio2").style = "background-color: 0"
    };

}
function interestRadioChecked(){
    document.getElementById('typeInterest').checked = true;
    if  (document.getElementById('typeInterest').checked){
        document.querySelector(".customRadio2").style = "background-color: hsl(61, 70%, 52%)";
        document.querySelector(".customRadio1").style = "background-color: 0";
    };
}

function clearRadioEffect(){
    document.getElementById('typeInterest').checked = false;
    document.getElementById('typeRepayment').checked = false;
    document.querySelector(".customRadio1").style = "background-color: 0";
    document.querySelector(".customRadio2").style = "background-color: 0";
}

function clearForm(){
    document.querySelectorAll('.clearable').forEach(input => input.value='');
    clearRadioEffect();
    clearState.style = "display: flex";
    resultsState.style = "display: none;";
    document.querySelectorAll('.erroritle').forEach(item => {
        item.style.display="none";
    })
    document.querySelectorAll('span').forEach(item =>{
        item.style.borderColor="hsl(200, 26%, 54%)"
    })
    document.querySelectorAll('.Icon').forEach(item =>{
        item.style.backgroundColor="hsl(202, 86%, 94%)";
        item.style.color="hsl(200, 24%, 40%)";
    })
}

let repaymentMortgageValue;
let repaymentMortgageValueTotal
function repaymentMortgage(){
    let totalValue = +document.getElementById("mortAm").value;
    let mortTerm = +document.getElementById("mortTerm").value;
    let intRate = +document.getElementById("intRate").value;
    let monthlyIntRate = intRate/100;
    let r = monthlyIntRate/12;
    let n = mortTerm*12;
    let r1n = (1+r)**n;
    repaymentMortgageValue = totalValue*(r*r1n) / (r1n-1);
    repaymentMortgageValueTotal = repaymentMortgageValue*12*mortTerm;
    monthlyRepayment.innerHTML="£"+formatter.format(repaymentMortgageValue.toFixed(2));
    totalRepay.innerHTML="£"+formatter.format(repaymentMortgageValueTotal.toFixed(2));

}
function interestOnlyMortgage(){
    let totalValue = +document.getElementById("mortAm").value;
    let mortTerm = +document.getElementById("mortTerm").value;
    let intRate = +document.getElementById("intRate").value;
    let monthlyIntRate = intRate/100;
    let r = monthlyIntRate/12;
    repaymentMortgageValue = totalValue*r;
    let interestPayments = repaymentMortgageValue * (mortTerm*12);
    repaymentMortgageValueTotal = totalValue+interestPayments;
    monthlyRepayment.innerHTML="£"+formatter.format(repaymentMortgageValue.toFixed(2));
    totalRepay.innerHTML="£"+formatter.format(repaymentMortgageValueTotal.toFixed(2));
}

function calculate(){
    if((document.getElementById("typeRepayment").checked || document.getElementById("typeInterest").checked) &&
(+document.getElementById("mortAm").value && +document.getElementById("mortTerm").value && +document.getElementById("intRate").value)){
    clearState.style = "display: none";
    resultsState.style = "display: flex;";
    if(document.getElementById("mortAm").value.trim() 
        && document.getElementById("mortTerm").value.trim() 
        && document.getElementById("intRate").value.trim()){
            if(document.getElementById("typeRepayment").checked){
                repaymentMortgage();
            }
            if(document.getElementById("typeInterest").checked){
                interestOnlyMortgage();
            }
    }
    }else if(!(document.getElementById("typeRepayment").checked || document.getElementById("typeInterest").checked)){
        document.querySelector(".mortType").querySelector(".erroritle").style.display="flex";
    }
    if(!(+document.getElementById("mortTerm").value)){
        validationError(document.getElementById("inputContainerTerm"), document.getElementById("yearsIcon"), document.getElementById("mortTerm"), document.getElementById("mortgageTerm"));
    }
    if(!(+document.getElementById("mortAm").value)){
        validationError(document.getElementById("inputContainerMortAmount"), document.getElementById("poundIcon"), document.getElementById("mortAm"), document.getElementById("mortgageAm"));
    }
    if(!(+document.getElementById("intRate").value)){
        validationError(document.getElementById("inputContainerRate"), document.getElementById("percentIcon"), document.getElementById("intRate"), document.getElementById("interestRate"));
    }
    }


function hide(){
        if(document.getElementById("typeInterest").checked || document.getElementById("typeRepayment").checked){
        document.querySelector(".mortType").querySelector(".erroritle").style.display="none";
        }
}
