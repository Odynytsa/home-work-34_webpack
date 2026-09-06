# Домашня робота 34 — Індивідуальна конфігурація Webpack

Навчальний проєкт зі збірки вебзастосунку за допомогою **Webpack 5**.
Демонструє всі функціональні можливості, розглянуті під час заняття.

## Реалізація вимог завдання

| Вимога | Як реалізовано |
|---|---|
| Хешування імен файлів | `output.filename: '[name].[contenthash].js'`, CSS — `'[name].[contenthash].css'`, асети — `'[name].[contenthash][ext]'` (`webpack.config.js`). Незмінені файли беруться з кешу браузера, змінені — завантажуються заново |
| Локальні шрифти | `src/fonts/roboto-latin-400/700-normal.woff2` (Roboto), правило `asset/resource` з виводом у `assets/fonts/`, підключення через `@font-face` з `font-display: swap` (`src/styles.css`) |
| Зображення | `src/assets/logo.svg`, правило `asset/resource` з виводом у `assets/images/`, імпорт у `src/index.js` і рендер `<img>` на сторінці |
| CSS-стилі | `css-loader` + `mini-css-extract-plugin`, стилі винесені в окремий файл з хешем і підключаються в `index.html` автоматично |
| Оптимізація зовнішніх бібліотек | Точковий імпорт `lodash/join.js` (у бандл потрапляє 693 байти замість ~70 КБ всієї бібліотеки) + `optimization.splitChunks: { chunks: 'all' }` для незалежного кешування вендорного коду |

Додатково: дві точки входу (`main` — застосунок, `stat` — самодостатній модуль статистики кліків),
`output.clean` для автоматичного очищення `dist/`, production-збірка з мінімізацією.

## Структура проєкту

```
├── src/
│   ├── index.js        # точка входу main: пост, логотип, підзаголовок (lodash), стилі
│   ├── statistics.js   # точка входу stat: лічильник кліків (window.statistics)
│   ├── post.js         # клас Post
│   ├── styles.css      # стилі + @font-face (Roboto)
│   ├── index.html      # шаблон сторінки
│   ├── assets/         # зображення (logo.svg)
│   └── fonts/          # локальні шрифти (*.woff2)
├── dist/               # результат production-збірки (закомічений для демонстрації)
├── webpack.config.js   # індивідуальна конфігурація Webpack 5
└── package.json        # залежності та скрипти
```

## Запуск

```bash
npm install   # встановлення залежностей
npm run dev   # збірка в development-режимі
npm run build # production-збірка з мінімізацією (результат — у dist/)
```

Після збірки відкрити `dist/index.html` у браузері.
У консолі доступний об'єкт `statistics`: поклікайте по сторінці та викличте
`statistics.getClicks()`, щоб побачити лічильник.

## Стек

Webpack 5 · html-webpack-plugin · css-loader · mini-css-extract-plugin · lodash · Roboto (локально, woff2)
