class Calculadora {
    constructor() {
        this.historial = [];
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
        this.historial.push({ num1, num2, operacion, resultado });
    }

    mostrarHistorial() {
        if (this.historial.length === 0) {
            alert("No hay historial de operaciones.");
        } else {
            let mensaje = "Historial de operaciones:\n";
            this.historial.forEach((op, index) => {
                mensaje += `${index + 1}. ${op.num1} ${op.operacion} ${op.num2} = ${op.resultado}\n`;
            });
            alert(mensaje);
        }
    }

    validarNumero(valor) {
        return !isNaN(valor) && valor !== '';
    }
}

function iniciarCalculadora() {
    let calculadora = new Calculadora();
    let continuar = true;

    while (continuar) {
        let opcion = prompt("Selecciona una opción:\n1. Sumar\n2. Restar\n3. Multiplicar\n4. Dividir\n5. Ver historial\n6. Salir");

        if (opcion === '6') {
            continuar = false;
            alert("¡Gracias por usar la calculadora!");
            break;
        }

        let num1 = prompt("Ingresa el primer número:");
        let num2 = prompt("Ingresa el segundo número:");

        num1 = Number(num1);
        num2 = Number(num2);

        if (!calculadora.validarNumero(num1) || !calculadora.validarNumero(num2)) {
            alert("Por favor ingresa solo números válidos.");
            continue;
        }

        let resultado;

        switch (opcion) {
            case '1':
                resultado = calculadora.sumar(num1, num2);
                alert(`El resultado de la suma es: ${resultado}`);
                break;
            case '2':
                resultado = calculadora.restar(num1, num2);
                alert(`El resultado de la resta es: ${resultado}`);
                break;
            case '3':
                resultado = calculadora.multiplicar(num1, num2);
                alert(`El resultado de la multiplicación es: ${resultado}`);
                break;
            case '4':
                resultado = calculadora.dividir(num1, num2);
                alert(`El resultado de la división es: ${resultado}`);
                break;
            case '5':
                calculadora.mostrarHistorial();
                break;
            default:
                alert("Opción no válida. Por favor selecciona una opción válida.");
                break;
        }

        continuar = confirm("¿Quieres realizar otra operación?");
    }
}

iniciarCalculadora();
