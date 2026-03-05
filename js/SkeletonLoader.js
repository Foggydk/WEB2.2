// js/SkeletonLoader.js

export class SkeletonLoader {
    static gameCard() {
        return `
            <div class="skeleton-wrapper">
                <div class="skeleton-image"></div>
                <div class="skeleton-title"></div>
                <div class="skeleton-meta">
                    <div class="skeleton-rating"></div>
                    <div class="skeleton-date"></div>
                </div>
                <div class="skeleton-genres">
                    <div class="skeleton-genre"></div>
                    <div class="skeleton-genre"></div>
                    <div class="skeleton-genre"></div>
                </div>
                <div class="skeleton-description">
                    <div class="skeleton-line"></div>
                    <div class="skeleton-line"></div>
                    <div class="skeleton-line"></div>
                </div>
                <div class="skeleton-stores">
                    <div class="skeleton-store"></div>
                    <div class="skeleton-store"></div>
                </div>
            </div>
        `;
    }

    static newsCard() {
        return `
            <div class="skeleton-news-item">
                <div class="skeleton-news-title"></div>
                <div class="skeleton-news-line"></div>
                <div class="skeleton-news-line"></div>
                <div class="skeleton-news-meta">
                    <div class="skeleton-platform"></div>
                    <div class="skeleton-button"></div>
                </div>
            </div>
        `;
    }

    static factCard() {
        return `
            <div class="skeleton-fact">
                <div class="skeleton-fact-line"></div>
                <div class="skeleton-fact-line"></div>
                <div class="skeleton-fact-line"></div>
                <div class="skeleton-fact-counter"></div>
            </div>
        `;
    }

    static listItem() {
        return `
            <div class="skeleton-list-item">
                <div class="skeleton-checkbox"></div>
                <div class="skeleton-list-text"></div>
                <div class="skeleton-delete"></div>
            </div>
        `;
    }
}