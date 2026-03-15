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
                <label>Genre:</label>
                <select class="filter-select" id="genre-filter">
                    <option value="all" selected>All genres</option>
                    <option value="action">Action</option>
                    <option value="adventure">Adventure</option>
                    <option value="rpg">RPG</option>
                    <option value="strategy">Strategy</option>
                    <option value="shooter">Shooter</option>
                    <option value="puzzle">Puzzle</option>
                    <option value="racing">Racing</option>
                    <option value="sports">Sports</option>
                    <option value="horror">Horror</option>
                </select>
            </div>
            
            <div class="filter-group">
                <label>Platform:</label>
                <select class="filter-select" id="platform-filter">
                    <option value="all" selected>All platforms</option>
                    <option value="pc">PC</option>
                    <option value="playstation">PlayStation</option>
                    <option value="xbox">Xbox</option>
                    <option value="nintendo">Nintendo</option>
                    <option value="ios">iOS</option>
                    <option value="android">Android</option>
                </select>
            </div>
            
            <div class="filter-group">
                <label>Rating:</label>
                <select class="filter-select" id="rating-filter">
                    <option value="all" selected>Any rating</option>
                    <option value="high">High (4.0+)</option>
                    <option value="medium">Medium (3.0-3.9)</option>
                    <option value="low">Low (<3.0)</option>
                </select>
            </div>
            
            <div class="filter-group">
                <label>Release year:</label>
                <select class="filter-select" id="year-filter">
                    <option value="all" selected>All years</option>
                    <option value="2025-2026">2025-2026</option>
                    <option value="2020-2024">2020-2024</option>
                    <option value="2010-2019">2010-2019</option>
                    <option value="2000-2009">2000-2009</option>
                    <option value="classic">Classic (before 2000)</option>
                </select>
            </div>
            
            <button class="apply-filters">Apply filters</button>
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
