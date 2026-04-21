/**
 * Основное приложение аниме-форума
 * Обрабатывает навигацию, рендеринг данных и взаимодействие с пользователем
 * Работает с бэкендом через API
 */

// ========================================
// КОНФИГУРАЦИЯ API
// ========================================
const API_BASE_URL = 'http://localhost:3000/api';

// ========================================
// ГЛОБАЛЬНОЕ СОСТОЯНИЕ
// ========================================
const AppState = {
    currentPage: 'home',
    currentTopic: null,
    currentUser: null,
    theme: 'light',
    data: {
        users: [],
        categories: [],
        topics: [],
        posts: [],
        quotes: []
    }
};

// ========================================
// ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
// ========================================
document.addEventListener('DOMContentLoaded', async () => {
    await loadAllData();
    initializeTheme();
    loadUserData();
    renderAll();
    setupEventListeners();
    updateStatistics();
    loadAnimeQuote();
});

// ========================================
// ЗАГРУЗКА ДАННЫХ С БЭКЕНДА
// ========================================
async function loadAllData() {
    try {
        const [categories, topics, users, quotes] = await Promise.all([
            fetchAPI('/categories'),
            fetchAPI('/themes'),
            fetchAPI('/users'),
            fetchAPI('/quotes')
        ]);
        
        AppState.data.categories = categories;
        AppState.data.topics = topics;
        AppState.data.users = users;
        AppState.data.quotes = [quotes]; // Цитата приходит одна
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        showError('Не удалось загрузить данные. Убедитесь, что сервер запущен.');
    }
}

async function fetchAPI(endpoint, options = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
}

// ========================================
// УПРАВЛЕНИЕ ТЕМОЙ (СВЕТЛАЯ/ТЕМНАЯ)
// ========================================
function initializeTheme() {
    const savedTheme = localStorage.getItem('forumTheme') || 'light';
    AppState.theme = savedTheme;
    applyTheme(savedTheme);
}

function toggleTheme() {
    AppState.theme = AppState.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('forumTheme', AppState.theme);
    applyTheme(AppState.theme);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const themeIcon = document.querySelector('#themeToggle i');
    if (themeIcon) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// ========================================
// НАВИГАЦИЯ
// ========================================
function navigateTo(page, params = {}) {
    // Скрываем все страницы
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Показываем нужную страницу
    const targetPage = document.getElementById(`${page}Page`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    AppState.currentPage = page;
    
    // Обновляем хлебные крошки
    updateBreadcrumbs(page, params);
    
    // Прокручиваем вверх
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateBreadcrumbs(page, params) {
    const breadcrumbs = document.getElementById('breadcrumbs');
    if (!breadcrumbs) return;
    
    let html = '<a href="#" data-page="home">Главная</a>';
    
    if (page === 'topic' && params.topic) {
        const category = AppState.data.categories.find(c => c.id === params.topic.categoryId);
        html += '<span class="separator">/</span>';
        html += `<a href="#">${category ? category.name : 'Категория'}</a>`;
        html += '<span class="separator">/</span>';
        html += `<span class="current">${params.topic.title}</span>`;
    } else if (page === 'profile') {
        html += '<span class="separator">/</span>';
        html += '<span class="current">Профиль</span>';
    }
    
    breadcrumbs.innerHTML = html;
}

// ========================================
// РЕНДЕРИНГ ДАННЫХ
// ========================================
function renderAll() {
    renderCategories();
    renderRecentTopics();
    populateCategoryFilters();
    populateNewTopicForm();
    updateStatistics();
}

// Рендеринг категорий
function renderCategories(filteredTopics = null) {
    const container = document.getElementById('categoriesList');
    if (!container) return;
    
    const topics = filteredTopics || AppState.data.topics;
    
    container.innerHTML = AppState.data.categories.map(category => {
        const categoryTopics = topics.filter(t => t.categoryId === category.id);
        const totalPosts = categoryTopics.reduce((sum, t) => sum + t.replies + 1, 0);
        
        return `
            <div class="category-card" data-category-id="${category.id}">
                <div class="category-header">
                    <div class="category-title">
                        <div class="category-icon" style="background: ${category.color}">
                            <i class="fas ${category.icon}"></i>
                        </div>
                        <div class="category-name">
                            <h3>${category.name}</h3>
                            <p>${category.description}</p>
                        </div>
                    </div>
                    <div class="category-stats">
                        <span><i class="fas fa-folder"></i> ${categoryTopics.length} тем</span>
                        <span><i class="fas fa-comments"></i> ${totalPosts} сообщений</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Добавляем обработчики кликов
    container.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const categoryId = parseInt(card.dataset.categoryId);
            filterTopicsByCategory(categoryId);
        });
    });
}

// Рендеринг последних тем
function renderRecentTopics(topics = null) {
    const container = document.getElementById('recentTopicsList');
    if (!container) return;
    
    const displayTopics = topics || [...AppState.data.topics]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10);
    
    container.innerHTML = displayTopics.map(topic => {
        const author = AppState.data.users.find(u => u.id === topic.authorId);
        const category = AppState.data.categories.find(c => c.id === topic.categoryId);
        
        return `
            <div class="topic-card" data-topic-id="${topic.id}">
                <img src="${author?.avatar || 'https://i.pravatar.cc/150'}" alt="${author?.username}" class="topic-avatar">
                <div class="topic-info">
                    <h4>${topic.isPinned ? '<i class="fas fa-thumbtack"></i> ' : ''}${topic.title}</h4>
                    <div class="topic-meta">
                        <span><i class="fas fa-user"></i> ${author?.username || 'Unknown'}</span>
                        <span><i class="fas fa-folder"></i> ${category?.name || 'Uncategorized'}</span>
                        <span><i class="fas fa-clock"></i> ${formatDate(topic.createdAt)}</span>
                    </div>
                    <div class="topic-tags">
                        ${topic.tags.slice(0, 3).map(tag => `<span class="topic-tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="topic-replies">
                    <span class="topic-replies-count">${topic.replies}</span>
                    <span class="topic-replies-label">ответов</span>
                </div>
            </div>
        `;
    }).join('');
    
    // Добавляем обработчики кликов
    container.querySelectorAll('.topic-card').forEach(card => {
        card.addEventListener('click', () => {
            const topicId = parseInt(card.dataset.topicId);
            openTopic(topicId);
        });
    });
}

// Рендеринг темы с постами
function renderTopic(topic) {
    if (!topic) return;
    
    AppState.currentTopic = topic;
    
    // Обновляем заголовок
    document.getElementById('topicTitle').textContent = topic.title;
    
    // Обновляем теги
    const tagsContainer = document.getElementById('topicTags');
    tagsContainer.innerHTML = topic.tags.map(tag => 
        `<span class="topic-tag">${tag}</span>`
    ).join('');
    
    // Получаем посты для этой темы
    const topicPosts = AppState.data.posts
        .filter(p => p.topicId === topic.id)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    
    // Рендерим посты
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = topicPosts.map((post, index) => renderPost(post, index === 0)).join('');
    
    // Навешиваем обработчики на реакции
    postsContainer.querySelectorAll('.reaction-btn').forEach(btn => {
        btn.addEventListener('click', handleReaction);
    });
    
    // Навешиваем обработчики на цитирование
    postsContainer.querySelectorAll('.quote-btn').forEach(btn => {
        btn.addEventListener('click', handleQuote);
    });
    
    // Переходим на страницу темы
    navigateTo('topic', { topic });
}

// Рендеринг отдельного поста
function renderPost(post, isOriginal = false) {
    const author = AppState.data.users.find(u => u.id === post.authorId);
    
    return `
        <div class="post-card" data-post-id="${post.id}">
            <div class="post-header">
                <div class="post-author">
                    <img src="${author?.avatar || 'https://i.pravatar.cc/150'}" alt="${author?.username}" class="post-avatar">
                    <div class="author-info">
                        <h4>${author?.username || 'Unknown'}</h4>
                        <span class="author-rank">${author?.rank || 'Пользователь'}</span>
                    </div>
                </div>
                <div class="post-meta">
                    <span class="post-status ${author?.status || 'offline'}">${author?.status === 'online' ? 'Онлайн' : 'Офлайн'}</span>
                    <span class="post-date"><i class="far fa-clock"></i> ${formatDate(post.createdAt)}</span>
                </div>
            </div>
            <div class="post-content">
                ${isOriginal ? '<p><strong>[Оригинальный пост]</strong></p>' : ''}
                <p>${post.content}</p>
                ${author?.signature ? `<div class="post-signature">${author.signature}</div>` : ''}
            </div>
            <div class="post-footer">
                <div class="post-actions">
                    <button class="quote-btn" data-post-id="${post.id}">
                        <i class="fas fa-quote-right"></i> Цитата
                    </button>
                    <button class="reply-btn" data-post-id="${post.id}">
                        <i class="fas fa-reply"></i> Ответ
                    </button>
                </div>
                <div class="post-reactions">
                    <button class="reaction-btn ${post.userLiked ? 'active' : ''}" data-post-id="${post.id}">
                        <i class="far fa-heart"></i> <span class="likes-count">${post.likes}</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Рендеринг профиля пользователя
function renderProfile(user) {
    if (!user) return;
    
    document.getElementById('profileAvatar').src = user.avatar;
    document.getElementById('profileUsername').textContent = user.username;
    document.getElementById('profileSignature').textContent = user.signature || 'Нет подписи';
    
    // Бейджи
    document.getElementById('profileBadges').innerHTML = user.badges.map(badge => 
        `<span class="badge">${badge}</span>`
    ).join('');
    
    // Статистика
    document.getElementById('profileMessages').textContent = user.messages;
    document.getElementById('profileReputation').textContent = user.reputation;
    document.getElementById('profileRegDate').textContent = formatDate(user.regDate);
    document.getElementById('profileLastVisit').textContent = user.lastVisit;
    
    // Любимые аниме
    document.getElementById('profileFavorites').innerHTML = user.favorites.map(anime => `
        <div class="favorite-item">
            <img src="${anime.image}" alt="${anime.title}">
            <div class="favorite-info">
                <h5>${anime.title}</h5>
                <p>Рейтинг: ${anime.rating}</p>
            </div>
        </div>
    `).join('');
    
    // Недавняя активность
    const userTopics = AppState.data.topics.filter(t => t.authorId === user.id).slice(0, 5);
    document.getElementById('profileActivity').innerHTML = userTopics.map(topic => `
        <div class="activity-item">
            <p>Создал тему: <strong>${topic.title}</strong></p>
            <span><i class="far fa-clock"></i> ${formatDate(topic.createdAt)}</span>
        </div>
    `).join('');
    
    navigateTo('profile');
}

// ========================================
// ОТКРЫТИЕ ТЕМЫ
// ========================================
function openTopic(topicId) {
    const topic = AppState.data.topics.find(t => t.id === topicId);
    if (topic) {
        renderTopic(topic);
    }
}

// ========================================
// ФИЛЬТРАЦИЯ И СОРТИРОВКА
// ========================================
function filterTopicsByCategory(categoryId) {
    const filtered = categoryId === 'all' 
        ? AppState.data.topics 
        : AppState.data.topics.filter(t => t.categoryId === categoryId);
    
    renderRecentTopics(filtered);
}

function sortTopics(sortBy) {
    let sorted = [...AppState.data.topics];
    
    switch(sortBy) {
        case 'date':
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
        case 'popular':
            sorted.sort((a, b) => b.views - a.views);
            break;
        case 'replies':
            sorted.sort((a, b) => b.replies - a.replies);
            break;
    }
    
    renderRecentTopics(sorted);
}

// ========================================
// ОБРАБОТЧИКИ СОБЫТИЙ
// ========================================
function setupEventListeners() {
    // Навигация по страницам
    document.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            
            if (page === 'home') {
                navigateTo('home');
                renderAll();
            } else if (page === 'profile') {
                const currentUser = AppState.data.users[0]; // Для демо берем первого пользователя
                renderProfile(currentUser);
            }
        });
    });
    
    // Переключение темы
    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
    
    // Фильтр категорий
    document.getElementById('categoryFilter')?.addEventListener('change', (e) => {
        filterTopicsByCategory(e.target.value === 'all' ? 'all' : parseInt(e.target.value));
    });
    
    // Сортировка
    document.getElementById('sortOptions')?.addEventListener('change', (e) => {
        sortTopics(e.target.value);
    });
    
    // Кнопка новой темы
    document.getElementById('newTopicBtn')?.addEventListener('click', () => {
        openModal('newTopicModal');
    });
    
    // Закрытие модальных окон
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(btn.closest('.modal').id);
        });
    });
    
    // Отмена создания темы
    document.getElementById('cancelNewTopic')?.addEventListener('click', () => {
        closeModal('newTopicModal');
    });
    
    // Создание новой темы
    document.getElementById('newTopicForm')?.addEventListener('submit', handleNewTopic);
    
    // Быстрый ответ
    document.getElementById('quickReplyForm')?.addEventListener('submit', handleQuickReply);
    
    // Вход
    document.getElementById('loginBtn')?.addEventListener('click', () => {
        openModal('loginModal');
    });
    
    document.getElementById('cancelLogin')?.addEventListener('click', () => {
        closeModal('loginModal');
    });
    
    document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
    
    // Кнопка назад к категориям
    document.getElementById('backToCategories')?.addEventListener('click', () => {
        navigateTo('home');
    });
    
    // Кнопка ответа
    document.getElementById('replyBtn')?.addEventListener('click', () => {
        document.getElementById('quickReplyText').focus();
    });
    
    // Поиск
    document.getElementById('searchBtn')?.addEventListener('click', handleSearch);
    document.getElementById('searchInput')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    
    // Мобильное меню
    document.getElementById('mobileMenuBtn')?.addEventListener('click', toggleMobileMenu);
}

// ========================================
// ОБРАБОТКА РЕАКЦИЙ (ЛАЙКИ)
// ========================================
function handleReaction(e) {
    const btn = e.currentTarget;
    const postId = parseInt(btn.dataset.postId);
    const post = AppState.data.posts.find(p => p.id === postId);
    
    if (post) {
        post.userLiked = !post.userLiked;
        post.likes += post.userLiked ? 1 : -1;
        
        btn.classList.toggle('active');
        btn.querySelector('.likes-count').textContent = post.likes;
        
        // Сохраняем в localStorage
        saveData();
    }
}

// ========================================
// ОБРАБОТКА ЦИТИРОВАНИЯ
// ========================================
function handleQuote(e) {
    const btn = e.currentTarget;
    const postId = parseInt(btn.dataset.postId);
    const post = AppState.data.posts.find(p => p.id === postId);
    const author = AppState.data.users.find(u => u.id === post?.authorId);
    
    if (post && author) {
        const quoteText = `[QUOTE=${author.username}]${post.content}[/QUOTE]\n\n`;
        const replyBox = document.getElementById('quickReplyText');
        replyBox.value = quoteText + replyBox.value;
        replyBox.focus();
        
        // Прокрутка к форме ответа
        document.querySelector('.quick-reply').scrollIntoView({ behavior: 'smooth' });
    }
}

// ========================================
// СОЗДАНИЕ НОВОЙ ТЕМЫ
// ========================================
async function handleNewTopic(e) {
    e.preventDefault();
    
    const title = document.getElementById('topicTitleInput').value;
    const content = document.getElementById('topicContent').value;
    const categoryId = parseInt(document.getElementById('topicCategory').value);
    const tagsInput = document.getElementById('topicTagsInput').value;
    const tags = tagsInput.split(',').map(t => t.trim()).filter(t => t);
    
    try {
        // Создаем тему через API
        const newTopic = await fetchAPI('/themes', {
            method: 'POST',
            body: JSON.stringify({
                categoryId,
                title,
                authorId: AppState.currentUser?.id || 1,
                tags
            })
        });
        
        // Создаем первый пост
        const newPost = await fetchAPI('/posts', {
            method: 'POST',
            body: JSON.stringify({
                themeId: newTopic.id,
                authorId: AppState.currentUser?.id || 1,
                content
            })
        });
        
        // Закрываем модалку
        closeModal('newTopicModal');
        
        // Очищаем форму
        document.getElementById('newTopicForm').reset();
        
        // Перезагружаем данные и открываем тему
        await loadAllData();
        openTopic(newTopic.id);
        
        // Обновляем статистику
        updateStatistics();
    } catch (error) {
        console.error('Ошибка создания темы:', error);
        showError('Не удалось создать тему. Попробуйте позже.');
    }
}

// ========================================
// БЫСТРЫЙ ОТВЕТ
// ========================================
async function handleQuickReply(e) {
    e.preventDefault();
    
    const content = document.getElementById('quickReplyText').value.trim();
    
    if (!content || !AppState.currentTopic) return;
    
    try {
        await fetchAPI('/posts', {
            method: 'POST',
            body: JSON.stringify({
                themeId: AppState.currentTopic.id,
                authorId: AppState.currentUser?.id || 1,
                content
            })
        });
        
        document.getElementById('quickReplyText').value = '';
        
        // Перезагружаем данные темы
        await loadAllData();
        renderTopic(AppState.currentTopic);
        updateStatistics();
    } catch (error) {
        console.error('Ошибка отправки ответа:', error);
        showError('Не удалось отправить ответ. Попробуйте позже.');
    }
}

// ========================================
// ВХОД ПОЛЬЗОВАТЕЛЯ
// ========================================
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const user = await fetchAPI('/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        
        AppState.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        closeModal('loginModal');
        document.getElementById('loginForm').reset();
        
        alert(`Добро пожаловать, ${user.username}!`);
        updateUserInfo();
    } catch (error) {
        console.error('Ошибка входа:', error);
        alert('Неверный логин или пароль. Для теста используйте: fan@example.com / password123');
    }
}

// Обновление информации о пользователе в интерфейсе
function updateUserInfo() {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn && AppState.currentUser) {
        loginBtn.innerHTML = `<i class="fas fa-user"></i> ${AppState.currentUser.username}`;
        loginBtn.onclick = () => renderProfile(AppState.currentUser);
    }
}

// ========================================
// ПОИСК
// ========================================
function handleSearch() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    
    if (!query) return;
    
    const filteredTopics = AppState.data.topics.filter(topic => 
        topic.title.toLowerCase().includes(query) ||
        topic.tags.some(tag => tag.toLowerCase().includes(query))
    );
    
    if (filteredTopics.length > 0) {
        renderRecentTopics(filteredTopics);
        navigateTo('home');
    } else {
        alert('Ничего не найдено по вашему запросу.');
    }
}

// ========================================
// МОБИЛЬНОЕ МЕНЮ
// ========================================
function toggleMobileMenu() {
    const nav = document.querySelector('.main-nav');
    if (nav) {
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
    }
}

// ========================================
// МОДАЛЬНЫЕ ОКНА
// ========================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// ========================================
// СТАТИСТИКА ФОРУМА
// ========================================
async function updateStatistics() {
    try {
        const stats = await fetchAPI('/stats');
        
        document.getElementById('onlineUsers').textContent = stats.onlineUsers;
        document.getElementById('totalTopics').textContent = stats.totalThemes;
        document.getElementById('totalPosts').textContent = stats.totalPosts;
        
        // Футер статистика
        document.getElementById('footerTotalUsers').textContent = stats.totalUsers;
        document.getElementById('footerTotalTopics').textContent = stats.totalThemes;
        document.getElementById('footerTotalPosts').textContent = stats.totalPosts;
    } catch (error) {
        console.error('Ошибка загрузки статистики:', error);
    }
}

// ========================================
// АНИМЕ ЦИТАТА
// ========================================
async function loadAnimeQuote() {
    try {
        const quote = await fetchAPI('/quotes');
        
        const quoteElement = document.getElementById('animeQuote');
        if (quoteElement) {
            quoteElement.innerHTML = `
                <p>"${quote.text}"</p>
                <cite>- ${quote.author}</cite>
            `;
        }
    } catch (error) {
        console.error('Ошибка загрузки цитаты:', error);
    }
}

// ========================================
// ЗАПОЛНЕНИЕ ФОРМ
// ========================================
function populateCategoryFilters() {
    const select = document.getElementById('categoryFilter');
    const topicSelect = document.getElementById('topicCategory');
    
    if (!select || !topicSelect) return;
    
    const options = AppState.data.categories.map(cat => 
        `<option value="${cat.id}">${cat.name}</option>`
    ).join('');
    
    select.innerHTML = '<option value="all">Все категории</option>' + options;
    topicSelect.innerHTML = options;
}

function populateNewTopicForm() {
    // Уже сделано в populateCategoryFilters
}

// ========================================
// LOCALSTORAGE
// ========================================
function saveData() {
    localStorage.setItem('forumData', JSON.stringify({
        topics: AppState.data.topics,
        posts: AppState.data.posts
    }));
}

function loadUserData() {
    const savedData = localStorage.getItem('forumData');
    if (savedData) {
        const parsed = JSON.parse(savedData);
        AppState.data.topics = parsed.topics || AppState.data.topics;
        AppState.data.posts = parsed.posts || AppState.data.posts;
    }
    
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        AppState.currentUser = JSON.parse(savedUser);
    }
}

// ========================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ========================================
function formatDate(dateString) {
    const date = new Date(dateString.replace(' ', 'T'));
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        return 'Сегодня';
    } else if (diffDays === 1) {
        return 'Вчера';
    } else if (diffDays < 7) {
        return `${diffDays} дн. назад`;
    } else {
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }
}

function getCurrentDateTime() {
    const now = new Date();
    return now.toISOString().replace('T', ' ').substring(0, 16);
}

// Утилита для показа ошибок
function showError(message) {
    alert(message);
    console.error(message);
}

// Закрытие модальных окон по клику вне контента
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});
