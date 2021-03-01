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

const operation = {
    operator: null,
    number: null,
    result: 0
}

const operate = function(operator, num1, num2){ 
    if(operator === '+'){
        operation.result = add(num1, num2);
    } else if(operator === '-'){
        operation.result = substract(num1, num2);
    } else if(operator === '*'){
        operation.result = multiply(num1, num2);
    } else if(operator === '/'){
        operation.result = divide(num1, num2);
    } else if (operator === '='){
        console.log(operation.result)
        operation.operator = null;
        operation.number = null;
        operation.result = 0;
    }
}



const display = document.getElementById('display');

const button = document.querySelectorAll('button');

const number = document.querySelectorAll('.num-btn');


const operator = document.querySelector('.operator');

button.forEach((button) => {
    button.addEventListener('click', (event) => {
     if(event.target.className === 'num-btn'){
        operation.number = Number(event.target.innerText)
     } else if(event.target.className === 'operator') {
         operation.operator = event.target.innerText
     }
     operate(operation.operator, operation.result, operation.number)
    })
})
