# Домашня робота 34 — Індивідуальна конфігурація Webpack

Навчальний проєкт зі збірки вебзастосунку за допомогою **Webpack 5**.
Демонструє всі функціональні можливості, розглянуті під час занять (частини 1 і 2).

## Частина 1. Базова конфігурація

| Вимога | Як реалізовано |
|---|---|
| Хешування імен файлів | `output.filename: '[name].[contenthash].js'`, CSS — `'[name].[contenthash].css'`, асети — `'[name].[contenthash][ext]'` (`webpack.config.js`). Незмінені файли беруться з кешу браузера, змінені — завантажуються заново |
| Локальні шрифти | `src/fonts/roboto-latin-400/700-normal.woff2` (Roboto), правило `asset/resource` з виводом у `assets/fonts/`, підключення через `@font-face` з `font-display: swap` (`src/styles.css`) |
| Зображення | `src/assets/logo.svg`, правило `asset/resource` з виводом у `assets/images/`, імпорт у `src/index.js` і рендер `<img>` на сторінці |
| CSS-стилі | `css-loader` + `mini-css-extract-plugin`, стилі винесені в окремий файл з хешем і підключаються в `index.html` автоматично |
| Оптимізація зовнішніх бібліотек | Точковий імпорт `lodash/join.js` (у бандл потрапляє 693 байти замість ~70 КБ всієї бібліотеки) + `optimization.splitChunks: { chunks: 'all' }` для незалежного кешування вендорного коду |

Додатково: дві точки входу (`main` — застосунок, `stat` — самодостатній модуль статистики кліків),
`output.clean` для автоматичного очищення `dist/`, production-збірка з мінімізацією.

## Частина 2. Розширена конфігурація

| Вимога | Як реалізовано |
|---|---|
| DevServer | `webpack-dev-server` (`npm start`, порт 4200, `open`, `hot`). Правки в `src/` перезавантажують сторінку автоматично, `dist/` на диску не чіпається |
| Зовнішні CSS-файли | Уже покрито в частині 1: `MiniCssExtractPlugin` виносить CSS в окремий хешований файл |
| Препроцесори LESS та Sass/SCSS | `less`/`less-loader` + `sass`/`sass-loader`, правила для `.less` і `.scss`. Демо: `src/styles/theme.scss` (змінні, міксин, вкладеність), `src/styles/badges.less` (змінні, міксин, `fade()`, `:hover`) |
| Компіляція TypeScript | `typescript` + `ts-loader`, `tsconfig.json` (`strict: true`), правило для `.tsx?` + `resolve.extensions`. Модуль `src/post.ts` з типами, поруч мирно живе звичайний JS |
| Транспіляція Babel | `@babel/core` + `@babel/preset-env` + `babel-loader` (`babel.config.json`, таргети `> 0.5%, last 2 versions, IE 11`), правило для `.js` крім `node_modules`. `const`/стрілки перетворюються на `var`/`function` — видно в `dist/` |
| ESLint | `eslint` + `@eslint/js` + `typescript-eslint` (`eslint.config.js`, flat-конфіг), скрипт `npm run lint` — проходить чисто |
| Bundle Analyzer | `webpack-bundle-analyzer` за прапорцем `--env analyzer` (`npm run analyze` → `dist/report.html` зі статикою: main gzip 820 Б, lodash-join gzip 99 Б, stat gzip 185 Б) |

## Структура проєкту

```
├── src/
│   ├── index.js        # точка входу main: пост, логотип, підзаголовок (lodash), стилі
│   ├── statistics.js   # точка входу stat: лічильник кліків (window.statistics)
│   ├── post.ts         # клас Post з типами (компілюється ts-loader)
│   ├── styles.css      # базові стилі + @font-face (Roboto)
│   ├── styles/         # theme.scss (SCSS) + badges.less (LESS)
│   ├── index.html      # шаблон сторінки
│   ├── assets/         # зображення (logo.svg)
│   └── fonts/          # локальні шрифти (*.woff2)
├── dist/               # результат production-збірки + report.html (закомічені для демонстрації)
├── webpack.config.js   # індивідуальна конфігурація Webpack 5 (функція від env)
├── tsconfig.json       # конфігурація TypeScript (strict)
├── babel.config.json   # preset-env з таргетами браузерів
├── eslint.config.js    # flat-конфіг ESLint (JS + TS)
└── package.json        # залежності та скрипти
```

## Запуск

```bash
npm install    # встановлення залежностей
npm start      # dev-сервер з автоперезавантаженням (http://localhost:4200/)
npm run dev    # збірка в development-режимі
npm run build  # production-збірка з мінімізацією (результат — у dist/)
npm run lint   # перевірка коду ESLint
npm run analyze # production-збірка + звіт dist/report.html
```

У консолі браузера доступний об'єкт `statistics`: поклікайте по сторінці та викличте
`statistics.getClicks()`, щоб побачити лічильник.

## Примітки

- TypeScript зафіксовано на 5-й мажорній версії: свіжий TS 7 несумісний із `ts-loader@9`
  (`Cannot read properties of undefined (reading 'fileExists')`).
- Через `"type": "module"` імпорт lodash пишеться з розширенням: `lodash/join.js`.
- Конфіг — функція `(env) => ({...})`, щоб Analyzer вмикався тільки за `--env analyzer`.

## Стек

Webpack 5 · webpack-dev-server · html-webpack-plugin · css-loader · mini-css-extract-plugin ·
sass · less · typescript + ts-loader · babel · eslint · webpack-bundle-analyzer ·
lodash · Roboto (локально, woff2)
