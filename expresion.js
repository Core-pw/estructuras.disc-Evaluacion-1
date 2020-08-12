class Expresion{
    constructor(input, conjunto){
        this.input = input;
        this.conjunto = conjunto;
    }

    getInput(){
        return new Function(`return ${this.input}`)();
    }

    evaluate(){
        try {
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
                form.reset();
    
            }else respuesta.innerHTML = "Por favor no deje vacío el campo de operación";
           
        } catch {
            respuesta.innerHTML = "Por favor introduzca una expresión valida";
        }
    }
}