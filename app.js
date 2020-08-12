const form = document.querySelector('form');
const conjunto = document.getElementById('conjunto');
const respuesta = document.querySelector('p');

form.addEventListener('submit', e => {
    e.preventDefault();

    const operacion = new Expresion(form.operacion.value, conjunto.value);
    operacion.evaluate();
});