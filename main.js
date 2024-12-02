function iniciarCalculadora() {
    let continuar = true;
    while (continuar) {
        let num1 = prompt("Ingresa el primer número:");
        let num2 = prompt("Ingresa el segundo número:");

        num1 = Number(num1);
        num2 = Number(num2);

        let resultado = num1 + num2;
        alert(`El resultado de la suma es: ${resultado}`);

        continuar = confirm("¿Quieres realizar otra suma?");
    }

    alert("¡Gracias por usar la calculadora!");
}
iniciarCalculadora();