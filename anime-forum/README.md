# AnimeForum - Аниме Форум

Современный форум для фанатов аниме с полноценным бэкендом.

## 🚀 Быстрый старт

### Требования
- Node.js 16+ 
- npm

### Установка и запуск

1. **Установка зависимостей сервера:**
```bash
cd server
npm install
```

2. **Запуск сервера:**
```bash
npm start
```

Сервер запустится на порту `3000`.

3. **Открытие форума:**
- Откройте `index.html` в браузере через локальный сервер, или
- Перейдите на `http://localhost:3000`

## 📁 Структура проекта

```
anime-forum/
├── index.html          # Главная страница
├── css/
│   └── styles.css      # Стили
├── js/
│   └── app.js          # Frontend логика
├── server/
│   ├── index.js        # Бэкенд (Express + LowDB)
│   ├── package.json    # Зависимости сервера
│   └── db.json         # База данных (создается автоматически)
└── README.md           # Этот файл
```

## 🔌 API Endpoints

### Пользователи
- `GET /api/users` - список всех пользователей
- `GET /api/users/:id` - получить пользователя по ID
- `POST /api/users/login` - вход (email, password)
- `POST /api/users/register` - регистрация

### Категории
- `GET /api/categories` - список категорий

### Темы
- `GET /api/themes` - список тем (с фильтрацией и сортировкой)
- `GET /api/themes/:id` - получить тему по ID
- `POST /api/themes` - создать тему
- `POST /api/themes/:id/like` - лайкнуть тему

### Посты
- `GET /api/posts?themeId=X` - посты темы
- `POST /api/posts` - создать пост
- `POST /api/posts/:id/like` - лайкнуть пост

### Другое
- `GET /api/quotes` - случайная аниме-цитата
- `GET /api/stats` - статистика форума

## 👤 Тестовые пользователи

| Email | Пароль | Имя |
|-------|--------|-----|
| fan@example.com | password123 | AnimeFan2024 |
| manga@example.com | password123 | MangaLover |
| cosplay@example.com | password123 | CosplayQueen |
| otaku@example.com | password123 | OtakuMaster |
| newbie@example.com | password123 | NewbieChan |

## 🎨 Особенности

- ✨ Современный дизайн с glassmorphism эффектами
- 🌓 Тёмная/светлая тема
- 📱 Адаптивный mobile-first дизайн
- 💾 JSON база данных (LowDB)
- 🔐 Авторизация пользователей
- ❤️ Реакции (лайки) на темы и посты
- 🏷️ Теги для тем
- 📊 Статистика форума
- 💬 Аниме-цитаты

## 🛠 Технологии

**Frontend:**
- HTML5, CSS3 (Grid, Flexbox, Custom Properties)
- Vanilla JavaScript (ES6+)
- Font Awesome иконки

**Backend:**
- Node.js
- Express.js
- LowDB (JSON база данных)
- CORS

## 📝 Лицензия

MIT
