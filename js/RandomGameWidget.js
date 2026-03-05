// js/RandomGameWidget.js
import { UIComponent } from './UIComponent.js';
import { FilterPanel } from './FilterPanel.js';
import { SkeletonLoader } from './SkeletonLoader.js';
import { CONFIG } from '../config.js';
import { fallbackGames } from './fallbackGames.js';

export class RandomGameWidget extends UIComponent {
    constructor(config) {
        super({ ...config, title: '🎮 Случайная игра' });
        this.currentGame = null;
        this.filters = {
            genre: 'all',
            platform: 'all',
            rating: 'all',
            year: 'all'
        };
        this.filterPanel = new FilterPanel(this.applyFilters.bind(this));
        this.isFilterOpen = false;
    }

    getGenreSlug(genre) {
        const genreMap = {
            'action': 'action',
            'adventure': 'adventure',
            'rpg': 'role-playing-games-rpg',
            'strategy': 'strategy',
            'shooter': 'shooter',
            'puzzle': 'puzzle',
            'racing': 'racing',
            'sports': 'sports',
            'horror': 'horror'
        };
        return genreMap[genre] || '';
    }

    getPlatformId(platform) {
        const platformMap = {
            'pc': 4,
            'playstation': 187,
            'xbox': 14,
            'nintendo': 7,
            'ios': 3,
            'android': 21
        };
        return platformMap[platform] || '';
    }

    getRatingFilter(rating) {
        switch (rating) {
            case 'high':
                return '&metacritic=80,100';
            case 'medium':
                return '&metacritic=60,79';
            case 'low':
                return '&metacritic=0,59';
            default:
                return '';
        }
    }

    getYearFilter(year) {
        switch (year) {
            case '2025-2026':
                return '&dates=2025-01-01,2026-12-31';
            case '2020-2024':
                return '&dates=2020-01-01,2024-12-31';
            case '2010-2019':
                return '&dates=2010-01-01,2019-12-31';
            case '2000-2009':
                return '&dates=2000-01-01,2009-12-31';
            case 'classic':
                return '&dates=1900-01-01,1999-12-31';
            default:
                return '';
        }
    }

    async fetchRandomGame() {
        try {
            let url = `${CONFIG.RAWG_BASE_URL}/games?key=${CONFIG.RAWG_API_KEY}&page_size=40`;

            if (this.filters.genre !== 'all') {
                const genreSlug = this.getGenreSlug(this.filters.genre);
                if (genreSlug) {
                    url += `&genres=${genreSlug}`;
                }
            }

            if (this.filters.platform !== 'all') {
                const platformId = this.getPlatformId(this.filters.platform);
                if (platformId) {
                    url += `&platforms=${platformId}`;
                }
            }

            if (this.filters.rating !== 'all') {
                url += this.getRatingFilter(this.filters.rating);
            }

            if (this.filters.year !== 'all') {
                url += this.getYearFilter(this.filters.year);
            }

            const response = await fetch(url);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const randomIndex = Math.floor(Math.random() * data.results.length);
                const game = data.results[randomIndex];

                // Загружаем детальную информацию
                const gameDetails = await this.fetchGameDetails(game.id);
                return gameDetails || game;
            } else {
                return this.getFallbackGame();
            }
        } catch (error) {
            console.error('Error fetching game:', error);
            this.showToast('Ошибка загрузки игры', 'error');
            return this.getFallbackGame();
        }
    }

    async fetchGameDetails(gameId) {
        try {
            const response = await fetch(
                `${CONFIG.RAWG_BASE_URL}/games/${gameId}?key=${CONFIG.RAWG_API_KEY}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching game details:', error);
            return null;
        }
    }

    getFallbackGame() {
        return fallbackGames[Math.floor(Math.random() * fallbackGames.length)];
    }

    applyFilters(filters) {
        this.filters = filters;
        this.loadNewGame();
        this.filterPanel.toggle();
    }

    async loadNewGame() {
        const gameInfoEl = this.element.querySelector('.game-info');
        if (!gameInfoEl) return;

        gameInfoEl.innerHTML = SkeletonLoader.gameCard();

        // Искусственная задержка для демонстрации скелетона
        setTimeout(async () => {
            const game = await this.fetchRandomGame();
            this.currentGame = game;

            if (game) {
                gameInfoEl.innerHTML = this.renderGameInfo(game);
            } else {
                gameInfoEl.innerHTML = '<div class="error">Не удалось загрузить игру</div>';
            }
        }, 800);
    }

    renderGameInfo(game) {
        const stores = game.stores || [];
        const description = game.description_raw || game.description || 'Описание отсутствует';
        const shortDescription = description.length > 200
            ? description.substring(0, 200) + '...'
            : description;

        return `
            <div class="game-details">
                ${game.background_image ?
                `<img src="${game.background_image}" alt="${game.name}" class="game-image" loading="lazy">` :
                '<div class="no-image">🎮 Нет изображения</div>'
            }
                
                <h4>${game.name}</h4>
                
                <div class="game-meta">
                    <span class="rating"><i class="fas fa-star" style="color: gold;"></i> ${game.rating || 'N/A'}/5</span>
                    <span class="released"><i class="far fa-calendar-alt"></i> ${game.released || 'Неизвестно'}</span>
                </div>
                
                <div class="game-genres">
                    ${game.genres ? game.genres.map(g =>
                `<span class="genre-tag">${g.name}</span>`
            ).join('') : ''}
                </div>
                
                <p class="game-description">
                    ${shortDescription}
                </p>
                
                ${stores.length > 0 ? `
                    <div class="game-stores">
                        <h5><i class="fas fa-shopping-cart"></i> Где купить:</h5>
                        <div class="stores-list">
                            ${stores.slice(0, 5).map(store => `
                                <a href="${store.url}" target="_blank" rel="noopener noreferrer" class="store-link">
                                    <i class="${CONFIG.STORE_ICONS[store.store.slug] || 'fa-solid fa-store'}"></i>
                                    ${store.store.name}
                                    <span class="price">💰 Цену уточняйте</span>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                ` : '<p class="no-stores">Информация о магазинах отсутствует</p>'}
            </div>
        `;
    }

    render() {
        const widget = document.createElement('div');
        widget.className = 'widget random-game-widget';
        widget.dataset.id = this.id;

        const filterPanelEl = this.filterPanel.render();
        filterPanelEl.style.display = 'none';

        widget.innerHTML = `
            <div class="widget-header">
                <h3>${this.title}</h3>
                <div class="widget-controls">
                    <button class="filter-toggle-btn" title="Фильтры">
                        <i class="fas fa-sliders-h"></i>
                    </button>
                    <button class="minimize-btn" title="Свернуть">
                        <i class="fas fa-minus"></i>
                    </button>
                    <button class="close-btn" title="Закрыть">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="widget-content">
                ${filterPanelEl.outerHTML}
                <div class="game-info">
                    ${SkeletonLoader.gameCard()}
                </div>
            </div>
            <div class="widget-footer">
                <button class="btn-secondary refresh-game">
                    <i class="fas fa-dice"></i> Другая игра
                </button>
                <button class="btn-primary add-to-list">
                    <i class="fas fa-plus"></i> В список
                </button>
            </div>
        `;

        this.element = widget;
        this.attachEventListeners();
        this.loadNewGame();

        return widget;
    }

    attachEventListeners() {
        const closeBtn = this.element.querySelector('.close-btn');
        const minimizeBtn = this.element.querySelector('.minimize-btn');
        const filterToggle = this.element.querySelector('.filter-toggle-btn');
        const refreshBtn = this.element.querySelector('.refresh-game');
        const addToListBtn = this.element.querySelector('.add-to-list');
        const filterPanel = this.element.querySelector('.filter-panel');

        closeBtn.addEventListener('click', () => this.close());
        minimizeBtn.addEventListener('click', () => this.minimize());

        filterToggle.addEventListener('click', () => {
            this.isFilterOpen = !this.isFilterOpen;
            if (filterPanel) {
                filterPanel.style.display = this.isFilterOpen ? 'block' : 'none';
            }
        });

        refreshBtn.addEventListener('click', () => {
            refreshBtn.classList.add('loading');
            refreshBtn.innerHTML = '<i class="fas fa-spinner"></i> Загрузка...';

            this.loadNewGame().finally(() => {
                setTimeout(() => {
                    refreshBtn.classList.remove('loading');
                    refreshBtn.innerHTML = '<i class="fas fa-dice"></i> Другая игра';
                }, 500);
            });
        });

        addToListBtn.addEventListener('click', () => {
            if (this.currentGame && this.currentGame.name) {
                const event = new CustomEvent('addGameToList', {
                    detail: { game: this.currentGame }
                });
                document.dispatchEvent(event);
                this.showToast(`Игра "${this.currentGame.name}" добавлена в список`, 'success');
            }
        });
    }
}