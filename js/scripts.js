const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = "";
    }

    //add digit to calculator screen
    addDigit(digit) {
       //check if current operation already has a dot
      if (digit === "." && this.currentOperationText.innerText.includes(".")) {
        return;
       }
        this.currentOperation = digit;
        this.updateScreen();
    }
 //  Process all calculator operations
    processOperation(operation) {
        // Check if current is empty
        if(this.currentOperationText.innerText === " ") {
            // Change operation
            if(this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }
    // Get current and previous value
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous);
                break;     
            case "DEL":
                this.processDelOperator();
                break;    
            case "CE":
               this.processClearCurrentOperation();
                 break;
            default:
                return;
        }
     }

 // Change values of the calculator screen
    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previous = null
    )  {

        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // Check if value is zero, if it is just and current value
            if(previous === 0) {
                operationValue = current
            }
            //add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }
    }

 // Change math operation
 changeOperation(operation) {
     const mathOperations = ["*", "/", "+", "-"]
        if(!mathOperations.includes(operations)) {
            return
        }

        this.previousOperationText.innerText = 
            this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    //Delete the last digit
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    //Clear current operation
    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;
        
        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});

 /*window.addEventListener("keydown", (e) => {
    const value = e.key

    if(+value >= 0 || value === ".") {
        calc.addDigit(value)
    } else {
        calc.processOperation(value)
    }

    if(value == "Enter") {
        calc.processOperation("=")
        calc.processEqualOperator()
    }
})*/