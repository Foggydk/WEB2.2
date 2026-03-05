// js/fallbackGames.js

export const fallbackGames = [
    {
        name: "The Witcher 3: Wild Hunt",
        description_raw: "Вы — Геральт из Ривии, наемный убийца чудовищ. В мире, погрязшем в войне и чуме, вам предстоит найти ребенка из древнего пророчества.",
        description: "Вы — Геральт из Ривии, наемный убийца чудовищ. В мире, погрязшем в войне и чуме, вам предстоит найти ребенка из древнего пророчества.",
        rating: 4.7,
        released: "2015-05-18",
        background_image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop",
        genres: [{ name: "RPG" }, { name: "Adventure" }, { name: "Open World" }],
        stores: [
            { store: { name: "Steam", slug: "steam" }, url: "https://store.steampowered.com/app/292030" },
            { store: { name: "GOG", slug: "gog" }, url: "https://www.gog.com/game/the_witcher_3_wild_hunt" },
            { store: { name: "Epic Games", slug: "epic-games" }, url: "https://store.epicgames.com/the-witcher-3-wild-hunt" }
        ]
    },
    {
        name: "Red Dead Redemption 2",
        description_raw: "Америка, 1899 год. Артур Морган и другие подручные Датча ван дер Линде вынуждены пуститься в бега. За головой банды охотятся лучшие сыщики.",
        description: "Америка, 1899 год. Артур Морган и другие подручные Датча ван дер Линде вынуждены пуститься в бега.",
        rating: 4.8,
        released: "2019-11-05",
        background_image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=200&fit=crop",
        genres: [{ name: "Action" }, { name: "Adventure" }, { name: "Western" }],
        stores: [
            { store: { name: "Steam", slug: "steam" }, url: "https://store.steampowered.com/app/1174180" },
            { store: { name: "Epic Games", slug: "epic-games" }, url: "https://store.epicgames.com/red-dead-redemption-2" }
        ]
    },
    {
        name: "Cyberpunk 2077",
        description_raw: "Cyberpunk 2077 — это приключенческая RPG, действие которой разворачивается в Найт-Сити, мегаполисе, где власть, роскошь и модификации тела ценятся превыше всего.",
        description: "Приключенческая RPG в мире будущего, где власть, роскошь и модификации тела ценятся превыше всего.",
        rating: 4.2,
        released: "2020-12-10",
        background_image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=200&fit=crop",
        genres: [{ name: "RPG" }, { name: "Action" }, { name: "Sci-Fi" }],
        stores: [
            { store: { name: "Steam", slug: "steam" }, url: "https://store.steampowered.com/app/1091500" },
            { store: { name: "Epic Games", slug: "epic-games" }, url: "https://store.epicgames.com/cyberpunk-2077" }
        ]
    },
    {
        name: "Portal 2",
        description_raw: "Продолжение одной из самых оригинальных игр в истории. Вооружившись портальной пушкой, вы должны выбраться из разрушенной лаборатории Aperture Science.",
        description: "Продолжение одной из самых оригинальных игр в истории. Вооружившись портальной пушкой, вы должны выбраться из лаборатории.",
        rating: 4.9,
        released: "2011-04-18",
        background_image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=200&fit=crop",
        genres: [{ name: "Puzzle" }, { name: "Platformer" }, { name: "First-Person" }],
        stores: [
            { store: { name: "Steam", slug: "steam" }, url: "https://store.steampowered.com/app/620" }
        ]
    },
    {
        name: "Hades",
        description_raw: "Бросайте вызов богам подземного мира и выбирайтесь из Аида в этом увлекательном roguelike-экшене от создателей Bastion и Transistor.",
        description: "Бросайте вызов богам подземного мира в этом увлекательном roguelike-экшене.",
        rating: 4.9,
        released: "2020-09-17",
        background_image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=200&fit=crop",
        genres: [{ name: "Roguelike" }, { name: "Action" }, { name: "Indie" }],
        stores: [
            { store: { name: "Steam", slug: "steam" }, url: "https://store.steampowered.com/app/1145360" },
            { store: { name: "Epic Games", slug: "epic-games" }, url: "https://store.epicgames.com/hades" }
        ]
    }
];