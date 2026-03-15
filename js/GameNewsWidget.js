// js/GameNewsWidget.js
import { UIComponent } from './UIComponent.js';
import { SkeletonLoader } from './SkeletonLoader.js';

export class GameNewsWidget extends UIComponent {
    constructor(config) {
        super({ ...config, title: '📰 Новости игр' });
        this.news = [];
    }
    
    async loadNews() {
        const newsContainer = this.element.querySelector('.news-container');
        if (!newsContainer) return;
        
        // Показываем скелетоны
        newsContainer.innerHTML = Array(3).fill().map(() => 
            SkeletonLoader.newsCard()
        ).join('');
        
        try {
            // Используем MMOBomb API - работает без VPN
            const response = await fetch('https://mmobomb.com/api1/latestnews');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data && data.length > 0) {
                // Берем первые 5 новостей
                this.news = data.slice(0, 5).map(item => ({
                    title: item.title,
                    short_description: item.short_description || item.article_content?.substring(0, 120) + '...',
                    image: item.image || item.thumbnail,
                    date: new Date(item.published_date).toLocaleDateString('ru-RU'),
                    game_url: item.article_url,
                    platform: 'PC',
                    genre: 'Новости'
                }));
            } else {
                this.news = this.getFallbackNews();
            }
            
            setTimeout(() => {
                newsContainer.innerHTML = this.renderNews();
            }, 600);
            
        } catch (error) {
            console.error('Error loading news:', error);
            this.news = this.getFallbackNews();
            setTimeout(() => {
                newsContainer.innerHTML = this.renderNews();
            }, 600);
        }
    }
    
    getFallbackNews() {
        return [
            {
                title: "Ведьмак 4: Новая глава саги",
                short_description: "CD Projekt Red подтвердила разработку новой части Ведьмака. Игра находится на ранней стадии производства.",
                image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop",
                date: "15.03.2024",
                game_url: "https://www.cyberpunk.net",
                platform: "PC, PS5, Xbox Series",
                genre: "RPG"
            },
            {
                title: "GTA 6: Новые детали",
                description: "Rockstar Games поделилась новыми подробностями о GTA 6. Действие будет происходить в Вайс-Сити.",
                image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=200&fit=crop",
                date: "14.03.2024",
                game_url: "https://www.rockstargames.com",
                platform: "PC, PS5, Xbox Series",
                genre: "Action"
            },
            {
                title: "Elden Ring: Тень Эрдтри",
                short_description: "Вышло крупное дополнение к Elden Ring с новой сюжетной линией и боссами.",
                image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=200&fit=crop",
                date: "10.03.2024",
                game_url: "https://www.eldenring.com",
                platform: "PC, PS5, Xbox Series",
                genre: "RPG"
            }
        ];
    }
    
    renderNews() {
        if (!this.news || this.news.length === 0) {
            return '<div class="error">Нет доступных новостей</div>';
        }
        
        return this.news.map(item => `
            <div class="news-item">
                ${item.image ? `<img src="${item.image}" alt="${item.title}" class="news-image" loading="lazy">` : ''}
                <div class="news-content">
                    <h4>${item.title}</h4>
                    <p class="news-description">${item.short_description || item.description || ''}</p>
                    <div class="news-meta">
                        <span class="news-date"><i class="far fa-calendar-alt"></i> ${item.date || ''}</span>
                        <span class="news-platform"><i class="fas fa-gamepad"></i> ${item.platform || 'PC'}</span>
                        <a href="${item.game_url}" target="_blank" rel="noopener noreferrer" class="news-link">
                            <i class="fas fa-external-link-alt"></i> Читать
                        </a>
                    </div>
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
            refreshBtn.innerHTML = '<i class="fas fa-spinner"></i>';
            
            this.loadNews().finally(() => {
                setTimeout(() => {
                    refreshBtn.classList.remove('loading');
                    refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i>';
                }, 600);
            });
        });
    }
}
