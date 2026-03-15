// js/UIComponent.js

export class UIComponent {
    constructor(config) {
        this.id = config.id || `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        this.title = config.title || 'Виджет';
        this.type = config.type || 'base';
        this.element = null;
        this.isMinimized = false;
    }
    
    render() {
        throw new Error('Метод render() должен быть реализован в дочернем классе');
    }
    
    destroy() {
        // Удаляем слушатели событий
        if (this.element) {
            // Клонируем элемент, чтобы удалить все слушатели
            const parent = this.element.parentNode;
            if (parent) {
                parent.removeChild(this.element);
            }
        }
        
        // Очищаем ссылки
        this.element = null;
    }
    
    close() {
        // Добавляем класс анимации
        if (this.element) {
            this.element.classList.add('removing');
            
            // Отправляем событие после анимации
            setTimeout(() => {
                const event = new CustomEvent('closeWidget', {
                    detail: { widgetId: this.id }
                });
                document.dispatchEvent(event);
            }, 300);
        } else {
            // Если элемента нет, отправляем сразу
            const event = new CustomEvent('closeWidget', {
                detail: { widgetId: this.id }
            });
            document.dispatchEvent(event);
        }
    }
    
    minimize() {
        if (!this.element) return;
        
        const content = this.element.querySelector('.widget-content');
        const footer = this.element.querySelector('.widget-footer');
        const icon = this.element.querySelector('.minimize-btn i');
        
        if (content) {
            this.isMinimized = !this.isMinimized;
            
            if (this.isMinimized) {
                content.style.display = 'none';
                if (footer) footer.style.display = 'none';
                if (icon) {
                    icon.className = 'fas fa-plus';
                }
            } else {
                content.style.display = 'block';
                if (footer) footer.style.display = 'flex';
                if (icon) {
                    icon.className = 'fas fa-minus';
                }
            }
        }
    }
    
    showToast(message, type = 'info') {
        const event = new CustomEvent('showToast', {
            detail: { message, type }
        });
        document.dispatchEvent(event);
    }
}
