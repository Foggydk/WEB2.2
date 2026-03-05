// js/GameNewsWidget.js
import { UIComponent } from './UIComponent.js';
import { SkeletonLoader } from './SkeletonLoader.js';
import { CONFIG } from '../config.js';

export class GameNewsWidget extends UIComponent {
    constructor(config) {
        super({ ...config, title: '📰 Бесплатные игры' });
        this.news = [];
    }

    async loadNews() {
        const newsContainer = this.element.querySelector('.news-container');
        if (!newsContainer) return;

        newsContainer.innerHTML = Array(3).fill().map(() =>
            SkeletonLoader.newsCard()
        ).join('');

        try {
            const response = await fetch(`${CONFIG.FREETOGAME_BASE_URL}/games?sort-by=release-date`);
            const data = await response.json();

            this.news = data.slice(0, 3);

            setTimeout(() => {
                newsContainer.innerHTML = this.renderNews();
            }, 600);

        } catch (error) {
            console.error('Error loading news:', error);
            this.showToast('Ошибка загрузки новостей', 'error');
            newsContainer.innerHTML = '<div class="error">Не удалось загрузить новости</div>';
        }
    }

    renderNews() {
        if (!this.news || this.news.length === 0) {
            return '<div class="error">Нет доступных игр</div>';
        }

        return this.news.map(game => `
            <div class="news-item">
                <h4>${game.title}</h4>
                <p>${game.short_description || (game.description ? game.description.substring(0, 100) + '...' : 'Нет описания')}</p>
                <div class="news-meta">
                    <span class="platform"><i class="fas fa-gamepad"></i> ${game.platform || 'PC'}</span>
                    <span class="genre"><i class="fas fa-tag"></i> ${game.genre || 'Action'}</span>
                    <a href="${game.game_url || '#'}" target="_blank" rel="noopener noreferrer" class="news-link">
                        <i class="fas fa-external-link-alt"></i> Подробнее
                    </a>
                </div>
            </div>
        `).join('');
    }

    render() {
        const widget = document.createElement('div');
        widget.className = 'widget news-widget';
        widget.dataset.id = this.id;

        widget.innerHTML = `
            <div class="widget-header">
                <h3>${this.title}</h3>
                <div class="widget-controls">
                    <button class="refresh-news" title="Обновить">
                        <i class="fas fa-sync-alt"></i>
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
                <div class="news-container">
                    ${SkeletonLoader.newsCard()}
                    ${SkeletonLoader.newsCard()}
                    ${SkeletonLoader.newsCard()}
                </div>
            </div>
        `;

        this.element = widget;
        this.attachEventListeners();
        this.loadNews();

        return widget;
    }

    attachEventListeners() {
        const closeBtn = this.element.querySelector('.close-btn');
        const minimizeBtn = this.element.querySelector('.minimize-btn');
        const refreshBtn = this.element.querySelector('.refresh-news');

        closeBtn.addEventListener('click', () => this.close());
        minimizeBtn.addEventListener('click', () => this.minimize());

        refreshBtn.addEventListener('click', () => {
            refreshBtn.classList.add('loading');
            this.loadNews().finally(() => {
                setTimeout(() => {
                    refreshBtn.classList.remove('loading');
                }, 600);
            });
        });
    }
}