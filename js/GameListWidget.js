// js/GameListWidget.js
import { UIComponent } from './UIComponent.js';
import { SkeletonLoader } from './SkeletonLoader.js';

export class GameListWidget extends UIComponent {
    constructor(config) {
        super({ ...config, title: '📋 Список игр' });
        this.games = this.loadGames();
    }

    loadGames() {
        const saved = localStorage.getItem('game-list');
        return saved ? JSON.parse(saved) : [
            { id: Date.now() - 1000, name: 'The Witcher 3: Wild Hunt', status: 'completed' },
            { id: Date.now() - 2000, name: 'Cyberpunk 2077', status: 'in-progress' },
            { id: Date.now() - 3000, name: 'Red Dead Redemption 2', status: 'planned' },
            { id: Date.now() - 4000, name: 'Elden Ring', status: 'planned' }
        ];
    }

    saveGames() {
        localStorage.setItem('game-list', JSON.stringify(this.games));
    }

    addGame(name) {
        if (!name.trim()) {
            this.showToast('Введите название игры', 'warning');
            return;
        }

        const newGame = {
            id: Date.now(),
            name: name.trim(),
            status: 'planned'
        };

        this.games.push(newGame);
        this.saveGames();
        this.renderGameList();

        // Подсветка нового элемента
        setTimeout(() => {
            const newItem = this.element.querySelector(`.list-item[data-id="${newGame.id}"]`);
            if (newItem) {
                newItem.classList.add('new');
                setTimeout(() => newItem.classList.remove('new'), 1000);
            }
        }, 50);

        this.showToast(`Игра "${name}" добавлена`, 'success');
    }

    toggleGameStatus(gameId) {
        const game = this.games.find(g => g.id === gameId);
        if (game) {
            const statusMap = {
                'planned': 'in-progress',
                'in-progress': 'completed',
                'completed': 'planned'
            };
            game.status = statusMap[game.status];
            this.saveGames();
            this.renderGameList();
        }
    }

    deleteGame(gameId) {
        const gameElement = this.element.querySelector(`.list-item[data-id="${gameId}"]`);
        const game = this.games.find(g => g.id === gameId);

        if (gameElement) {
            gameElement.style.animation = 'widget-remove 0.2s ease-out forwards';

            setTimeout(() => {
                this.games = this.games.filter(g => g.id !== gameId);
                this.saveGames();
                this.renderGameList();
                if (game) {
                    this.showToast(`Игра "${game.name}" удалена`, 'info');
                }
            }, 200);
        } else {
            this.games = this.games.filter(g => g.id !== gameId);
            this.saveGames();
            this.renderGameList();
        }
    }

    renderGameList() {
        const listContainer = this.element.querySelector('.game-list-container');
        if (!listContainer) return;

        if (this.games.length === 0) {
            listContainer.innerHTML = '<p class="empty-list">🎮 Список пуст. Добавьте игры!</p>';
            return;
        }

        listContainer.innerHTML = this.games.map(game => {
            const statusIcons = {
                'planned': '⏳',
                'in-progress': '🔄',
                'completed': '✅'
            };

            const statusLabels = {
                'planned': 'В планах',
                'in-progress': 'В процессе',
                'completed': 'Пройдено'
            };

            return `
                <div class="list-item" data-id="${game.id}">
                    <button class="status-btn" title="${statusLabels[game.status]}">
                        ${statusIcons[game.status]}
                    </button>
                    <span class="game-name ${game.status}">${game.name}</span>
                    <button class="delete-game" title="Удалить">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        }).join('');

        this.attachListEventListeners();
    }

    attachListEventListeners() {
        const listContainer = this.element.querySelector('.game-list-container');

        listContainer.querySelectorAll('.status-btn').forEach((btn, index) => {
            btn.addEventListener('click', () => this.toggleGameStatus(this.games[index].id));
        });

        listContainer.querySelectorAll('.delete-game').forEach((btn, index) => {
            btn.addEventListener('click', () => this.deleteGame(this.games[index].id));
        });
    }

    render() {
        const widget = document.createElement('div');
        widget.className = 'widget list-widget';
        widget.dataset.id = this.id;

        widget.innerHTML = `
            <div class="widget-header">
                <h3>${this.title}</h3>
                <div class="widget-controls">
                    <button class="minimize-btn" title="Свернуть">
                        <i class="fas fa-minus"></i>
                    </button>
                    <button class="close-btn" title="Закрыть">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="widget-content">
                <div class="add-game-form">
                    <input type="text" class="game-input" placeholder="Название игры..." maxlength="50">
                    <button class="add-game-btn">
                        <i class="fas fa-plus"></i> Добавить
                    </button>
                </div>
                <div class="game-list-container">
                    <!-- Список будет отрисован через JS -->
                </div>
            </div>
        `;

        this.element = widget;
        this.attachEventListeners();
        this.renderGameList();

        return widget;
    }

    attachEventListeners() {
        const closeBtn = this.element.querySelector('.close-btn');
        const minimizeBtn = this.element.querySelector('.minimize-btn');
        const addBtn = this.element.querySelector('.add-game-btn');
        const input = this.element.querySelector('.game-input');

        closeBtn.addEventListener('click', () => this.close());
        minimizeBtn.addEventListener('click', () => this.minimize());

        addBtn.addEventListener('click', () => {
            this.addGame(input.value);
            input.value = '';
        });

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addGame(input.value);
                input.value = '';
            }
        });

        // Слушаем событие добавления игры из RandomGameWidget
        document.addEventListener('addGameToList', (e) => {
            const game = e.detail.game;
            if (game && game.name) {
                const exists = this.games.some(g =>
                    g.name.toLowerCase() === game.name.toLowerCase()
                );

                if (!exists) {
                    this.addGame(game.name);
                } else {
                    this.showToast(`Игра "${game.name}" уже в списке`, 'warning');
                }
            }
        });
    }
}