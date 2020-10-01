class Expresion{
    constructor(){
        this.input;
        this.inputFinal;
        this.conjunto;  
    }

    static evaluations = 0;
    static operacion = 0;

    evaluate(){
        // let neutro = false;
        // let conmutativa = false;

        // if(this.inputFinal.includes('e')){
        //     neutro = true;
        // }
        // else if(!this.inputFinal.includes('e')){
        //     conmutativa = true
        // }

        try {
            this.inputFinal = this.detectVar();

            Expresion.operacion = math.evaluate(this.inputFinal);
            // console.log(typeof Expresion.operacion);

            if(Expresion.operacion !== undefined){
                respuesta.innerHTML = 'Solución: ' + this.inputFinal + ' = ' + Expresion.operacion + '<br>';
    
                switch (this.conjunto) {
                    case 'naturales':
                        if(Expresion.operacion !== 0 && Expresion.operacion === Math.trunc(Expresion.operacion) && Expresion.operacion === Math.abs(Expresion.operacion))
                            respuesta.innerHTML += 'Pertenece al conjunto de los números Naturales';
                        else
                            respuesta.innerHTML += 'No pertenece al conjunto de los números Naturales';
                        break;
    
                    case 'enteros':
                        if(Expresion.operacion === Math.trunc(Expresion.operacion))
                            respuesta.innerHTML += 'Pertenece al conjunto de los números Enteros';
                        else
                            respuesta.innerHTML += 'No pertenece al conjunto de los números Enteros';
                        break;
            
                    case 'racionales':
                        if(typeof Expresion.operacion !== 'object' && Expresion.operacion.toString().length < 14)
                            respuesta.innerHTML += 'Pertenece al conjunto de los números Racionales';
                        else
                            respuesta.innerHTML += 'No pertenece al conjunto de los números Racionales';
                        break;
    
                    case 'irracionales':
                        if(typeof Expresion.operacion !== 'object' && Expresion.operacion.toString().length >= 14)
                            respuesta.innerHTML += 'Pertenece al conjunto de los números Irracionales';
                        else
                            respuesta.innerHTML += 'No pertenece al conjunto de los números Irracionales';
                        break;
    
                    case 'reales':
                        if(typeof Expresion.operacion !== 'object')
                            respuesta.innerHTML += 'Pertenece al conjunto de los números Reales';
                        else
                            respuesta.innerHTML += 'No pertenece al conjunto de los números Reales';
                        break;

                    case 'imaginarios':
                        if(typeof Expresion.operacion === 'object')
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

                if(Expresion.evaluations >= 1){
                    historial.innerHTML = '';
                }

                this.updateNeutro(this.elementoNeutro());
                this.updateConmutativa(this.propiedadConmutativa());
                
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

    updateNeutro(elemento){
        historial.innerHTML += `
                                Elemento Neutro<br> e = ${elemento}<br>
                                `; 
        Expresion.evaluations++;        
    }

    updateConmutativa(elemento){
        historial.innerHTML += `
                                Propiedad Conmutativa<br> ${this.input} = ${elemento}<br>
                                `; 
        Expresion.evaluations++;        
    }

    propiedadConmutativa(){
        const arrayInput = [...this.input];
        let nTI = '';
        let numero = '';
        let signo = '';
        arrayInput.forEach((element, index) => {
            if(isNaN(element) === false){
                console.log('entro');
                numero = arrayInput[index];
                signo = arrayInput[index-1];

                arrayInput.pop();
                arrayInput.pop();
                console.log(signo, numero);
                console.log(arrayInput);

                nTI = signo + numero;
            }
            else
                nTI = '';
        });

        return arrayInput.join('').split(/([*+-\/])/).reverse().join('') + nTI;
    }

    elementoNeutro(){
        const arrayInput = [...this.input];
        let eNeutro = '';
        let signo = '';
        arrayInput.forEach((element, index) => {
            if(isNaN(element) === false){
                eNeutro = arrayInput[index];
                signo = arrayInput[index-1];

                if(signo === '+'){
                    signo = '-';
                }
                else signo = '+';

 
            }
            else{
                eNeutro = '0';
            }
        });

        return signo + eNeutro;
    }
}