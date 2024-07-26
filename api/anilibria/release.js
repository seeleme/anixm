const express = require('express');
const axios = require('axios');
const router = express.Router();

// Базовый URL внешнего API для получения данных о релизе
const externalApiUrl = 'https://anilibria.top/api/v1/anime/releases';

// Обработчик маршрута для получения данных о релизе
router.get('/:releaseId', async (req, res) => {
  const releaseId = req.params.releaseId;

  const url = `${externalApiUrl}/${releaseId}`;

  try {
    const response = await axios.get(url);
    const item = response.data;

    // Трансформируем данные в нужный формат
    const transformedItem = {
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
      is_adult: item.age_rating.is_adult,
      publish_day: item.publish_day.value,
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
      genres: item.genres.map(genre => genre.name).join(', '),
    };

    // Возвращаем массив с объектом релиза
    res.json([transformedItem]);
  } catch (error) {
    console.error('Ошибка при получении данных от внешнего API:', error);
    res.status(500).send('Ошибка при получении данных от внешнего API');
  }
});

module.exports = router;
