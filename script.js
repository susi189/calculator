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

const operationElem = [];
const result = null;

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
        if(typeof operationElem[operationElem.length -1] === 'number'){
            let previousNumber = operationElem[operationElem.length -1];
            let multiDigit = previousNumber.toString() + currentNumber
            operationElem.splice(-1, 1, Number(multiDigit));
        } else {
            operationElem.push(Number(event.target.innerText))
        }
     } else {
         operationElem.push(event.target.innerText);
     }
     console.log(operationElem)
    });
})
