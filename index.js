const express = require('express');
const app = express();

// Подключение маршрутов
const releasesRoute = require('./api/anilibria/releases');
const releaseRoute = require('./api/anilibria/release');
const episodesRoute = require('./api/anilibria/episode');
const latestRoute = require('./api/anilibria/latest');
const searchRoute = require('./api/anilibria/search');

// Настройка маршрутов
app.use('/api/anilibria/anime/releases', releasesRoute);
app.use('/api/anilibria/anime/release', releaseRoute);
app.use('/api/anilibria/anime/episode', episodesRoute);
app.use('/api/anilibria/anime/latest', latestRoute);
app.use('/api/anilibria/anime/search', searchRoute);

// Запуск сервера
const port = 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
