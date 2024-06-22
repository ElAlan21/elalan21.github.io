let numeros = [3, 1, 5, 9, 0, 11, -2];

console.log(obtenerMayor(numeros));

function obtenerMayor(numeros) {
    let mayor = numeros[0];
    for (let index = 0; index < numeros.length; index++) {
        mayor = numeros[index] > mayor ? numeros[index] : mayor;
    }
    return mayor;
}
