// main.js
import { Dashboard } from './js/Dashboard.js';
import { CONFIG } from './config.js';

// Глобальный обработчик уведомлений
function setupToastSystem() {
    const toastContainer = document.getElementById('toast-container');

    document.addEventListener('showToast', (e) => {
        const { message, type = 'info' } = e.detail;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideInRight 0.3s reverse';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    });
}

// Глобальный загрузчик
function showGlobalLoader() {
    const loader = document.createElement('div');
    loader.className = 'loading-progress';
    loader.id = 'global-loader';
    document.body.appendChild(loader);

    setTimeout(() => {
        const loaderEl = document.getElementById('global-loader');
        if (loaderEl) {
            loaderEl.style.opacity = '0';
            setTimeout(() => loaderEl.remove(), 300);
        }
    }, 1500);
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    showGlobalLoader();
    setupToastSystem();

    const dashboard = new Dashboard('#dashboard-container');

    // Глобальный обработчик закрытия виджетов
    document.addEventListener('closeWidget', (e) => {
        dashboard.removeWidget(e.detail.widgetId);
    });

    // Кнопки добавления виджетов
    document.getElementById('add-random-game').addEventListener('click', () => {
        dashboard.addWidget('randomGame');
    });

    document.getElementById('add-game-news').addEventListener('click', () => {
        dashboard.addWidget('gameNews');
    });

    document.getElementById('add-game-fact').addEventListener('click', () => {
        dashboard.addWidget('gameFact');
    });

    document.getElementById('add-game-list').addEventListener('click', () => {
        dashboard.addWidget('gameList');
    });

    // Кнопка сброса раскладки
    document.getElementById('reset-layout').addEventListener('click', () => {
        if (confirm('Сбросить все виджеты?')) {
            dashboard.resetLayout();
        }
    });

    // Загружаем сохраненную раскладку
    dashboard.loadLayout();

    // Если нет сохраненных виджетов, добавляем по умолчанию
    setTimeout(() => {
        if (dashboard.widgets.length === 0) {
            CONFIG.DEFAULT_WIDGETS.forEach(type => {
                dashboard.addWidget(type);
            });
        }
    }, 500);
});

// Предупреждение о необходимости API ключа
if (CONFIG.RAWG_API_KEY === 'YOUR_API_KEY_HERE') {
    console.warn('⚠️ Пожалуйста, получите API ключ на https://rawg.io/apidocs и добавьте его в config.js');

    // Показываем уведомление через 2 секунды
    setTimeout(() => {
        const event = new CustomEvent('showToast', {
            detail: {
                message: '⚠️ Добавьте API ключ RAWG в config.js для получения реальных игр',
                type: 'warning'
            }
        });
        document.dispatchEvent(event);
    }, 2000);
}