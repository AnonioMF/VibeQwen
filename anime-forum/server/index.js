const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../')));

// Инициализация базы данных
const defaultData = {
  users: [
    { id: 1, username: 'AnimeFan2024', email: 'fan@example.com', password: 'password123', avatar: 'https://i.pravatar.cc/150?img=1', reputation: 150, messagesCount: 45, registeredAt: '2024-01-15', status: 'online', favoriteAnime: ['Наруто', 'Атака Титанов'], signature: 'Добро пожаловать в мир аниме!' },
    { id: 2, username: 'MangaLover', email: 'manga@example.com', password: 'password123', avatar: 'https://i.pravatar.cc/150?img=2', reputation: 89, messagesCount: 23, registeredAt: '2024-02-20', status: 'offline', favoriteAnime: ['Ван Пис', 'Блич'], signature: 'Читаю мангу каждый день!' },
    { id: 3, username: 'CosplayQueen', email: 'cosplay@example.com', password: 'password123', avatar: 'https://i.pravatar.cc/150?img=3', reputation: 210, messagesCount: 67, registeredAt: '2024-03-10', status: 'online', favoriteAnime: ['Моя геройская академия', 'Токийский гуль'], signature: 'Косплей - моя жизнь!' },
    { id: 4, username: 'OtakuMaster', email: 'otaku@example.com', password: 'password123', avatar: 'https://i.pravatar.cc/150?img=4', reputation: 320, messagesCount: 112, registeredAt: '2024-01-05', status: 'online', favoriteAnime: 'Евангелион', signature: 'Аниме - это искусство.' },
    { id: 5, username: 'NewbieChan', email: 'newbie@example.com', password: 'password123', avatar: 'https://i.pravatar.cc/150?img=5', reputation: 15, messagesCount: 5, registeredAt: '2024-06-01', status: 'offline', favoriteAnime: [], signature: 'Только начинаю свой путь!' }
  ],
  categories: [
    { id: 1, name: 'Обсуждение аниме', description: 'Обсуждаем любимые аниме сериалы и фильмы', icon: '🎬' },
    { id: 2, name: 'Манга и ранобэ', description: 'Все о манге, ранобэ и лайт-новеллах', icon: '📚' },
    { id: 3, name: 'Арт и творчество', description: 'Делимся своими рисунками, фанартами и другим творчеством', icon: '🎨' },
    { id: 4, name: 'Косплей', description: 'Косплей, мастер-классы, фотографии с мероприятий', icon: '🎭' },
    { id: 5, name: 'Off-topic', description: 'Свободное общение на любые темы', icon: '💬' }
  ],
  themes: [
    { id: 1, categoryId: 1, title: 'Какие аниме посмотреть летом 2024?', authorId: 1, createdAt: '2024-06-15T10:30:00Z', views: 245, likes: 18, tags: ['рекомендации', 'новинки'], isPinned: true },
    { id: 2, categoryId: 1, title: 'Атака Титанов - финал обсуждение', authorId: 4, createdAt: '2024-06-14T15:20:00Z', views: 892, likes: 56, tags: ['атака титанов', 'обсуждение'], isPinned: false },
    { id: 3, categoryId: 2, title: 'Лучшая манга по мнению сообщества', authorId: 2, createdAt: '2024-06-13T09:15:00Z', views: 567, likes: 34, tags: ['манга', 'топ'], isPinned: false },
    { id: 4, categoryId: 3, title: 'Мой первый фанарт по Наруто', authorId: 3, createdAt: '2024-06-12T18:45:00Z', views: 321, likes: 42, tags: ['фанарт', 'наруто'], isPinned: false },
    { id: 5, categoryId: 4, title: 'Советы для начинающих косплееров', authorId: 3, createdAt: '2024-06-11T14:00:00Z', views: 445, likes: 29, tags: ['косплей', 'советы'], isPinned: true },
    { id: 6, categoryId: 5, title: 'Поздравляем с наступлением лета!', authorId: 5, createdAt: '2024-06-01T08:00:00Z', views: 189, likes: 15, tags: ['праздник'], isPinned: false },
    { id: 7, categoryId: 1, title: 'Топ 10 аниме всех времен', authorId: 4, createdAt: '2024-05-28T12:30:00Z', views: 1205, likes: 89, tags: ['топ', 'классика'], isPinned: false },
    { id: 8, categoryId: 2, title: 'Ранобэ "Реинкарнация безработного" - стоит ли читать?', authorId: 1, createdAt: '2024-05-25T16:20:00Z', views: 678, likes: 23, tags: ['ранобэ', 'обсуждение'], isPinned: false }
  ],
  posts: [
    { id: 1, themeId: 1, authorId: 1, content: 'Всем привет! Подскажите какие аниме стоит посмотреть этим летом? Интересуют новинки сезона.', createdAt: '2024-06-15T10:30:00Z', likes: 5, parentId: null },
    { id: 2, themeId: 1, authorId: 2, content: 'Рекомендую "Магическую битву" второй сезон и "Человека-бензопилу"!', createdAt: '2024-06-15T11:15:00Z', likes: 8, parentId: 1 },
    { id: 3, themeId: 1, authorId: 4, content: 'Ещё стоит обратить внимание на "Синюю тюрьму" и "Фрирен".', createdAt: '2024-06-15T12:00:00Z', likes: 6, parentId: 1 },
    { id: 4, themeId: 2, authorId: 4, content: 'Наконец-то вышел финал! Кто уже посмотрел? Давайте обсудим без спойлеров для тех, кто не смотрел.', createdAt: '2024-06-14T15:20:00Z', likes: 12, parentId: null },
    { id: 5, themeId: 2, authorId: 1, content: 'Посмотрел! Эмоции зашкаливают, но концовка немного разочаровала...', createdAt: '2024-06-14T16:30:00Z', likes: 4, parentId: 4 },
    { id: 6, themeId: 2, authorId: 3, content: 'А мне понравилось! Исаяма всё правильно сделал.', createdAt: '2024-06-14T17:45:00Z', likes: 7, parentId: 4 },
    { id: 7, themeId: 3, authorId: 2, content: 'Давайте составим топ лучшей манги по мнению нашего сообщества. Пишите свои варианты!', createdAt: '2024-06-13T09:15:00Z', likes: 10, parentId: null },
    { id: 8, themeId: 3, authorId: 1, content: 'Однозначно "Берсерк" и "Ван Пис" должны быть в топе.', createdAt: '2024-06-13T10:20:00Z', likes: 5, parentId: 7 },
    { id: 9, themeId: 4, authorId: 3, content: 'Всем привет! Это мой первый фанарт по Наруто. Критика приветствуется!', createdAt: '2024-06-12T18:45:00Z', likes: 15, parentId: null },
    { id: 10, themeId: 4, authorId: 4, content: 'Отличная работа! Особенно хорошо проработаны глаза.', createdAt: '2024-06-12T19:30:00Z', likes: 3, parentId: 9 },
    { id: 11, themeId: 5, authorId: 3, content: 'Привет всем новичкам! Решила написать небольшой гайд по выбору костюма и материалов.', createdAt: '2024-06-11T14:00:00Z', likes: 20, parentId: null },
    { id: 12, themeId: 5, authorId: 5, content: 'Спасибо за советы! Очень пригодятся для моего первого косплея.', createdAt: '2024-06-11T15:30:00Z', likes: 2, parentId: 11 },
    { id: 13, themeId: 6, authorId: 5, content: 'Всех с началом лета! Желаю всем отличного настроения и новых аниме впечатлений!', createdAt: '2024-06-01T08:00:00Z', likes: 8, parentId: null },
    { id: 14, themeId: 7, authorId: 4, content: 'Составил свой личный топ 10 аниме всех времен. Делюсь с вами:\n1. Евангелион\n2. Атака Титанов\n3. Стальной алхимик\n4. Тетрадь смерти\n5. Наруто\n6. Ван Пис\n7. Блич\n8. Код Гиас\n9. Фуллметал паник\n10. Cowboy Bebop\n\nА какой ваш топ?', createdAt: '2024-05-28T12:30:00Z', likes: 25, parentId: null },
    { id: 15, themeId: 8, authorId: 1, content: 'Начал читать "Реинкарнацию безработного". Стоит ли продолжать или лучше сразу аниме смотреть?', createdAt: '2024-05-25T16:20:00Z', likes: 3, parentId: null }
  ],
  quotes: [
    { text: 'Если ты не рискуешь, ты не выигрываешь.', author: 'Наруто Узумаки' },
    { text: 'Мир не идеален, но именно поэтому он так прекрасен.', author: 'Стальной алхимик' },
    { text: 'Люди не могут изменить свою судьбу.', author: 'Атака Титанов' },
    { text: 'Сила приходит не от физических возможностей, а от несгибаемой воли.', author: 'Наруто' },
    { text: 'Даже если мы забудем друг друга, я снова найду тебя.', author: 'Твоё имя' },
    { text: 'Жизнь — это не игра, где можно сохраниться перед боссом.', author: 'Моя геройская академия' },
    { text: 'Неважно, насколько ты силён, не стоит становиться врагом одиночки.', author: 'Блич' },
    { text: 'Мы все живём в мире иллюзий.', author: 'Евангелион' },
    { text: 'Истинная сила — это защищать тех, кто тебе дорог.', author: 'Фейри Тейл' },
    { text: 'Будущее всегда туманно, но именно поэтому оно интересно.', author: 'Штейнс;Гейт' }
  ]
};

const dbFile = path.join(__dirname, 'db.json');
const db = new Low(new JSONFile(dbFile), defaultData);

// Загрузка данных
async function initDB() {
  await db.read();
  if (!db.data) {
    db.data = defaultData;
    await db.write();
  }
}

// API Routes

// Пользователи
app.get('/api/users', async (req, res) => {
  await db.read();
  const { status } = req.query;
  let users = db.data.users;
  if (status) {
    users = users.filter(u => u.status === status);
  }
  res.json(users);
});

app.get('/api/users/:id', async (req, res) => {
  await db.read();
  const user = db.data.users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'Пользователь не найден' });
  res.json(user);
});

app.post('/api/users/login', async (req, res) => {
  await db.read();
  const { email, password } = req.body;
  const user = db.data.users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Неверный логин или пароль' });
  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

app.post('/api/users/register', async (req, res) => {
  await db.read();
  const { username, email, password } = req.body;
  
  if (db.data.users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email уже зарегистрирован' });
  }
  
  const newUser = {
    id: db.data.users.length + 1,
    username,
    email,
    password,
    avatar: `https://i.pravatar.cc/150?img=${db.data.users.length + 1}`,
    reputation: 0,
    messagesCount: 0,
    registeredAt: new Date().toISOString().split('T')[0],
    status: 'offline',
    favoriteAnime: [],
    signature: ''
  };
  
  db.data.users.push(newUser);
  await db.write();
  
  const { password: _, ...userWithoutPassword } = newUser;
  res.json(userWithoutPassword);
});

// Категории
app.get('/api/categories', async (req, res) => {
  await db.read();
  res.json(db.data.categories);
});

// Темы
app.get('/api/themes', async (req, res) => {
  await db.read();
  const { categoryId, sort, search } = req.query;
  let themes = db.data.themes;
  
  if (categoryId) {
    themes = themes.filter(t => t.categoryId === parseInt(categoryId));
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    themes = themes.filter(t => t.title.toLowerCase().includes(searchLower));
  }
  
  if (sort === 'popular') {
    themes.sort((a, b) => b.views - a.views);
  } else if (sort === 'likes') {
    themes.sort((a, b) => b.likes - a.likes);
  } else {
    themes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  
  res.json(themes);
});

app.get('/api/themes/:id', async (req, res) => {
  await db.read();
  const theme = db.data.themes.find(t => t.id === parseInt(req.params.id));
  if (!theme) return res.status(404).json({ error: 'Тема не найдена' });
  
  theme.views++;
  await db.write();
  
  res.json(theme);
});

app.post('/api/themes', async (req, res) => {
  await db.read();
  const { categoryId, title, authorId, tags } = req.body;
  
  const newTheme = {
    id: db.data.themes.length + 1,
    categoryId,
    title,
    authorId,
    createdAt: new Date().toISOString(),
    views: 0,
    likes: 0,
    tags: tags || [],
    isPinned: false
  };
  
  db.data.themes.push(newTheme);
  await db.write();
  
  res.json(newTheme);
});

app.post('/api/themes/:id/like', async (req, res) => {
  await db.read();
  const theme = db.data.themes.find(t => t.id === parseInt(req.params.id));
  if (!theme) return res.status(404).json({ error: 'Тема не найдена' });
  
  theme.likes++;
  await db.write();
  
  res.json(theme);
});

// Посты
app.get('/api/posts', async (req, res) => {
  await db.read();
  const { themeId } = req.query;
  let posts = db.data.posts;
  
  if (themeId) {
    posts = posts.filter(p => p.themeId === parseInt(themeId));
  }
  
  posts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  
  res.json(posts);
});

app.post('/api/posts', async (req, res) => {
  await db.read();
  const { themeId, authorId, content, parentId } = req.body;
  
  const newPost = {
    id: db.data.posts.length + 1,
    themeId,
    authorId,
    content,
    createdAt: new Date().toISOString(),
    likes: 0,
    parentId: parentId || null
  };
  
  db.data.posts.push(newPost);
  
  // Увеличиваем счетчик сообщений пользователя
  const user = db.data.users.find(u => u.id === authorId);
  if (user) {
    user.messagesCount++;
  }
  
  await db.write();
  
  res.json(newPost);
});

app.post('/api/posts/:id/like', async (req, res) => {
  await db.read();
  const post = db.data.posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Пост не найден' });
  
  post.likes++;
  await db.write();
  
  res.json(post);
});

// Цитаты
app.get('/api/quotes', async (req, res) => {
  await db.read();
  const randomQuote = db.data.quotes[Math.floor(Math.random() * db.data.quotes.length)];
  res.json(randomQuote);
});

// Статистика
app.get('/api/stats', async (req, res) => {
  await db.read();
  const onlineUsers = db.data.users.filter(u => u.status === 'online').length;
  const totalUsers = db.data.users.length;
  const totalThemes = db.data.themes.length;
  const totalPosts = db.data.posts.length;
  
  res.json({
    onlineUsers,
    totalUsers,
    totalThemes,
    totalPosts
  });
});

// Инициализация и запуск сервера
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(`API доступно по адресу: http://localhost:${PORT}/api`);
  });
});
