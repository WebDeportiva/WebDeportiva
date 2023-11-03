document.addEventListener('DOMContentLoaded', function() {
    var contadorPruebas = 0;

    cambiarPrueba(); // Inicializa la primera prueba

    setInterval(function() {
        cambiarPrueba(); // Cambiar cada 5 minutos
    }, 300000);

    function cambiarPrueba() {
        var pruebaElement = document.querySelector('.prueba');
        var parcialesList = document.querySelector('.parciales ul');
        var tiempoFinalElement = document.getElementById('tiempoFinal');
        // Define el orden de las pruebas
        var pruebas = [
            {
                prueba: 'Prueba 200m Libre',
                parciales: [
                    'Nadador 1: 1m 00s',
                    'Nadador 2: 59s',
                    'Nadador 3: 58s',
                    'Nadador 4: 56s',
                    'Nadador 5: 57s',
                    'Nadador 6: 59s',
                    'Nadador 7: 1m 02s',
                    'Nadador 8: 1m 00s'
                ],
                tiempoFinal: 'Tiempo Final: 1m 57s'
            },
            {
                prueba: 'Prueba 100m Espalda',
                parciales: [
                    'Nadador 1: 31s',
                    'Nadador 2: 30s',
                    'Nadador 3: 29s',
                    'Nadador 4: 27s',
                    'Nadador 5: 27s',
                    'Nadador 6: 29s',
                    'Nadador 7: 30s',
                    'Nadador 8: 29s'
                ],
                tiempoFinal: 'Tiempo Final: 59s'
            },
            {
                prueba: 'Prueba 100m Mariposa',
                parciales: [
                    'Nadador 1: 30s',
                    'Nadador 2: 32s',
                    'Nadador 3: 31s',
                    'Nadador 4: 33s',
                    'Nadador 5: 29s',
                    'Nadador 6: 30s',
                    'Nadador 7: 34s',
                    'Nadador 8: 32s'
                ],
                tiempoFinal: 'Tiempo Final: 56s'
            },
            {
                prueba: 'Prueba 100m Braza',
                parciales: [
                    'Nadador 1: 39s',
                    'Nadador 2: 37s',
                    'Nadador 3: 36s',
                    'Nadador 4: 33s',
                    'Nadador 5: 34s',
                    'Nadador 6: 36s',
                    'Nadador 7: 34s',
                    'Nadador 8: 37s'
                ],
                tiempoFinal: 'Tiempo Final: 1m 08s'
            },
            {
                prueba: 'Prueba 200m Mariposa',
                parciales: [
                    'Nadador 1: 1m 08s',
                    'Nadador 2: 1m 06s',
                    'Nadador 3: 1m 04s',
                    'Nadador 4: 1m 00s',
                    'Nadador 5: 1m 02s',
                    'Nadador 6: 1m 07s',
                    'Nadador 7: 1m 11s',
                    'Nadador 8: 1m 13s'
                ],
                tiempoFinal: 'Tiempo Final: 2m 09s'
            },
            {
                prueba: 'Prueba 200m Espalda',
                parciales: [
                    'Nadador 1: 1m 08s',
                    'Nadador 2: 1m 05s',
                    'Nadador 3: 1m 04s',
                    'Nadador 4: 1m 24s',
                    'Nadador 5: 1m 18s',
                    'Nadador 6: 1m 41s',
                    'Nadador 7: 1m 37s',
                    'Nadador 8: 1m 15s'
                ],
                tiempoFinal: 'Tiempo Final: 2m 45s'
            },
        ];

        // Escoge la prueba en el orden establecido
        var nuevaPrueba = pruebas[contadorPruebas];

        // Incrementa el contador para la siguiente prueba
        contadorPruebas = (contadorPruebas + 1) % pruebas.length;

        // Cambia el contenido en la página
        pruebaElement.textContent = nuevaPrueba.prueba;

        // Limpia los parciales anteriores
        parcialesList.innerHTML = '';

        // Agrega los nuevos parciales
        nuevaPrueba.parciales.forEach(function(parcial) {
            var nuevoItem = document.createElement('li');
            nuevoItem.textContent = parcial;
            parcialesList.appendChild(nuevoItem);
        });

        // Cambia el tiempo final
        tiempoFinalElement.textContent = nuevaPrueba.tiempoFinal;
  // Espera dos minutos antes de mostrar el tiempo final
  tiempoFinalElement.style.display = 'none'; // Ocultar tiempo final
  setTimeout(function() {
      tiempoFinalElement.style.display = 'block'; // Mostrar tiempo final
  }, 120000); // 120000 milisegundos = 2 minutos
}
});