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

//here I will store single calculation elements that will be displayed
let lineUp = [];

//here are the curent numbers that the calculation is performed on
let operationElements = {
    operator: null,
    number: null
}

let result = null;

const operate = function(operator, num1, num2){ 
   if(operator === '-'){
        result = substract(num1, num2);
    } else if(operator === 'x'){
        result = multiply(num1, num2);
    } else if(operator === '÷'){
        result = divide(num1, num2);
    } else if(operator === '+'){
        result = add(num1, num2)
    }
}

const clear = function(){
    lineUp = [];
    operationElements = {operator: null, number: null};
    result = null;
    display.innerText = 0;
}

const display = document.getElementById('display');
display.innerText = 0;

const button = document.querySelectorAll('button');

button.forEach((button) => {
    button.addEventListener('click', (event) => {
        //what will happen when a number is pressed
    let currentTarget = event.target.innerText;
    let currentNumber = operationElements.number;
     if(event.target.className === 'num-btn'){
         console.log(currentNumber)
        //what is a user wants to enter a multidigit number
        if(typeof currentNumber === 'string' && currentNumber.charAt(currentNumber.length-1) === '.'){
            let decimal = currentNumber + currentTarget;
            lineUp.splice(-1, 1, parseFloat(decimal))  
        } else if(typeof lineUp[lineUp.length -1] === 'number'){
            let previousNumber = lineUp[lineUp.length-1];
            let multiDigit = previousNumber.toString() + currentTarget;
            //replace the previewus number with the generated multidigit number
            lineUp.splice(-1, 1, Number(multiDigit)); 
        } else {
            lineUp.push(Number(currentTarget));
        }
        //the current number will be stored in an object
        operationElements.number = lineUp[lineUp.length -1];
        display.innerText = operationElements.number;
        //what if a operator button is pressed
     } else if(event.target.className === 'operator') {
         if(result !== null && operationElements.number === null){
             lineUp.push(result);
         }
         
         // Edge case: user is pressing multiple operators in a row
         if(typeof lineUp[lineUp.length -1] !== 'number'){
             lineUp.splice(-1, 1, currentTarget)
         } else {
             lineUp.push(currentTarget);
         }
         operationElements.operator = currentTarget;

        //what number shuld be shown after the operator is pressed
         if(lineUp.length < 3){
            display.innerText = lineUp[0];
         } else {
            display.innerText = result;
         }
     } else if(event.target.className === 'negative'){
         if(operationElements.number < 0){
            operationElements.number = - operationElements.number
         } else {
            operationElements.number = operationElements.number * (-1);
         }
            lineUp.splice(-1, 1, operationElements.number);
            display.innerText = operationElements.number

     } else if(event.target.className === 'decimals'){
        operationElements.number = operationElements.number + '.'
        display.innerText = operationElements.number
     } else if(event.target.className === 'percent'){
        operationElements.number = operationElements.number/100;
        lineUp.splice(-1, 1, operationElements.number);
        display.innerText = operationElements.number;
     } else if(event.target.className === 'delete'){
         let adjNumber = currentNumber.toString();
         operationElements.number = Number(adjNumber.slice(0, -1));
         lineUp.splice(-1, 1, operationElements.number)
         display.innerText = operationElements.number;
     } else if(event.target.className === 'clear'){
         clear()
     } 

     if(currentTarget === '='){
        lineUp = [];
        operationElements = {operator: null, number: null};
     }

     if(lineUp.length === 3){
        operate(operationElements.operator, lineUp[0], lineUp[2]);
     } else if(lineUp.length > 3 && event.target.className === 'num-btn'){
        operate(operationElements.operator, result, lineUp[lineUp.length -1]);
     }
     
     console.log(lineUp);
     console.log(operationElements);
     console.log(result)
    });
})
