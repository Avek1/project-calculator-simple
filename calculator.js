(function () {
    
    var number = document.querySelectorAll(".number");
    var operator = document.querySelectorAll(".operator");
    var equals = document.querySelector("#equals");
    var clearOutput = document.querySelector("#clear");
    var output = document.querySelector("#output");
    var expression = "";
    var operatorClickedFlag = false;
    var equalsClickedFlag = false;

    setEventListeners();

    function setEventListeners() {
        for (var i = 0; i < number.length; i++) {
            number[i].addEventListener("click", numberClicked);
        }

        for (var i = 0; i < operator.length; i++) {
            operator[i].addEventListener("click", operatorClicked);
        }

        equals.addEventListener("click", equalsClicked);
        clearOutput.addEventListener("click", clearClicked);
    }

    function numberClicked() {
        if (output.value === "0" && this.value === ".") {
            output.value += this.value;
        } else if (output.value === "0" && this.value !== "C" && !operatorClickedFlag) {
            output.value = this.value;
        } else if (expressionNotValid() && this.value === "." && !operatorClickedFlag) {
            return;
        } else if (operatorClickedFlag) {
            output.value = this.value;
            operatorClickedFlag = false;
        } else if (equalsClickedFlag) {
            expression = "";
            output.value = this.value;
            equalsClickedFlag = false;
        } else {
            output.value += this.value;
        }

        if (output.value.length > 10 || output.value === "Overflow error") {
            output.value = "Overflow error";
            expression = "";
            return;
        }

        if ((this.value !== "0" && operatorClicked) || expression !== "") {
            expression += this.value;
        }
    }

    function operatorClicked()
    {
        if (expressionNotValid()) {
            return;
        }

        if (expression === "") {
            output.value = 0;
            expression += 0 + this.value;
        } else {
            expression += this.value;
        }
        operatorClickedFlag = true;
    }

    function equalsClicked() {
        if (expressionNotValid()) {
            return;
        }

        var resultOutput = Math.round((eval(expression) + 0.00000000001) * 100000000) / 100000000;

        if (resultOutput.toString().length > 10) {
            output.value = "Overflow error";
            expression = "";
        } else {
            output.value = resultOutput;
        }

        equalsClickedFlag = true;
    }

    function clearClicked() {
        output.value = 0;
        expression = "";
        equalsClickedFlag = false;
    }

    function expressionNotValid() {
        var invalidExpression = false;
        var dividedByZero = false;
        var lastCharacter = expression.slice(-1);
        var operators = ["+", "+", "*", "/", "."];
        var notValid = operators.includes(lastCharacter);

        if (notValid) {
            invalidExpression = true;
        }

        if (expression.includes("/0")) {
            output.value = "Cannot divide by zero";
            dividedByZero = true;
        }

        if (invalidExpression || dividedByZero) {
            return true;
        }
    }

})();