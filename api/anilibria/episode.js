const express = require('express');
const axios = require('axios');
const router = express.Router();

// Базовый URL внешнего API для получения данных о релизе
const externalApiUrl = 'https://anilibria.top/api/v1/anime/releases';

// Обработчик маршрута для получения списка эпизодов
router.get('/:releaseId', async (req, res) => {
  const releaseId = req.params.releaseId;

  const url = `${externalApiUrl}/${releaseId}`;

  try {
    const response = await axios.get(url);
    const item = response.data;

    // Трансформируем данные эпизодов в нужный формат
    const episodes = item.episodes.map((episode, index) => ({
      id_episode: (index + 1).toString(),
      episode: `${index + 1} серия`
    }));

    // Возвращаем массив с эпизодами
    res.json(episodes);
  } catch (error) {
    console.error('Ошибка при получении данных от внешнего API:', error);
    res.status(500).send('Ошибка при получении данных от внешнего API');
  }
});

// Обработчик маршрута для получения данных о конкретном эпизоде
router.get('/:releaseId/:episodeNumber', async (req, res) => {
  const { releaseId, episodeNumber } = req.params;

  const url = `${externalApiUrl}/${releaseId}`;

  try {
    const response = await axios.get(url);
    const item = response.data;

    const episode = item.episodes.find((ep, index) => index + 1 == episodeNumber);

    if (!episode) {
      return res.status(404).send('Эпизод не найден');
    }

    // Трансформируем данные эпизода в нужный формат и фильтруем, чтобы убрать null значения
    const transformedEpisode = [
      {
        quality: '480p',
        url: episode.hls_480
      },
      {
        quality: '720p',
        url: episode.hls_720
      },
      {
        quality: '1080p',
        url: episode.hls_1080
      }
    ].filter(quality => quality.url !== null);

    // Возвращаем данные эпизода
    res.json(transformedEpisode);
  } catch (error) {
    console.error('Ошибка при получении данных от внешнего API:', error);
    res.status(500).send('Ошибка при получении данных от внешнего API');
  }
});

module.exports = router;
