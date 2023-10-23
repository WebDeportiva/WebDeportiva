const obtenerEstadisticas = async () => {
  const options = {
      method: 'GET',
      url: 'https://live-golf-data.p.rapidapi.com/stats',
      params: {
          year: '2022',
          statId: '186'
      },
      headers: {
          'X-RapidAPI-Key': '4a6c2fe35dmsh96903b06f3eef8bp1c7bf2jsncfb37573c820',
          'X-RapidAPI-Host': 'live-golf-data.p.rapidapi.com'
      }
  };

  try {
      const response = await axios.request(options);
      mostrarRanking(response.data); // Llamar a la función mostrarRanking con los datos
  } catch (error) {
      console.error(error);
  }
};

const mostrarRanking = (data) => {
  const rankings = data.rankings.slice(0, 10); // Tomar solo los primeros 10

  const rankingDiv = document.getElementById('ranking');

  rankings.forEach((jugador) => {
      const infoJugador = {
          nombre: jugador.firstName,
          apellido: jugador.lastName,
          id: jugador.playerId,
          eventos: jugador.events,
          puntosTotales: jugador.totalPoints
      };

      const jugadorInfoHTML = `
          <div>
              <p>Nombre: ${infoJugador.nombre} ${infoJugador.apellido}</p>
              <p>ID: ${infoJugador.id}</p>
              <p>Eventos: ${infoJugador.eventos}</p>
              <p>Puntos Totales: ${infoJugador.puntosTotales}</p>
              <hr>
          </div>
      `;

      rankingDiv.innerHTML += jugadorInfoHTML;
  });
};

obtenerEstadisticas();
