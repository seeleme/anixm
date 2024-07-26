const express = require('express');
const axios = require('axios');
const router = express.Router();

// URL внешнего API
const baseExternalApiUrl = 'https://anilibria.top/api/v1/anime/catalog/releases';

// Обработчик маршрута
router.get('/', async (req, res) => {
  const { limit = 25, page = 1 } = req.query;
  const externalApiUrl = `${baseExternalApiUrl}?limit=${limit}&page=${page}`;

  try {
    const response = await axios.get(externalApiUrl);
    const data = response.data;

    const transformedData = data.data.map(item => ({
      id: item.id,
      type: item.type ? item.type.value : undefined,
      year: item.year,
      title_ru: item.name ? item.name.main : undefined,
      title_en: item.name ? item.name.english : undefined,
      title_alternative: item.name ? item.name.alternative : undefined,
      alias: item.alias,
      season: item.season ? item.season.value : undefined,
      src: item.poster ? item.poster.src : undefined,
      fresh_at: item.fresh_at,
      created_at: item.created_at,
      updated_at: item.updated_at,
      is_ongoing: item.is_ongoing,
      age_rating: item.age_rating ? item.age_rating.value : undefined,
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
      genres: item.genres ? item.genres.map(genre => genre.name).join(', ') : undefined
    }));

    res.json(transformedData);
  } catch (error) {
    console.error('Ошибка при получении данных от внешнего API:', error);
    res.status(500).send('Ошибка при получении данных от внешнего API');
  }
});

module.exports = router;
