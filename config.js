// config.js
export const CONFIG = {
    RAWG_API_KEY: '47fbdebb576e4213baa55cb1eba2f983', // Получите ключ на https://rawg.io/apidocs
    RAWG_BASE_URL: 'https://api.rawg.io/api',
    FREETOGAME_BASE_URL: 'https://www.freetogame.com/api',

    // Настройки по умолчанию
    DEFAULT_WIDGETS: ['randomGame', 'gameNews', 'gameFact', 'gameList'],
    ANIMATION_DURATION: 300,
    SKELETON_DELAY: 800,

    // Иконки для магазинов
    STORE_ICONS: {
        steam: 'fa-brands fa-steam',
        'epic-games': 'fa-brands fa-epic-games',
        gog: 'fa-brands fa-gog',
        nintendo: 'fa-brands fa-nintendo-switch',
        playstation: 'fa-brands fa-playstation',
        xbox: 'fa-brands fa-xbox',
        'xbox-store': 'fa-brands fa-xbox',
        'apple-store': 'fa-brands fa-apple',
        'google-play': 'fa-brands fa-google-play',
        itch: 'fa-brands fa-itch-io',
        origin: 'fa-brands fa-origin',
        uplay: 'fa-brands fa-uplay'
    },

    // Опции для фильтров
    FILTER_OPTIONS: {
        genres: [
            { value: 'all', label: 'Все жанры' },
            { value: 'action', label: 'Action' },
            { value: 'adventure', label: 'Adventure' },
            { value: 'rpg', label: 'RPG' },
            { value: 'strategy', label: 'Strategy' },
            { value: 'shooter', label: 'Shooter' },
            { value: 'puzzle', label: 'Puzzle' },
            { value: 'racing', label: 'Racing' },
            { value: 'sports', label: 'Sports' },
            { value: 'horror', label: 'Horror' }
        ],
        platforms: [
            { value: 'all', label: 'Все платформы' },
            { value: 'pc', label: 'PC' },
            { value: 'playstation', label: 'PlayStation' },
            { value: 'xbox', label: 'Xbox' },
            { value: 'nintendo', label: 'Nintendo' },
            { value: 'ios', label: 'iOS' },
            { value: 'android', label: 'Android' }
        ],
        ratings: [
            { value: 'all', label: 'Любой рейтинг' },
            { value: 'high', label: 'Высокий (4.0+)' },
            { value: 'medium', label: 'Средний (3.0-3.9)' },
            { value: 'low', label: 'Низкий (<3.0)' }
        ],
        years: [
            { value: 'all', label: 'Все годы' },
            { value: '2025-2026', label: '2025-2026' },
            { value: '2020-2024', label: '2020-2024' },
            { value: '2010-2019', label: '2010-2019' },
            { value: '2000-2009', label: '2000-2009' },
            { value: 'classic', label: 'Классика (до 2000)' }
        ]
    }
};  