// Create funtions for each operation

function add(x, y){
    return parseFloat(x) + parseFloat(y)
}

function subtract(x, y){
    return parseFloat(x) - parseFloat(y)
}

function multiply(x, y){
    return parseFloat(x) * parseFloat(y)
}

function divide(x, y){
    return parseFloat(x)/parseFloat(y)
}

//here I will store single calculation elements that will be displayed
let lineUp = [];

//here are the curent numbers that the calculation is performed on
// let operationElements = {
//     operator: null,
//     number: null
// }


const operate = function(operator, num1, num2){ 
let result = '';
   if(operator === 'subtract'){
        result = subtract(num1, num2);
    } else if(operator === 'multiply'){
        result = multiply(num1, num2);
    } else if(operator === 'divide'){
        result = divide(num1, num2);
    } else if(operator === 'add'){
        result = add(num1, num2)
    }
   return result
}

// const clear = function(){
//     lineUp = [];
//     operationElements = {operator: null, number: null};
//     result = null;
//     display.innerText = 0;
// }

const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.keys');
const display = document.querySelector('.display');



keys.addEventListener('click', (event) => {
    if(event.target.matches('button')){
        const key = event.target;
        const keyContent = key.innerText;
        const action = key.getAttribute('data-action');
        const displayedContent = display.innerText;
        const previousKeyType = calculator.dataset.previousKeyType;
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedContent;

        if(!action){
            //we have a number
            if(displayedContent === '0' || previousKeyType === 'operator'){
                display.innerText = keyContent;
            } else {
                display.innerText = displayedContent + keyContent
            }
             calculator.dataset.previousKeyType = 'number'
        } 
        
        if(action === 'add' || action === 'subtract' || action === 'divide' || action === 'multiply'){

            if (firstValue && operator && previousKeyType !== 'operator') {
                const calculatedValue = operate(operator, firstValue, secondValue);
                display.innerText = calculatedValue;
                calculator.dataset.firstValue = calculatedValue;
            } else {
                calculator.dataset.firstValue = displayedContent;
            }

            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.operator = action;
        }
        if(action === 'equal'){
            
            // display.innerText = operate(operator, firstValue, secondValue)
            calculator.dataset.previousKeyType = 'equal';
        }
        if(action === 'clear'){
            calculator.dataset.previousKeyType = 'clear'
        }
        if(action === 'delete'){
            calculator.dataset.previousKeyType = 'delete'
        } 
        if(action === 'decimal'){
            if(!displayedContent.includes('.')){
                display.innerText = displayedContent + '.'
            } 
            if(previousKeyType === 'operator'){
                display.innerText = '0.'
            }
            calculator.dataset.previousKeyType = 'decimal';
        }
        if(action === 'percent'){
            calculator.dataset.previousKeyType = 'percent'
        }
        if(action === 'negative'){  
            calculator.dataset.previousKeyType = 'negative'
        }
    }
    
});

// Egde cases:
// -> digit no longer than 9
// -> is-depressed when user clicks the button




// button.forEach((button) => {
//     button.addEventListener('click', (event) => {
//      //what will happen when a number is pressed
//     let currentTarget = event.target.innerText;
//     let currentNumber = operationElements.number;
//      if(event.target.className === 'num-btn'){
//         // for multidigit: check if the previous entry was a number
//         if(typeof lineUp[lineUp.length -1] === 'number'){
//             let previousNumber = lineUp[lineUp.length-1];
//             let multiDigit = previousNumber.toString() + currentTarget;
//             //replace the previewus number with the generated multidigit number
//             lineUp.splice(-1, 1, Number(multiDigit)); 
//         } else if(typeof currentNumber === 'string' && currentNumber.charAt(currentNumber.length-1) === '.'){
//             let decimal = currentNumber + currentTarget;
//             lineUp.splice(-1, 1, parseFloat(decimal))  
//         } else {
//             lineUp.push(Number(currentTarget));
//         }
//         //the current number will be stored in an object
//         operationElements.number = lineUp[lineUp.length -1];
//         display.innerText = operationElements.number;
//         //what if a operator button is pressed
//      } else if(event.target.className === 'operator') {
//          if(result !== null && operationElements.number === null){
//              lineUp.push(result);
//          }
         
//          // Edge case: user is pressing multiple operators in a row
//          if(typeof lineUp[lineUp.length -1] !== 'number'){
//              lineUp.splice(-1, 1, currentTarget)
//          } else {
//              lineUp.push(currentTarget);
//          }
//          operationElements.operator = currentTarget;

//         //what number shuld be shown after the operator is pressed
//          if(lineUp.length < 3){
//             display.innerText = lineUp[0];
//          } else {
//             display.innerText = result;
//          }
//      } else if(event.target.className === 'negative'){
//          if(operationElements.number < 0){
//             operationElements.number = - operationElements.number
//          } else {
//             operationElements.number = operationElements.number * (-1);
//          }
//             lineUp.splice(-1, 1, operationElements.number);
//             display.innerText = operationElements.number

//      } else if(event.target.className === 'decimals'){
//         operationElements.number = operationElements.number + '.'
//         display.innerText = operationElements.number
//      } else if(event.target.className === 'percent'){
//         operationElements.number = operationElements.number/100;
//         lineUp.splice(-1, 1, operationElements.number);
//         display.innerText = operationElements.number;
//      } else if(event.target.className === 'delete'){
//          let adjNumber = currentNumber.toString();
//          operationElements.number = Number(adjNumber.slice(0, -1));
//          lineUp.splice(-1, 1, operationElements.number)
//          display.innerText = operationElements.number;
//      } else if(event.target.className === 'clear'){
//          clear()
//      } 

//      if(currentTarget === '='){
//         lineUp = [];
//         operationElements = {operator: null, number: null};
//      }

//      if(lineUp.length === 3){
//         operate(operationElements.operator, lineUp[0], lineUp[2]);
//      } else if(lineUp.length > 3 && event.target.className === 'num-btn'){
//         operate(operationElements.operator, result, lineUp[lineUp.length -1]);
//      }
//     });
// })
