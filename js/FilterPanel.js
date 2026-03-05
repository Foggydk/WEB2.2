// js/FilterPanel.js
import { CONFIG } from '../config.js';

export class FilterPanel {
    constructor(onApplyFilters) {
        this.filters = {
            genre: 'all',
            platform: 'all',
            rating: 'all',
            year: 'all'
        };
        this.onApplyFilters = onApplyFilters;
        this.isOpen = false;
        this.element = null;
    }

    render() {
        const panel = document.createElement('div');
        panel.className = 'filter-panel';

        panel.innerHTML = `
            <div class="filter-group">
                <label>Жанр:</label>
                <select class="filter-select" id="genre-filter">
                    ${CONFIG.FILTER_OPTIONS.genres.map(g =>
            `<option value="${g.value}" ${this.filters.genre === g.value ? 'selected' : ''}>${g.label}</option>`
        ).join('')}
                </select>
            </div>
            
            <div class="filter-group">
                <label>Платформа:</label>
                <select class="filter-select" id="platform-filter">
                    ${CONFIG.FILTER_OPTIONS.platforms.map(p =>
            `<option value="${p.value}" ${this.filters.platform === p.value ? 'selected' : ''}>${p.label}</option>`
        ).join('')}
                </select>
            </div>
            
            <div class="filter-group">
                <label>Рейтинг:</label>
                <select class="filter-select" id="rating-filter">
                    ${CONFIG.FILTER_OPTIONS.ratings.map(r =>
            `<option value="${r.value}" ${this.filters.rating === r.value ? 'selected' : ''}>${r.label}</option>`
        ).join('')}
                </select>
            </div>
            
            <div class="filter-group">
                <label>Год выпуска:</label>
                <select class="filter-select" id="year-filter">
                    ${CONFIG.FILTER_OPTIONS.years.map(y =>
            `<option value="${y.value}" ${this.filters.year === y.value ? 'selected' : ''}>${y.label}</option>`
        ).join('')}
                </select>
            </div>
            
            <button class="apply-filters">Применить фильтры</button>
        `;

        this.element = panel;
        this.attachEventListeners();

        return panel;
    }

    attachEventListeners() {
        const applyBtn = this.element.querySelector('.apply-filters');
        applyBtn.addEventListener('click', () => this.applyFilters());
    }

    applyFilters() {
        this.filters = {
            genre: this.element.querySelector('#genre-filter').value,
            platform: this.element.querySelector('#platform-filter').value,
            rating: this.element.querySelector('#rating-filter').value,
            year: this.element.querySelector('#year-filter').value
        };

        if (this.onApplyFilters) {
            this.onApplyFilters(this.filters);
        }
    }

    toggle() {
        this.isOpen = !this.isOpen;
        if (this.element) {
            this.element.style.display = this.isOpen ? 'block' : 'none';
        }
    }
}