class Expresion{
    constructor(){
        this.input;
        this.conjunto;
    }

    static evaluations = 0;

    evaluate(){
        try {
            this.input = this.detectVar();
            const operacion = this.getInput();

            if(operacion !== undefined){
                respuesta.innerHTML = 'Solución: ' + operacion + '<br>';
    
                switch (this.conjunto) {
                    case 'naturales':
                        if(operacion !== 0 && operacion === Math.trunc(operacion) && operacion === Math.abs(operacion))
                            respuesta.innerHTML += 'Pertenece al conjunto de los números Naturales';
                        else
                            respuesta.innerHTML += 'No pertenece al conjunto de los números Naturales';
                        break;
    
                    case 'enteros':
                        if(operacion === Math.trunc(operacion))
                            respuesta.innerHTML += 'Pertenece al conjunto de los números Enteros';
                        else
                            respuesta.innerHTML += 'No pertenece al conjunto de los números Enteros';
                        break;
            
                    case 'racionales':
                        if(!Number.isNaN(operacion))
                            respuesta.innerHTML += 'Pertenece al conjunto de los números Racionales';
                        else
                            respuesta.innerHTML += 'No pertenece al conjunto de los números Racionales';
                        break;
    
                    case 'irracionales':
                        if(Number.isNaN(operacion))
                            respuesta.innerHTML += 'Pertenece al conjunto de los números Irracionales';
                        else
                            respuesta.innerHTML += 'No pertenece al conjunto de los números Irracionales';
                        break;
    
                    case 'reales':
                        respuesta.innerHTML += 'Pertenece al conjunto de los números Reales';
                        break;
    
                    default:
                        respuesta.innerHTML += 'Por favor escoja un conjunto';
                }
                this.updateHistory(operacion);
                form.reset();
    
            }else respuesta.innerHTML = "Por favor no deje vacío el campo de operación<br>ni introduzca caracteres no aceptados";
           
        } catch {
            respuesta.innerHTML = "Por favor introduzca una expresión valida";
        }
    }

    detectVar(){
        if(!this.input.includes('Math') && this.input.indexOf('a') >= 0 && this.input.indexOf('b') >= 0)
            return this.twoVar();

        else if(!this.input.includes('Math') && this.input.indexOf('a') >= 0 || this.input.indexOf('b') >= 0)
            return this.oneVar();

        else return this.input;
    }

    oneVar(){
        let signo = Math.random() < 0.50 ? -1 : 1;
        let number;

        switch (this.conjunto) {
            case 'naturales':
                number = this.randomNumber(1, 99);
                break;

            case 'enteros':
                number = signo*this.randomNumber(0, 99);
                break;
            
            case 'racionales':
                number = signo*this.randomNumber(0, 99);
                break;
            
            case 'irracionales':
                number = Math.sqrt(-1*this.randomNumber(1, 99));
                break;
            
            case 'reales':
                number = signo*this.randomNumber(0, 99);          
        }
       return this.insertOneNumber(number.toString());
    }

    twoVar(){
        let signo = Math.random() < 0.50 ? -1 : 1;
        let firstNumber;
        let secondNumber;

        switch (this.conjunto) {
            case 'naturales':
                firstNumber = this.randomNumber(1, 99);
                secondNumber = this.randomNumber(1, 99);
                break;

            case 'enteros':
                firstNumber = signo*this.randomNumber(0, 99);
                secondNumber = signo*this.randomNumber(0, 99);
                break;
            
            case 'racionales':
                firstNumber = signo*this.randomNumber(0, 99);
                secondNumber = signo*this.randomNumber(0, 99);
                break;
            
            case 'irracionales':
                firstNumber = Math.sqrt(-1*this.randomNumber(1, 99));
                secondNumber = Math.sqrt(-1*this.randomNumber(1, 99));
                break;
            
            case 'reales':
                firstNumber = signo*this.randomNumber(0, 99);
                secondNumber = signo*this.randomNumber(0, 99);           
        }
       return this.insertTwoNumbers(firstNumber.toString(), secondNumber.toString());
    }

    randomNumber(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    insertOneNumber(number){
        const arrayInput = [...this.input];

        arrayInput.forEach((element, index) => {
            if(element === 'a' || element === 'b')
                arrayInput[index] = number;
        });
        return arrayInput.join('');
    }

    insertTwoNumbers(firstNumber, secondNumber){
        const arrayInput = [...this.input];

        arrayInput.forEach((element, index) => {
            if(element === 'a' || element === 'b'){
                if(element === 'a')
                    arrayInput[index] = firstNumber;
                else arrayInput[index] = secondNumber;                   
            }           
        });
        return arrayInput.join('');
    }

    getInput(){
        return new Function(`return ${this.input}`)();
    }

    updateHistory(operacion){
        historial.innerHTML += `${this.input}= ${operacion}<br>`; 
        Expresion.evaluations++;
        
        if(Expresion.evaluations > 5){
            historial.innerHTML = '';
            historial.innerHTML += `${this.input}= ${operacion}<br>`; 
        }
    }
}