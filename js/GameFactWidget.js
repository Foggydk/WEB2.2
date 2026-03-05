// js/GameFactWidget.js
import { UIComponent } from './UIComponent.js';
import { SkeletonLoader } from './SkeletonLoader.js';

export class GameFactWidget extends UIComponent {
    constructor(config) {
        super({ ...config, title: '💡 Игровой факт' });
        this.facts = [
            "🕹️ Первая компьютерная игра была создана в 1958 году физиком Уильямом Хигинботэмом",
            "💰 Самая дорогая игра в разработке — Grand Theft Auto V ($265 млн)",
            "📦 Minecraft — самая продаваемая игра в истории (более 300 млн копий)",
            "🦔 Синий ёжик Соник назван в честь хедж-фонда Sonic Funds",
            "🦠 В World of Warcraft виртуальная эпидемия 2005 года изучается учеными",
            "🎴 Nintendo существовала 100 лет до создания игр (производила карты)",
            "👻 Pac-Man изначально назывался Puck-Man",
            "🌍 В GTA: San Andreas планировали добавить реальные города СССР",
            "🔫 DOOM установили на банкоматы и тестеры беременности",
            "⏰ Самый длинный марафон в видеоигру — 138 часов в Mario Kart",
            "🎮 Тетрадь для заметок в игре BioShock называется 'Dishonored' — пасхалка",
            "🐍 В Metal Gear Solid есть персонаж по имени Psycho Mantis, который 'читает' вашу память",
            "🏆 Игроки World of Warcraft потратили более 6 миллионов лет на игру",
            "💀 В Dark Souls есть секретная анимация для падения с большой высоты",
            "🎲 Название 'Xbox' произошло от 'DirectX Box'"
        ];
        this.viewedCount = 0;
    }

    getRandomFact() {
        return this.facts[Math.floor(Math.random() * this.facts.length)];
    }

    updateFact() {
        const factContainer = this.element.querySelector('.fact-text');
        const counterEl = this.element.querySelector('.fact-counter');
        const refreshBtn = this.element.querySelector('.refresh-fact');

        if (!factContainer) return;

        refreshBtn.classList.add('loading');

        // Показываем скелетон
        factContainer.innerHTML = `
            <div class="skeleton-fact">
                <div class="skeleton-fact-line"></div>
                <div class="skeleton-fact-line"></div>
                <div class="skeleton-fact-line"></div>
            </div>
        `;

        setTimeout(() => {
            const newFact = this.getRandomFact();
            this.viewedCount++;

            factContainer.innerHTML = `<p class="fact-text updated">${newFact}</p>`;
            if (counterEl) {
                counterEl.textContent = `📊 Просмотрено фактов: ${this.viewedCount}`;
            }

            refreshBtn.classList.remove('loading');
        }, 400);
    }

    render() {
        const widget = document.createElement('div');
        widget.className = 'widget fact-widget';
        widget.dataset.id = this.id;

        const initialFact = this.getRandomFact();
        this.viewedCount = 1;

        widget.innerHTML = `
            <div class="widget-header">
                <h3>${this.title}</h3>
                <div class="widget-controls">
                    <button class="refresh-fact" title="Новый факт">
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
                <div class="fact-container">
                    <div class="fact-text">${initialFact}</div>
                    <div class="fact-counter">📊 Просмотрено фактов: 1</div>
                </div>
            </div>
        `;

        this.element = widget;
        this.attachEventListeners();

        return widget;
    }

    attachEventListeners() {
        const closeBtn = this.element.querySelector('.close-btn');
        const minimizeBtn = this.element.querySelector('.minimize-btn');
        const refreshBtn = this.element.querySelector('.refresh-fact');

        closeBtn.addEventListener('click', () => this.close());
        minimizeBtn.addEventListener('click', () => this.minimize());
        refreshBtn.addEventListener('click', () => this.updateFact());
    }
}