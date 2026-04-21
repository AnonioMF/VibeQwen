/**
 * Mock-данные для аниме-форума
 * Содержит: пользователей, категории, темы, посты, цитаты
 */

// ========================================
// ПОЛЬЗОВАТЕЛИ (10 пользователей)
// ========================================
const mockUsers = [
    {
        id: 1,
        username: "NarutoFan2024",
        avatar: "https://i.pravatar.cc/150?img=1",
        rank: "Администратор",
        status: "online",
        messages: 1547,
        reputation: 892,
        regDate: "2020-03-15",
        lastVisit: "2024-01-15 14:30",
        signature: "Воля огня никогда не угаснет! 🔥",
        badges: ["Админ", "Ветеран", "Эксперт"],
        favorites: [
            { title: "Naruto Shippuden", image: "https://picsum.photos/seed/naruto/50/70", rating: "10/10" },
            { title: "One Piece", image: "https://picsum.photos/seed/onepiece/50/70", rating: "10/10" },
            { title: "Bleach", image: "https://picsum.photos/seed/bleach/50/70", rating: "9/10" }
        ]
    },
    {
        id: 2,
        username: "SakuraChan",
        avatar: "https://i.pravatar.cc/150?img=5",
        rank: "Модератор",
        status: "online",
        messages: 982,
        reputation: 654,
        regDate: "2021-06-20",
        lastVisit: "2024-01-15 13:45",
        signature: "Любовь спасет мир! 🌸",
        badges: ["Модератор", "Помощник"],
        favorites: [
            { title: "Fruits Basket", image: "https://picsum.photos/seed/fruits/50/70", rating: "10/10" },
            { title: "Your Lie in April", image: "https://picsum.photos/seed/april/50/70", rating: "9/10" }
        ]
    },
    {
        id: 3,
        username: "TitanSlayer",
        avatar: "https://i.pravatar.cc/150?img=3",
        rank: "Опытный пользователь",
        status: "offline",
        messages: 756,
        reputation: 423,
        regDate: "2021-09-10",
        lastVisit: "2024-01-14 20:15",
        signature: "Свобода или смерть!",
        badges: ["Эксперт", "Критик"],
        favorites: [
            { title: "Attack on Titan", image: "https://picsum.photos/seed/titan/50/70", rating: "10/10" },
            { title: "Demon Slayer", image: "https://picsum.photos/seed/demon/50/70", rating: "9/10" }
        ]
    },
    {
        id: 4,
        username: "KawaiiGirl",
        avatar: "https://i.pravatar.cc/150?img=9",
        rank: "Пользователь",
        status: "online",
        messages: 234,
        reputation: 156,
        regDate: "2022-12-01",
        lastVisit: "2024-01-15 12:00",
        signature: "Все милое - мое! ✨",
        badges: ["Новичок года"],
        favorites: [
            { title: "My Hero Academia", image: "https://picsum.photos/seed/hero/50/70", rating: "8/10" },
            { title: "Spy x Family", image: "https://picsum.photos/seed/spy/50/70", rating: "9/10" }
        ]
    },
    {
        id: 5,
        username: "DragonBallZ",
        avatar: "https://i.pravatar.cc/150?img=11",
        rank: "Ветеран",
        status: "offline",
        messages: 2341,
        reputation: 1205,
        regDate: "2019-05-22",
        lastVisit: "2024-01-13 18:30",
        signature: "Сила внутри тебя!",
        badges: ["Ветеран", "Легенда", "Эксперт"],
        favorites: [
            { title: "Dragon Ball Z", image: "https://picsum.photos/seed/dragon/50/70", rating: "10/10" },
            { title: "Dragon Ball Super", image: "https://picsum.photos/seed/super/50/70", rating: "8/10" }
        ]
    },
    {
        id: 6,
        username: "CosplayQueen",
        avatar: "https://i.pravatar.cc/150?img=20",
        rank: "Модератор",
        status: "online",
        messages: 567,
        reputation: 389,
        regDate: "2021-03-14",
        lastVisit: "2024-01-15 11:20",
        signature: "Косплей - это искусство! 🎭",
        badges: ["Модератор", "Творец", "Косплеер"],
        favorites: [
            { title: "Tokyo Ghoul", image: "https://picsum.photos/seed/ghoul/50/70", rating: "9/10" },
            { title: "Black Butler", image: "https://picsum.photos/seed/butler/50/70", rating: "8/10" }
        ]
    },
    {
        id: 7,
        username: "MangaReader99",
        avatar: "https://i.pravatar.cc/150?img=13",
        rank: "Опытный пользователь",
        status: "offline",
        messages: 445,
        reputation: 267,
        regDate: "2022-01-08",
        lastVisit: "2024-01-14 22:45",
        signature: "Читаю мангу быстрее света!",
        badges: ["Читатель", "Библиофил"],
        favorites: [
            { title: "Berserk", image: "https://picsum.photos/seed/berserk/50/70", rating: "10/10" },
            { title: "Vinland Saga", image: "https://picsum.photos/seed/vinland/50/70", rating: "9/10" }
        ]
    },
    {
        id: 8,
        username: "AnimeArtist",
        avatar: "https://i.pravatar.cc/150?img=17",
        rank: "Пользователь",
        status: "online",
        messages: 189,
        reputation: 234,
        regDate: "2023-02-28",
        lastVisit: "2024-01-15 10:15",
        signature: "Рисую каждый день! 🎨",
        badges: ["Художник", "Творец"],
        favorites: [
            { title: "Violet Evergarden", image: "https://picsum.photos/seed/violet/50/70", rating: "10/10" },
            { title: "A Silent Voice", image: "https://picsum.photos/seed/silent/50/70", rating: "10/10" }
        ]
    },
    {
        id: 9,
        username: "OtakuLife",
        avatar: "https://i.pravatar.cc/150?img=52",
        rank: "Ветеран",
        status: "offline",
        messages: 1876,
        reputation: 945,
        regDate: "2020-07-19",
        lastVisit: "2024-01-15 08:00",
        signature: "Аниме - моя жизнь!",
        badges: ["Ветеран", "Отаку", "Эксперт"],
        favorites: [
            { title: "Steins;Gate", image: "https://picsum.photos/seed/steins/50/70", rating: "10/10" },
            { title: "Re:Zero", image: "https://picsum.photos/seed/rezero/50/70", rating: "9/10" }
        ]
    },
    {
        id: 10,
        username: "NewbieSan",
        avatar: "https://i.pravatar.cc/150?img=33",
        rank: "Новичок",
        status: "online",
        messages: 45,
        reputation: 23,
        regDate: "2024-01-01",
        lastVisit: "2024-01-15 14:00",
        signature: "Только начал свой путь!",
        badges: ["Новичок"],
        favorites: [
            { title: "Death Note", image: "https://picsum.photos/seed/death/50/70", rating: "9/10" }
        ]
    }
];

// ========================================
// КАТЕГОРИИ ФОРУМА (5 категорий)
// ========================================
const mockCategories = [
    {
        id: 1,
        name: "Обсуждение аниме",
        description: "Обсуждайте ваши любимые аниме сериалы и фильмы",
        icon: "fa-film",
        topics: 156,
        posts: 2341,
        color: "#ff6b9d"
    },
    {
        id: 2,
        name: "Манга и ранобэ",
        description: "Все о манге, ранобэ и лайт-новеллах",
        icon: "fa-book",
        topics: 89,
        posts: 1234,
        color: "#c445f0"
    },
    {
        id: 3,
        name: "Арт и творчество",
        description: "Делитесь своими рисунками, фанартами и творчеством",
        icon: "fa-palette",
        topics: 234,
        posts: 3456,
        color: "#00d4ff"
    },
    {
        id: 4,
        name: "Косплей",
        description: "Косплей фотографии, советы и обсуждения",
        icon: "fa-mask",
        topics: 67,
        posts: 892,
        color: "#ff9a3c"
    },
    {
        id: 5,
        name: "Off-topic",
        description: "Свободное общение на любые темы",
        icon: "fa-comments",
        topics: 445,
        posts: 5678,
        color: "#48bb78"
    }
];

// ========================================
// ТЕМЫ ФОРУМА (20 тем)
// ========================================
const mockTopics = [
    {
        id: 1,
        categoryId: 1,
        title: "Какие аниме посмотреть в 2024 году?",
        authorId: 1,
        createdAt: "2024-01-10 10:30",
        views: 1234,
        replies: 45,
        likes: 89,
        tags: ["рекомендации", "2024", "новинки"],
        isPinned: true,
        isLocked: false
    },
    {
        id: 2,
        categoryId: 1,
        title: "Лучшие сёнен аниме всех времен",
        authorId: 5,
        createdAt: "2024-01-08 14:20",
        views: 2345,
        replies: 78,
        likes: 156,
        tags: ["сёнен", "топ", "классика"],
        isPinned: false,
        isLocked: false
    },
    {
        id: 3,
        categoryId: 1,
        title: "Обсуждение финала Attack on Titan",
        authorId: 3,
        createdAt: "2024-01-12 18:45",
        views: 3456,
        replies: 234,
        likes: 123,
        tags: ["spoilers", "атака титанов", "финал"],
        isPinned: false,
        isLocked: false
    },
    {
        id: 4,
        categoryId: 2,
        title: "Манга vs Аниме - что лучше?",
        authorId: 7,
        createdAt: "2024-01-05 09:15",
        views: 1890,
        replies: 156,
        likes: 67,
        tags: ["манга", "аниме", "сравнение"],
        isPinned: false,
        isLocked: false
    },
    {
        id: 5,
        categoryId: 2,
        title: "Рекомендации по ранобэ для новичков",
        authorId: 2,
        createdAt: "2024-01-11 16:30",
        views: 987,
        replies: 34,
        likes: 45,
        tags: ["ранобэ", "рекомендации", "новички"],
        isPinned: false,
        isLocked: false
    },
    {
        id: 6,
        categoryId: 3,
        title: "Мой фанарт по Demon Slayer",
        authorId: 8,
        createdAt: "2024-01-14 12:00",
        views: 567,
        replies: 23,
        likes: 89,
        tags: ["фанарт", "рисунок", "истребитель демонов"],
        isPinned: false,
        isLocked: false
    },
    {
        id: 7,
        categoryId: 3,
        title: "Уроки рисования в стиле аниме",
        authorId: 8,
        createdAt: "2024-01-03 11:45",
        views: 2345,
        replies: 67,
        likes: 234,
        tags: ["урок", "рисование", "tutorial"],
        isPinned: true,
        isLocked: false
    },
    {
        id: 8,
        categoryId: 4,
        title: "Мой первый косплей на Неко",
        authorId: 6,
        createdAt: "2024-01-13 15:20",
        views: 890,
        replies: 45,
        likes: 167,
        tags: ["косплей", "фото", "неко"],
        isPinned: false,
        isLocked: false
    },
    {
        id: 9,
        categoryId: 4,
        title: "Где заказать качественный парик?",
        authorId: 4,
        createdAt: "2024-01-09 10:10",
        views: 456,
        replies: 28,
        likes: 34,
        tags: ["вопрос", "парик", "помощь"],
        isPinned: false,
        isLocked: false
    },
    {
        id: 10,
        categoryId: 5,
        title: "Поздравляем с Новым Годом!",
        authorId: 1,
        createdAt: "2024-01-01 00:00",
        views: 3456,
        replies: 189,
        likes: 345,
        tags: ["праздник", "новый год", "поздравление"],
        isPinned: true,
        isLocked: false
    },
    {
        id: 11,
        categoryId: 1,
        title: "Топ 10 саундтреков из аниме",
        authorId: 9,
        createdAt: "2024-01-07 13:25",
        views: 1234,
        replies: 56,
        likes: 78,
        tags: ["музыка", "саундтрек", "топ"],
        isPinned: false,
        isLocked: false
    },
    {
        id: 12,
        categoryId: 1,
        title: "Jujutsu Kaisen - обсуждение 2 сезона",
        authorId: 3,
        createdAt: "2024-01-06 19:40",
        views: 2890,
        replies: 167,
        likes: 145,
        tags: ["магическая битва", "2 сезон", "обсуждение"],
        isPinned: false,
        isLocked: false
    },
    {
        id: 13,
        categoryId: 2,
        title: "One Piece - главы выходят слишком редко!",
        authorId: 5,
        createdAt: "2024-01-04 08:50",
        views: 1567,
        replies: 89,
        likes: 56,
        tags: ["ван пис", "манга", "ожидание"],
        isPinned: false,
        isLocked: false
    },
    {
        id: 14,
        categoryId: 3,
        title: "Конкурс рисунков - итоги декабря",
        authorId: 2,
        createdAt: "2024-01-02 17:30",
        views: 678,
        replies: 34,
        likes: 123,
        tags: ["конкурс", "итоги", "декабрь"],
        isPinned: false,
        isLocked: true
    },
    {
        id: 15,
        categoryId: 5,
        title: "Ваши планы на выходные?",
        authorId: 4,
        createdAt: "2024-01-13 09:00",
        views: 345,
        replies: 67,
        likes: 23,
        tags: ["offtopic", "выходные", "планы"],
        isPinned: false,
        isLocked: false
    },
    {
        id: 16,
        categoryId: 1,
        title: "Frieren - лучшее аниме года?",
        authorId: 9,
        createdAt: "2024-01-15 08:30",
        views: 567,
        replies: 34,
        likes: 67,
        tags: ["фрирен", "2024", "обсуждение"],
        isPinned: false,
        isLocked: false
    },
    {
        id: 17,
        categoryId: 2,
        title: "Chainsaw Man - стоит ли читать?",
        authorId: 10,
        createdAt: "2024-01-14 20:15",
        views: 234,
        replies: 18,
        likes: 12,
        tags: ["человек бензопила", "вопрос", "рекомендации"],
        isPinned: false,
        isLocked: false
    },
    {
        id: 18,
        categoryId: 3,
        title: "Digital vs Traditional - чем рисуете вы?",
        authorId: 8,
        createdAt: "2024-01-11 14:45",
        views: 456,
        replies: 45,
        likes: 34,
        tags: ["рисование", "digital", "traditional"],
        isPinned: false,
        isLocked: false
    },
    {
        id: 19,
        categoryId: 4,
        title: "Советы для начинающих косплееров",
        authorId: 6,
        createdAt: "2024-01-08 11:20",
        views: 789,
        replies: 56,
        likes: 89,
        tags: ["советы", "новички", "косплей"],
        isPinned: false,
        isLocked: false
    },
    {
        id: 20,
        categoryId: 5,
        title: "Музыкальные предпочтения отаку",
        authorId: 7,
        createdAt: "2024-01-10 16:55",
        views: 567,
        replies: 78,
        likes: 45,
        tags: ["музыка", "jrock", "jpop"],
        isPinned: false,
        isLocked: false
    }
];

// ========================================
// ПОСТЫ (50 постов)
// ========================================
const mockPosts = [];

// Генерируем посты для каждой темы
mockTopics.forEach(topic => {
    const numPosts = Math.floor(Math.random() * 5) + 3; // 3-7 постов на тему
    
    // Первый пост (создатель темы)
    mockPosts.push({
        id: mockPosts.length + 1,
        topicId: topic.id,
        authorId: topic.authorId,
        content: generatePostContent(topic.title, topic.authorId),
        createdAt: topic.createdAt,
        likes: Math.floor(Math.random() * 50) + 10,
        isOriginal: true
    });
    
    // Дополнительные ответы
    for (let i = 0; i < numPosts; i++) {
        const randomUserId = Math.floor(Math.random() * 10) + 1;
        const hoursLater = (i + 1) * 2;
        mockPosts.push({
            id: mockPosts.length + 1,
            topicId: topic.id,
            authorId: randomUserId,
            content: generatePostContent(topic.title, randomUserId),
            createdAt: calculateDate(topic.createdAt, hoursLater),
            likes: Math.floor(Math.random() * 30) + 1,
            isOriginal: false
        });
    }
});

// Вспомогательная функция для генерации контента поста
function generatePostContent(topicTitle, userId) {
    const contents = [
        `Отличная тема для обсуждения! Я давно хотел поговорить об этом. ${topicTitle} - действительно интересная тема.`,
        `Полностью согласен с автором! Хочу добавить, что это один из лучших примеров в своем роде.`,
        `Интересное мнение. У меня немного другой взгляд на эту ситуацию, но я уважаю вашу точку зрения.`,
        `Спасибо за создание этой темы! Как раз искал где обсудить данный вопрос.`,
        `Хаха, отлично сказано! 😄 Добавлю свои пять копеек к обсуждению.`,
        `Это напоминает мне похожую ситуацию в другом аниме. Кто-нибудь смотрел?`,
        `Ого, сколько комментариев! Тема явно популярная. Прочитал все с большим интересом.`,
        `Как человек с большим опытом, могу сказать, что вы правы в большинстве пунктов.`,
        `Не ожидал такого поворота обсуждения! Но это делает его только интереснее.`,
        `Обязательно посмотрю/прочитаю благодаря вашему совету. Спасибо за рекомендацию!`
    ];
    
    return contents[Math.floor(Math.random() * contents.length)];
}

// Вспомогательная функция для расчета даты
function calculateDate(baseDateStr, hoursToAdd) {
    const date = new Date(baseDateStr.replace(' ', 'T'));
    date.setHours(date.getHours() + hoursToAdd);
    return date.toISOString().replace('T', ' ').substring(0, 16);
}

// ========================================
// АНИМЕ ЦИТАТЫ
// ========================================
const animeQuotes = [
    {
        quote: "Если ты не готов рискнуть жизнью, чтобы стать хотя бы на одну ступеньку выше, то тебе не измениться.",
        character: "Эрен Йегер",
        anime: "Attack on Titan"
    },
    {
        quote: "Люди не могут изменить друг друга. Но когда люди борются, они могут изменить себя.",
        character: "Наруто Узумаки",
        anime: "Naruto"
    },
    {
        quote: "Мир не идеален. Но именно поэтому он так прекрасен.",
        character: "Эдвард Элрик",
        anime: "Fullmetal Alchemist"
    },
    {
        quote: "Страх - это не плохо. Страх помогает нам расти.",
        character: "Гон Фрикс",
        anime: "Hunter x Hunter"
    },
    {
        quote: "Жизнь - это не игра. Здесь нет сохранений и перезагрузок.",
        character: "Ринтаро Окабе",
        anime: "Steins;Gate"
    },
    {
        quote: "Даже если я умру, я буду продолжать любить тебя.",
        character: "Кирицугу Эмия",
        anime: "Fate/Zero"
    },
    {
        quote: "Сила приходит не от физической мощи. Она приходит от непреклонной воли.",
        character: "Мадаara Учиха",
        anime: "Naruto"
    },
    {
        quote: "Нет смысла жить, если ты не пытаешься сделать что-то значимое.",
        character: "Ророноа Зоро",
        anime: "One Piece"
    },
    {
        quote: "Истинная сила заключается в том, чтобы защищать тех, кто тебе дорог.",
        character: "Ичиго Куросаки",
        anime: "Bleach"
    },
    {
        quote: "Будущее принадлежит тем, кто верит в красоту своей мечты.",
        character: "Сенку Ишигами",
        anime: "Dr. Stone"
    }
];

// ========================================
// ЭКСПОРТ ДАННЫХ
// ========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        mockUsers,
        mockCategories,
        mockTopics,
        mockPosts,
        animeQuotes
    };
}
