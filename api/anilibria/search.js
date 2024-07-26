const express = require('express');
const axios = require('axios');
const router = express.Router();

// Базовый URL внешнего API для поиска
const externalApiUrl = 'https://anilibria.top/api/v1/app/search/releases';

// Обработчик маршрута для поиска релизов
router.get('/release', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).send('Параметр "query" обязателен');
  }

  const url = `${externalApiUrl}?query=${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(url);
    const results = response.data;

    // Трансформируем данные в нужный формат
    const transformedResults = results.map(item => ({
      id: item.id,
      type: item.type.value,
      year: item.year,
      title_ru: item.name.main,
      title_en: item.name.english,
      title_alternative: item.name.alternative,
      alias: item.alias,
      season: item.season.value,
      src: item.poster.src,
      fresh_at: item.fresh_at,
      created_at: item.created_at,
      updated_at: item.updated_at,
      is_ongoing: item.is_ongoing,
      age_rating: item.age_rating.value,
      description: item.description,
      notification: item.notification,
      episodes_total: item.episodes_total,
      external_player: item.external_player,
      is_in_production: item.is_in_production,
      is_blocked_by_geo: item.is_blocked_by_geo,
      episodes_are_unknown: item.episodes_are_unknown,
      is_blocked_by_copyrights: item.is_blocked_by_copyrights,
      added_in_users_favorites: item.added_in_users_favorites,
      average_duration_of_episode: item.average_duration_of_episode,
    }));

    // Возвращаем массив с результатами
    res.json(transformedResults);
  } catch (error) {
    console.error('Ошибка при получении данных от внешнего API:', error);
    res.status(500).send('Ошибка при получении данных от внешнего API');
  }
});

module.exports = router;
