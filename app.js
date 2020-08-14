const form = document.querySelector('form');
const conjunto = document.querySelector('select');
const respuesta = document.querySelector('p');
const historial = document.querySelector('p.historial');

const operacion = new Expresion();

form.addEventListener('submit', e => {
    e.preventDefault();

    operacion.input = form.operacion.value;
    operacion.conjunto = conjunto.value;
    operacion.evaluate();
});