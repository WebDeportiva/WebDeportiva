document.addEventListener('DOMContentLoaded', function() {
    var contadorPruebas = 0;
    var tiempoCambioPrueba = 300; // 300 segundos = 5 minutos

    cambiarPrueba(); // Inicializa la primera prueba

    setInterval(function() {
        tiempoCambioPrueba--;
        if (tiempoCambioPrueba === 0) {
            cambiarPrueba();
            tiempoCambioPrueba = 300; // Reinicia el contador de tiempo para el próximo cambio de prueba
        }
        actualizarContador();
    }, 1000);

    function cambiarPrueba() {
        var pruebaElement = document.querySelector('.prueba');
        var parcialesList = document.querySelector('.parciales ul');
        var tiempoFinalElement = document.getElementById('tiempoFinal');
        var piscinaElement = document.querySelector('.piscina');

        var pruebas = [
            {
                prueba: 'Prueba 200m Libre masculino',
                parciales: [
                    'Pedro González : 1m 00s',
                    'Sergio Muñoz : 59s',
                    'Jorge García : 58s',
                    'Pablo Sánchez : 56s',
                    'Juan González : 57s',
                    'Luis Jiménez : 59s',
                    'Javier Pérez : 1m 02s',
                    'Pedro Martínez : 1m 00s'
                ],
                tiempoFinal: 'Tiempo final ganador: Pablo Sánchez 1m 57s',
                nadadores: [
                    'González', 'Muñoz', 'García', 'Sánchez',
                    'González', 'Jiménez', 'Pérez', 'Martínez'
                ]
            },
            {
                prueba: 'Prueba 100m Espalda femenino',
                parciales: [
                    'Lucía Fernández : 31s',
                    'Sara Gómez  : 30s',
                    'Isabel Díaz : 29s',
                    'Carmen Ruiz : 27s',
                    'Nuria Martín : 27s',
                    'Rosa López : 29s',
                    'Ana Fernández : 30s',
                    'Nerea López : 29s'
                ],
                tiempoFinal: 'Tiempo final ganadora: Nuria Martín 59s',
                nadadores: [
                    'Fernández', 'Gómez', 'Díaz', 'Ruiz',
                    'Martín', 'López', 'Fernández', 'López'
                ]
            },
            {
                prueba: 'Prueba 100m Braza masculino',
                parciales: [
                    'Juan González : 39s',
                    'José Antonio : 37s',
                    'Carlos López : 36s',
                    'Miguel Hernández : 33s',
                    'Diego García : 34s',
                    'David Muñoz : 36s',
                    'Juan Pérez : 34s',
                    'Pedro González : 37s'
                ],
                tiempoFinal: 'Tiempo final ganador: Miguel Hernández 1m 08s',
                nadadores: [
                    'González', 'Antonio', 'López', 'Hernández',
                    'García', 'Muñoz', 'Pérez', 'González'
                ]
            },
            {
                prueba: 'Prueba 100m Mariposa femenino',
                parciales: [
                    'Marie Daniela : 30s',
                    'Nuria Martín : 32s',
                    'Alma Martínez : 28s',
                    'Laura Sánchez : 33s',
                    'Lucía Fernández : 29s',
                    'Eva Rodríguez : 30s',
                    'Marta Hernández : 34s',
                    'Elena Rodríguez : 32s'
                ],
                tiempoFinal: 'Tiempo final ganadora: Alma Martínez 58s',
                nadadores: [
                    'Daniela', 'Martín', 'Martínez', 'Sánchez',
                    'Fernández', 'Rodríguez', 'Hernández', 'Rodríguez'
                ]
            },
            {
                prueba: 'Prueba 200m Mariposa masculino',
                parciales: [
                    'Pablo Sánchez 1: 1m 08s',
                    'Jorge García 2: 1m 06s',
                    'Álvaro Martín 3: 1m 04s',
                    'David Muñoz 4: 1m 00s',
                    'Fernando González 5: 1m 02s',
                    'Diego García 6: 1m 07s',
                    'Luis Jiménez 7: 1m 11s',
                    'Xabier González 8: 1m 13s'
                ],
                tiempoFinal: 'Tiempo final ganador: Fernando González 2m 09s',
                nadadores: [
                    'Sánchez', 'García', 'Martín', 'Muñoz',
                    'González', 'García', 'Jiménez', 'González'
                ]
            }
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
