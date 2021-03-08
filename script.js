// Create funtions for each operation

function add(x, y){
    return x + y
}

function substract(x, y){
    return x - y
}

function multiply(x, y){
    return x * y
}

function divide(x, y){
    return x/y
}

const lineUp = [];
const operationElements = {
    operator: null,
    number: null,
    result: null
}

const operate = function(operator, num1, num2){ 
    if(operator === '+'){
        result = add(num1, num2);
    } else if(operator === '-'){
        result = substract(num1, num2);
    } else if(operator === 'x'){
        result = multiply(num1, num2);
    } else if(operator === '÷'){
        result = divide(num1, num2);
    } else if (operator === '='){
        result = null;
    }
}

const display = document.getElementById('display');

const button = document.querySelectorAll('button');

const number = document.querySelectorAll('.num-btn');


const operator = document.querySelector('.operator');

button.forEach((button) => {
    button.addEventListener('click', (event) => {
     if(event.target.className === 'num-btn'){
        let currentNumber = event.target.innerText;
        if(typeof lineUp[lineUp.length -1] === 'number'){
            let previousNumber = lineUp[lineUp.length-1];
            let multiDigit = previousNumber.toString() + currentNumber;
            lineUp.splice(-1, 1, Number(multiDigit)); 
        } else {
            lineUp.push(Number(event.target.innerText));
        }
        operationElements.number = lineUp[lineUp.length -1];
        display.innerText = operationElements.number;
     } else if(event.target.className === 'operator') {
         if(typeof lineUp[lineUp.length -1] !== 'number'){
            lineUp.splice(-1, 1, event.target.innerText);
         } else {
            lineUp.push(event.target.innerText);
         }
         operationElements.operator = lineUp[lineUp.length -1];
     }
     if(typeof lineUp[0] !== 'number'){
         lineUp.unshift(0);
         operationElements.number = 0;
     }
     console.log(lineUp);
     console.log(operationElements);
     if(lineUp.length === 3){
        operate()
        display.innerText = result
     } else if(lineUp.length > 3){
        operate()
     }
    });
})
