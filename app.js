const form = document.querySelector('form');
const conjunto = document.querySelector('select');
const respuesta = document.querySelector('p');
const historial = document.querySelector('p.historial');

form.addEventListener('submit', e => {
    e.preventDefault();

    const operacion = new Expresion(form.operacion.value, conjunto.value);
    operacion.evaluate();
});