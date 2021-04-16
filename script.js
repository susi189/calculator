// In this function I perform the calculations

const operate = function(operator, num1, num2){ 
    const firstNum = parseFloat(num1); 
    const secondNum = parseFloat(num2);
   if(operator === 'add'){
       return firstNum + secondNum
   }
   if(operator === 'subtract'){
        return firstNum - secondNum;
    } 
    if(operator === 'multiply'){
        return firstNum * secondNum;
    } 
    if(operator === 'divide'){
        return firstNum/secondNum
    }
}

const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.keys');
const display = document.querySelector('.display');



//Improvement options for consider in the future: refactor the code to make the event listener more readable 

keys.addEventListener('click', (event) => {
    if(!event.target.matches('button')){
        return
    }
        const key = event.target;
        const keyContent = key.innerText;
        const keyType = key.getAttribute('data-action');
        let displayedContent = display.innerText;
        let previousKeyType = calculator.dataset.previousKeyType;
        let firstValue = calculator.dataset.firstValue;
        let operator = calculator.dataset.operator;
        let secondValue = displayedContent;
        if(keyType === 'number'){
            if (displayedContent === '0' && !firstValue || previousKeyType === 'operator'){
                display.innerText = keyContent;
            } else if(previousKeyType === 'calculate'){
                display.innerText = keyContent;
                calculator.dataset.firstValue = '';
                calculator.dataset.operator = '';
            } else if(displayedContent.length > 8){
                display.innerText = displayedContent
            } else {
                display.innerText = displayedContent + keyContent;
            }
             calculator.dataset.previousKeyType = 'number';
        } 
        //Making numbers negative
        if(keyType === 'negative'){ 
            if(!displayedContent.includes('-') && displayedContent !== '0'){
                display.innerText = '-' + displayedContent;
            } else if(displayedContent.includes('-')) {
                display.innerText = displayedContent.slice(1);
            }
            calculator.dataset.previousKeyType = 'negative';
        }
         if(keyType === 'decimal'){
            if(displayedContent.length > 7){
                display.innerText = displayedContent;
            } else if(!displayedContent.includes('.')){
                display.innerText = displayedContent + '.'
            } 
            if(previousKeyType === 'operator' || previousKeyType === 'equal'){
                display.innerText = '0.'
            }
            calculator.dataset.previousKeyType = 'decimal';
        }

        //if the key is an operator for calculations
        if(keyType === 'add' || keyType === 'subtract' || keyType === 'divide' || keyType === 'multiply'){
            if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
                const calculatedValue = operate(operator, firstValue, secondValue);
                display.innerText = calculatedValue;
                calculator.dataset.firstValue = calculatedValue;
            } else {
                calculator.dataset.firstValue = displayedContent;
            }

            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.operator = action;
        }
        //If the key is a equal sign
        if(keyType === 'calculate'){
            if(firstValue){
                if(previousKeyType === 'calculate'){
                    firstValue = displayedContent;
                    secondValue = calculator.dataset.modValue;
                }
                display.innerText = operate(operator, firstValue, secondValue); 
            }
            calculator.dataset.modValue = secondValue;
            calculator.dataset.previousKeyType = 'calculate';
        }
        //If the key is a AC sign
        if(keyType === 'clear'){
            display.innerText = '0';
            calculator.dataset.firstValue = '';
            calculator.dataset.modValue = '';
            calculator.dataset.operator = '';
            calculator.dataset.previousKeyType = 'clear';
        }
        //If the key is a backspace sign
        if(keyType === 'delete'){
            if(displayedContent.length > 1){
                display.innerText = displayedContent.slice(0, -1)
            } else {
                display.innerText = '0'
            }
            calculator.dataset.previousKeyType = 'delete'
        }
        // if the key is a % sign
        if(keyType === 'percent'){
            display.innerText = displayedContent/100;
            calculator.dataset.previousKeyType = 'percent';
        }
    }
});

// Egde cases:
// -> is-depressed when user clicks the button

