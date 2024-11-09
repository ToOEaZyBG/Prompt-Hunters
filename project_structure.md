# Prompt Hunters - Проектна Структура

## База Данни
- Локация: backend/database/database.sqlite
- Тип: SQLite
- ORM: better-sqlite3

## Основни Директории

### Backend (`/backend`)
```
backend/
├── database/         # База данни
│   └── database.sqlite
├── src/
│   ├── config/          # Конфигурационни файлове
│   │   ├── database.ts  # SQLite конфигурация
│   │   └── swagger.ts   # API документация
│   │
│   ├── controllers/     # API контролери
│   │   └── auth.controller.ts
│   │
│   ├── middlewares/     # Middleware функции
│   │   └── auth.middleware.ts
│   │
│   ├── routes/          # API маршрути
│   │   └── auth.routes.ts
│   │
│   ├── scripts/         # Скриптове
│   │   └── database/    # Скриптове за базата данни
│   │       ├── checkDb.ts
│   │       └── createSuperAdmin.ts
│   ├── types/          # TypeScript типове
│   │   ├── express.d.ts
│   │   ├── formidable.d.ts
│   │   ├── modules.d.ts
│   │   └── swagger.d.ts
│   │
│   └── utils/          # Помощни функции
│
└── admin/             # Административен панел
    ├── src/
    │   ├── components/
    │   │   ├── dashboard/
    │   │   │   ├── ActivityList.tsx    # Списък с последни активности
    │   │   │   ├── PromptsChart.tsx    # Графика за промпти
    │   │   │   └── StatsCard.tsx       # Статистически карти
    │   │   └── layout/
    │   │       ├── AdminLayout.tsx     # Основен layout
    │   │       ├── CustomAppBar.tsx    # Горна лента
    │   │       └── CustomMenu.tsx      # Странична навигация
    │   ├── pages/
    │   │   ├── Dashboard.tsx          # Начална страница
    │   │   ├── users/                 # Управление на потребители
    │   │   │   ├── UserList.tsx
    │   │   │   ├── UserEdit.tsx
    │   │   │   └── UserCreate.tsx
    │   │   └── prompts/               # Управление на промпти
    │   │       ├── PromptList.tsx
    │   │       ├── PromptEdit.tsx
    │   │       └── PromptCreate.tsx
    │   ├── theme/                     # Темизация
    │   │   └── index.ts
    │   └── types/                     # TypeScript типове
    │       └── index.ts
```

### Frontend (`/frontend`)
```
frontend/
├── src/
│   ├── components/    # React компоненти
│   │   ├── auth/     # Автентикация компоненти
│   │   ├── common/   # Общи компоненти
│   │   ├── filters/  # Филтри
│   │   ├── layout/   # Layout компоненти
│   │   ├── newsletter/
│   │   ├── prompts/  # Промпт компоненти
│   │   └── search/   # Търсачка
│   │
│   ├── contexts/     # React контексти
│   │   └── AuthContext.tsx
│   │
│   ├── pages/        # Страници
│   │   ├── auth/     # Автентикация страици
│   │   ├── Browse.tsx
│   │   ├── Home.tsx
│   │   └── SearchResults.tsx
│   │
│   ├── services/     # API услуги
│   │   └── auth.service.ts
│   │
│   ├── theme/        # Дизайн система
│   │   ├── designSystem.ts
│   │   └── index.ts
│   │
│   └── utils/        # Помощни функции
│       └── promptCategorizer.ts
│
└── public/
    └── icons/        # AI модел икони
```

## Основни Функционалности

### Автентикация
- JWT базирана автентикация
- Регистрация и вход
- Профил управление
- Смяна на парола
- Аватар ъплоуд

### Промпти
- Търсене и филтриране
- Категоризация по AI модели
- Рейтинг система
- Коментари
- Покупка/Наемане

### Административен Панел
- Добавен базов layout с навигация
- Имплементиран Dashboard с:
  - Статистически карти (общ брой потребители, промпти, активни потребители)
  - Графика за промпти по категории
  - Списък с последни активности
- Имплементирано управление на потребители:
  - Списък с потребители
  - Създаване на нов потребител
  - Редактиране на потребител
  - Изтриване на потребител
- Имплементирано управление на промпти:
  - Списък с промпти
  - Създаване на нов промпт
  - Редактиране на промпт
  - Изтриване на промпт
- Добавена темизация и стилове:
  - Custom MUI тема
  - Responsive дизайн
  - Консистентни компоненти

## Технологичен Стек
- Frontend: React + TypeScript + Vite
- Backend: Express + TypeScript
- База данни: SQLite + better-sqlite3
- UI библиотека: Material-UI
- Форми: Formik + Yup
- Анимации: Framer Motion
- API документация: Swagger

## Бележки за Развитие
1. Преместване на базата данни в отделна директория
2. Добавяне на миграции
3. Имплементиране на backup система
4. Добавяне на тестове
5. Подготовка за production deployment

## Сигурност
- JWT автентикация
- Защита от SQL injection
- File upload валидация
- CORS конфигурация
- Rate limiting

### Следващи Стъпки
1. Имплементация на реални API заявки
2. Добавяне на филтри и сортиране
3. Имплементация на batch операции
4. Добавяне на потвърждения за изтриване
5. Подобряване на валидацията на формите
6. Добавяне на нотификации за успешни/неуспешни операции
7. Имплементация на история на промените
8. Добавяне на експорт функционалност