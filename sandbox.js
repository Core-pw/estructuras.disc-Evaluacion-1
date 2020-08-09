const btn = document.querySelector('button');
const form = document.querySelector('form');
const conjunto = document.getElementById('conjunto');
const respConjunto = document.querySelector('p.conjunto');
const respuesta = document.querySelector('p');

form.addEventListener('submit', e => {
    e.preventDefault();
});

btn.addEventListener('click', () => {
    try {
        const operacion = math.evaluate(form.operacion.value);
        respuesta.textContent = "Por favor no deje vacío el campo de operación";

        if(operacion !== undefined){
            respuesta.textContent = "Solución: " + operacion;

            switch (conjunto.value) {
                case 'enteros':
                    if(operacion === Math.trunc(operacion))
                        respConjunto.textContent = 'Pertenece al conjunto de los números Enteros';
                    else
                        respConjunto.textContent = 'No pertenece al conjunto de los números Enteros';
                    break;
        
                case 'naturales':
                    if(operacion !== 0 && operacion === Math.trunc(operacion) && operacion === Math.abs(operacion))
                        respConjunto.textContent = 'Pertenece al conjunto de los números Naturales';
                    else
                        respConjunto.textContent = 'No pertenece al conjunto de los números Naturales';
                    break;
        
                default:
                    respConjunto.textContent = 'No pertenece al conjunto';
            }
        
            form.reset();
        }


    } catch {
        respConjunto.textContent = '';
        respuesta.textContent = "Por favor introduzca una expresión valida";
    }

});



