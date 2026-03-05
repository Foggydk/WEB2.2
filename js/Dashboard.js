// js/Dashboard.js
import { RandomGameWidget } from './RandomGameWidget.js';
import { GameNewsWidget } from './GameNewsWidget.js';
import { GameFactWidget } from './GameFactWidget.js';
import { GameListWidget } from './GameListWidget.js';

export class Dashboard {
    constructor(containerSelector) {
        this.widgets = [];
        this.container = document.querySelector(containerSelector);
        this.widgetCounter = 0;

        if (!this.container) {
            console.error('Container not found:', containerSelector);
        }
    }

    addWidget(widgetType) {
        this.widgetCounter++;

        const config = {
            id: `widget-${Date.now()}-${this.widgetCounter}`,
            type: widgetType
        };

        let widget;
        switch (widgetType) {
            case 'randomGame':
                widget = new RandomGameWidget(config);
                break;
            case 'gameNews':
                widget = new GameNewsWidget(config);
                break;
            case 'gameFact':
                widget = new GameFactWidget(config);
                break;
            case 'gameList':
                widget = new GameListWidget(config);
                break;
            default:
                console.error('Unknown widget type:', widgetType);
                return;
        }

        this.widgets.push(widget);

        const widgetElement = widget.render();
        this.container.appendChild(widgetElement);

        this.saveLayout();
        this.showToast(`Виджет "${widget.title}" добавлен`, 'success');

        return widget;
    }

    removeWidget(widgetId) {
        const widgetIndex = this.widgets.findIndex(w => w.id === widgetId);

        if (widgetIndex !== -1) {
            const widget = this.widgets[widgetIndex];
            const widgetElement = document.querySelector(`[data-id="${widgetId}"]`);

            if (widgetElement) {
                widgetElement.classList.add('removing');

                setTimeout(() => {
                    widget.destroy();
                    this.widgets.splice(widgetIndex, 1);
                    this.saveLayout();
                    this.showToast('Виджет удален', 'info');
                }, 300);
            } else {
                widget.destroy();
                this.widgets.splice(widgetIndex, 1);
                this.saveLayout();
            }
        }
    }

    saveLayout() {
        const layout = this.widgets.map(w => ({
            type: w.type,
            id: w.id
        }));

        localStorage.setItem('dashboard-layout', JSON.stringify(layout));
    }

    loadLayout() {
        const savedLayout = localStorage.getItem('dashboard-layout');

        if (savedLayout) {
            try {
                const layout = JSON.parse(savedLayout);

                // Очищаем текущие виджеты
                this.widgets.forEach(w => w.destroy());
                this.widgets = [];
                this.container.innerHTML = '';

                // Восстанавливаем виджеты
                layout.forEach(item => {
                    this.addWidget(item.type);
                });
            } catch (error) {
                console.error('Error loading layout:', error);
            }
        }
    }

    resetLayout() {
        // Очищаем все виджеты с анимацией
        this.widgets.forEach(widget => {
            const element = document.querySelector(`[data-id="${widget.id}"]`);
            if (element) {
                element.classList.add('removing');
            }
        });

        setTimeout(() => {
            this.widgets.forEach(w => w.destroy());
            this.widgets = [];
            this.container.innerHTML = '';
            localStorage.removeItem('dashboard-layout');
            this.showToast('Раскладка сброшена', 'info');
        }, 300);
    }

    showToast(message, type = 'info') {
        const event = new CustomEvent('showToast', {
            detail: { message, type }
        });
        document.dispatchEvent(event);
    }
}