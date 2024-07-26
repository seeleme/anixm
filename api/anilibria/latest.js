const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    // Получаем данные с API AniLibria
    const response = await axios.get('https://anilibria.top/api/v1/anime/releases/latest');
    const data = response.data;

    // Форматируем ответ
    const formattedData = data.map(item => ({
      id: item.id,
      type: item.type.value, // Изменено
      year: item.year,
      title_ru: item.name.main,
      title_en: item.name.english,
      title_alternative: item.name.alternative,
      alias: item.alias,
      season: item.season.value, // Изменено
      src: item.poster.src,
      fresh_at: item.fresh_at,
      created_at: item.created_at,
      updated_at: item.updated_at,
      is_ongoing: item.is_ongoing,
      age_rating: item.age_rating.value, // Изменено
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

    res.json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
