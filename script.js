// Create funtions for each operation

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



keys.addEventListener('click', (event) => {
    if(event.target.matches('button')){
        const key = event.target;
        let keyContent = key.innerText;
        let action = key.getAttribute('data-action');
        let displayedContent = display.innerText;
        let previousKeyType = calculator.dataset.previousKeyType;
        let firstValue = calculator.dataset.firstValue;
        let operator = calculator.dataset.operator;
        let secondValue = displayedContent;
        console.log(previousKeyType, firstValue, operator, secondValue)
        if(!action){
            //we have a number
            if(!firstValue || previousKeyType === 'operator'){
                display.innerText = keyContent;
            } else if(previousKeyType === 'calculate'){
                display.innerText = keyContent;
                calculator.dataset.firstValue = '';
                calculator.dataset.operator = '';
            } else {
                display.innerText = displayedContent + keyContent;
            }
             calculator.dataset.previousKeyType = 'number';
        } 
        if(action === 'add' || action === 'subtract' || action === 'divide' || action === 'multiply'){
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
        if(action === 'calculate'){
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
        if(action === 'clear'){
            display.innerText = '0';
            calculator.dataset.firstValue = null;
            calculator.dataset.modValue = null;
            calculator.dataset.operator = null;
            calculator.dataset.previousKeyType = 'clear';
        }
        if(action === 'delete'){
            if(displayedContent !== '0'){
                display.innerText = displayedContent.slice(0, -1)
            }
            calculator.dataset.previousKeyType = 'delete'
        } 
        if(action === 'decimal'){
            if(!displayedContent.includes('.')){
                display.innerText = displayedContent + '.'
            } 
            if(previousKeyType === 'operator' || previousKeyType === 'equal'){
                display.innerText = '0.'
            }
            calculator.dataset.previousKeyType = 'decimal';
        }
        if(action === 'percent'){
            display.innerText = displayedContent/100;
            calculator.dataset.previousKeyType = 'percent';
        }
        if(action === 'negative'){ 
            if(!displayedContent.includes('-') && displayedContent !== '0'){
                display.innerText = '-' + displayedContent;
            } else if(displayedContent.includes('-')) {
                display.innerText = displayedContent.slice(1);
            }
            calculator.dataset.previousKeyType = 'negative';
        }
    }
    
});

// Egde cases:
// -> digit no longer than 9
// -> is-depressed when user clicks the button

