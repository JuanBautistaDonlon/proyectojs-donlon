class Calculadora {
    constructor() {
        this.historial = this.cargarHistorial();
    }

    sumar(num1, num2) {
        let resultado = num1 + num2;
        this.agregarHistorial(num1, num2, 'Suma', resultado);
        return resultado;
    }

    restar(num1, num2) {
        let resultado = num1 - num2;
        this.agregarHistorial(num1, num2, 'Resta', resultado);
        return resultado;
    }

    multiplicar(num1, num2) {
        let resultado = num1 * num2;
        this.agregarHistorial(num1, num2, 'Multiplicación', resultado);
        return resultado;
    }

    dividir(num1, num2) {
        if (num2 === 0) {
            return "Error: No se puede dividir por cero.";
        }
        let resultado = num1 / num2;
        this.agregarHistorial(num1, num2, 'División', resultado);
        return resultado;
    }

    agregarHistorial(num1, num2, operacion, resultado) {
        const fecha = new Date().toISOString(); // Se agrega la fecha a cada operación
        this.historial.push({ num1, num2, operacion, resultado, fecha });
        this.guardarHistorial();
    }

    guardarHistorial() {
        localStorage.setItem('historial', JSON.stringify(this.historial));
    }

    cargarHistorial() {
        const historialGuardado = localStorage.getItem('historial');
        return historialGuardado ? JSON.parse(historialGuardado) : [];
    }

    mostrarHistorial() {
        const historialList = document.getElementById('historial');
        historialList.innerHTML = '';

        if (this.historial.length === 0) {
            historialList.innerHTML = '<li>No hay historial de operaciones.</li>';
        } else {
            const historialOrdenado = _.orderBy(this.historial, ['fecha'], ['desc']);
            historialOrdenado.forEach((op) => {
                const listItem = document.createElement('li');
                listItem.textContent = `${op.num1} ${op.operacion} ${op.num2} = ${op.resultado} (Fecha: ${op.fecha})`;
                historialList.appendChild(listItem);
            });
        }
    }

    filtrarPorOperacion(operacion) {
        const resultadosFiltrados = this.historial.filter(op => op.operacion.toLowerCase() === operacion.toLowerCase());
        const historialList = document.getElementById('historial');
        historialList.innerHTML = '';

        if (resultadosFiltrados.length === 0) {
            historialList.innerHTML = `<li>No se encontraron operaciones de tipo: ${operacion}</li>`;
        } else {
            resultadosFiltrados.forEach((op) => {
                const listItem = document.createElement('li');
                listItem.textContent = `${op.num1} ${op.operacion} ${op.num2} = ${op.resultado} (Fecha: ${op.fecha})`;
                historialList.appendChild(listItem);
            });
        }
    }

    validarNumero(valor) {
        return !isNaN(valor) && valor !== '';
    }

    cargarHistorialDesdeJSON() {
        fetch('historial.json')
            .then(response => response.json())
            .then(data => {
                this.historial = data;
                this.mostrarHistorial();
            })
            .catch(error => {
                console.error("Error al cargar el historial desde JSON:", error);
            });
    }

    cargarHistorialDesdeAPI() {
        fetch('https://api.ejemplo.com/historial')
            .then(response => response.json())
            .then(data => {
                this.historial = data;
                this.mostrarHistorial();
            })
            .catch(error => {
                console.error("Error al cargar el historial desde la API:", error);
            });
    }
}

const calculadora = new Calculadora();

function mostrarResultado(resultado) {
    const resultadoElemento = document.getElementById('resultado');
    resultadoElemento.textContent = `El resultado es: ${resultado}`;
}

document.getElementById('sumarBtn').addEventListener('click', () => {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    if (!calculadora.validarNumero(num1) || !calculadora.validarNumero(num2)) {
        alert('Por favor ingresa solo números válidos.');
        return;
    }
    const resultado = calculadora.sumar(num1, num2);
    mostrarResultado(resultado);
});

document.getElementById('restarBtn').addEventListener('click', () => {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    if (!calculadora.validarNumero(num1) || !calculadora.validarNumero(num2)) {
        alert('Por favor ingresa solo números válidos.');
        return;
    }
    const resultado = calculadora.restar(num1, num2);
    mostrarResultado(resultado);
});

document.getElementById('multiplicarBtn').addEventListener('click', () => {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    if (!calculadora.validarNumero(num1) || !calculadora.validarNumero(num2)) {
        alert('Por favor ingresa solo números válidos.');
        return;
    }
    const resultado = calculadora.multiplicar(num1, num2);
    mostrarResultado(resultado);
});

document.getElementById('dividirBtn').addEventListener('click', () => {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    if (!calculadora.validarNumero(num1) || !calculadora.validarNumero(num2)) {
        alert('Por favor ingresa solo números válidos.');
        return;
    }
    const resultado = calculadora.dividir(num1, num2);
    mostrarResultado(resultado);
});

document.getElementById('mostrarHistorialBtn').addEventListener('click', () => {
    calculadora.mostrarHistorial();
});

document.getElementById('filtrarHistorialBtn').addEventListener('click', () => {
    const operacion = document.getElementById('filtroOperacion').value;
    if (operacion.trim() === '') {
        alert('Por favor ingresa una operación para filtrar.');
        return;
    }
    calculadora.filtrarPorOperacion(operacion);
});

document.getElementById('cargarHistorialBtn').addEventListener('click', () => {
    calculadora.cargarHistorialDesdeAPI();
});

window.onload = function () {
    document.getElementById('resultado').textContent = '¡Bienvenido a la calculadora interactiva!';
    calculadora.mostrarHistorial();
};