class Expresion{
    constructor(){
        this.input;
        this.conjunto;
    }

    static evaluations = 0;

    evaluate(){
        try {
            this.input = this.detectVar();
            const operacion = math.evaluate(this.input);

            if(operacion !== undefined){
                respuesta.innerHTML = 'Solución: ' + this.input + ' = ' + operacion + '<br>';

                historial.innerHTML += `
                                        a + b - 8 <br>
                                        
                                        <br>

                                        Elemento neutro <br>
                                        a + e - 8 = a <br>
                                        e = 8 <br>

                                        <br>

                                        Elemento inverso <br>
                                        a + a' - 8 = 8 <br>
                                        a' = 16 + a <br>

                                        <br>

                                        Propiedad Conmutativa <br>
                                        a + b - 8 = b + a - 8 <br>

                                        <br>

                                        Propiedad Asociativa <br>
                                        `;
    
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
                        if(typeof operacion !== 'object' && operacion.toString().length < 14)
                            respuesta.innerHTML += 'Pertenece al conjunto de los números Racionales';
                        else
                            respuesta.innerHTML += 'No pertenece al conjunto de los números Racionales';
                        break;
    
                    case 'irracionales':
                        if(typeof operacion !== 'object' && operacion.toString().length >= 14)
                            respuesta.innerHTML += 'Pertenece al conjunto de los números Irracionales';
                        else
                            respuesta.innerHTML += 'No pertenece al conjunto de los números Irracionales';
                        break;
    
                    case 'reales':
                        if(typeof operacion !== 'object')
                            respuesta.innerHTML += 'Pertenece al conjunto de los números Reales';
                        else
                            respuesta.innerHTML += 'No pertenece al conjunto de los números Reales';
                        break;

                    case 'imaginarios':
                        if(typeof operacion === 'object')
                            respuesta.innerHTML += 'Pertenece al conjunto de los números Imaginarios';
                        else
                            respuesta.innerHTML += 'No pertenece al conjunto de los números Imaginarios';
                        break;

                    case 'complejos':
                        respuesta.innerHTML += 'Pertenece al conjunto de los números Complejos';
                        break;
    
                    default:
                        respuesta.innerHTML += 'Por favor escoja un conjunto';
                }
                // this.updateHistory(operacion);
    
            }else respuesta.innerHTML = "Por favor no deje vacío el campo de operación<br>ni introduzca caracteres no aceptados";
           
        } catch {
            respuesta.innerHTML = "Por favor introduzca una expresión valida y un conjunto";
        }
    }

    detectVar(){
        if(this.input.indexOf('cbrt') === 0 && this.input.indexOf('a') > 3 && this.input.lastIndexOf('b') > 4)
            return this.twoVar();

        else if(this.input.indexOf('cbrt') === 0 && this.input.indexOf('a') > 4 || this.input.indexOf('cbrt') === 0 && this.input.lastIndexOf('b') > 4)
            return this.oneVar();

        else if(this.input.indexOf('cbrt') === -1 && this.input.indexOf('a') >= 0 && this.input.indexOf('b') >= 0)
            return this.twoVar();

        else if(this.input.indexOf('cbrt') === -1 && this.input.indexOf('a') >= 0 || this.input.indexOf('cbrt') === -1 && this.input.indexOf('b') >= 0)
            return this.oneVar();
            
        else
            return this.input;
    }

    oneVar(){
        let signo = Math.random() < 0.50 ? -1 : 1;
        let irRandom = Math.random() < 0.50 ? Math.PI : Math.E;
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
                number = irRandom;
                break;
            
            case 'reales':
                number = signo*this.randomNumber(0, 99);
                break;
                
            case 'imaginarios':
                number = math.sqrt(-1*this.randomNumber(1, 99));
                break;

            case 'complejos':
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
                firstNumber  = Math.PI;
                secondNumber = Math.E;
                break;
            
            case 'reales':
                firstNumber = signo*this.randomNumber(0, 99);
                secondNumber = signo*this.randomNumber(0, 99);
                break;
                
            case 'imaginarios':
                firstNumber = math.sqrt(-1*this.randomNumber(1, 99));
                secondNumber = math.sqrt(-1*this.randomNumber(1, 99));
                break;
    
            case 'complejos':
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

        if(this.input.includes('cbrt')){
            arrayInput.forEach((element, index) => {
                if(index > 4 && element === 'a' || index > 4 && element === 'b')
                    arrayInput[index] = number;
            });
        }
        else{
            arrayInput.forEach((element, index) => {
                if(element === 'a' || element === 'b')
                    arrayInput[index] = number;
            });
        }
        return arrayInput.join('');
    }

    insertTwoNumbers(firstNumber, secondNumber){
        const arrayInput = [...this.input];

        if(this.input.includes('cbrt')){
            arrayInput.forEach((element, index) => {
                if(index > 4 && element === 'a')
                    arrayInput[index] = firstNumber;
                else if(index > 4 && element === 'b')
                    arrayInput[index] = secondNumber;
            });
        }
        else{
            arrayInput.forEach((element, index) => {
                if(element === 'a' || element === 'b'){
                    if(element === 'a')
                        arrayInput[index] = firstNumber;
                    else
                    arrayInput[index] = secondNumber;                   
                }           
            });
        }
        return arrayInput.join('');
    }

    // updateHistory(operacion){
    //     historial.innerHTML += `${this.input}= ${operacion}<br>`; 
    //     Expresion.evaluations++;
        
    //     if(Expresion.evaluations > 5){
    //         historial.innerHTML = '';
    //         historial.innerHTML += `${this.input}= ${operacion}<br>`; 
    //     }
    // }
}