# purejs-project-template
Стартовый шаблон frontend-проекта с использованием gulp, webpack, babel, json server, stylelint, eslint, bootstrap 4.

## Навигация
* [Навигация](#навигация)
* [Сокращения](#сокращения)
* [CLI-команды](#cli)
* [Gulp](#gulp)
    * [HTML](#html)
    * [CSS](#css)
    * [JS](#js)
    * [IMG](#img)
    * [SVG](#svg)
    * [Server](#server)
* [Webpack](#webpack)
* [JSON Server](#json-server)
* [ESLint](#eslint)
* [Stylelint](#stylelint)
* [Bootstrap](#bootstrap)
    * [Переменные](#переменные)
    * [Миксины](#миксины)
    * [Функции](#функции)
    * [Модули](#модули)

## Сокращения
* RMC - правый клик мышью

## CLI
Для удобства рекомендуется воспользоваться встроенной поддержкой команд npm/gulp в PhpStorm. Он позволяет вывести все 
скрипты в отдельные окна и запускать их простыми кликами, а также подробно настраивать среду выполнения скриптов. 

Например, чтобы переключить режим сборки проекта на production/development, необходитмо в настройках команды 
(*Команда в отедльном окне -> RMC -> Edit <command> settings*) в поле *Environment* добавить/удалить строку 
`NODE_ENV=production`.

### npm-cli
Окно команд в PhpStorm: *package.json -> RMC -> Show npm Scripts*

* `npm start` - dev-сборка проекта с поднятием сервера и отслеживанием изменений в файлах. Обёртка над `gulp start`
* `npm build` - production-сборка проекта
* `npm eslint` - аудит корректности js-кода
* `npm eslintfix` - аудит и автоматическое исправление js-кода
* `npm stylelint` - аудит корректности css-кода
* `npm stylelintfix` - аудит и автоматическое исправление css-кода

### gulp-cli
Окно команд в PhpStorm: *gulpfile.js -> RMC -> Show Gulp Tasks*.

* `gulp start` - dev-сборка проекта с поднятием сервера и отслеживанием изменений в файлах
* `gulp build` - production-сборка проекта.
* `gulp html` - сборка html
* `gulp scss` - сборка css
* `gulp scss-vendors` - сборка css вендорных библиотек
* `gulp js` - сборка js
* `gulp img` - сборка картинок
* `gulp svg` - сборка svg
* `gulp server` - поднятие сервера
* `gulp clean` - очистка собранных файлов (папка build)
* `gulp run` - поднятие сервера с отслеживанием изменений в файлах

## Gulp

### Технические плагины

#### [gulp-if](https://www.npmjs.com/package/gulp-if)
Позволяет строить условные конструкции

#### [gulp-rename](https://www.npmjs.com/package/gulp-rename)
Позволяет переименовать файл на выходе

#### [gulp-size](https://www.npmjs.com/package/gulp-size)
Позволяет вывести в консоль размер итогового файла

#### [gulp-changed](https://www.npmjs.com/package/gulp-changed)
Позволяет задаче затрагивать только измененные файлы

#### [gulp-clean](https://www.npmjs.com/package/gulp-clean)
Позволяет удалять файлы

### HTML

#### [gulp-file-include](https://www.npmjs.com/package/gulp-file-include)
Позволяет разбить html на отдельные файлы. 

В качестве корня установлен путь `/src/html`, поэтому нет необходимости писать страшные относительные пути 
`../../../../file.html`. 

Плагин довольно мощный, поэтому обязательно нужно почитать документацию. Например, даёт возможность объявлять переменные, 
использовать циклы и условные конструкции.

#### [gulp-html-prefix](https://www.npmjs.com/package/gulp-html-prefix)
Добавляет префикс всем классам элементов в html: 
```html
/* Было */
<div class="title">Заголовок</div>

/* Стало */
<div class="my-prefix-title">Заголовок</div>
```
Это позволяет изолировать весь наш код от существующего, в проектах, которые мы взялись дорабатывать.

### CSS

#### [gulp-sass](https://www.npmjs.com/package/gulp-sass)
Обёртка над css-препроцессором [node-sass](https://www.npmjs.com/package/node-sass). Настройки аналогичны. 

Позволяет разбить CSS на отдельные файлы, применяя в них более продвинутые возможности [sass](https://sass-scss.ru/).

Настроен алиас пути `~` для импорта из node_modules: `@import('~bootstrap/scss/variables.scss')`.

#### [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
Обёртка над [autoprefixer](https://www.npmjs.com/package/autoprefixer). Настройки аналогичны. 

Добавляет браузерные префиксы для css-свойств.

#### [gulp-class-prefix](https://www.npmjs.com/package/gulp-class-prefix)
Добавляет префикс всем классам в css-файлах проекта. Это позволяет изолировать весь наш код от существующего в проектах, 
которые мы взялись дорабатывать.

#### [gulp-stylelint](https://www.npmjs.com/package/gulp-stylelint)
Обёртка над css-линтером [stylelint](#stylelint).

Выводит в консоль ошибки форматирования/корректности кода и, по возможности, автоматически исправляет их. 

Плагин не должен применяться в сборке стилей из вендорных библиотек, т.к. они могут использовать другие правила или
синтаксис.

#### [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css)
Обёртка для минификатора [clean-css](https://www.npmjs.com/package/clean-css). Настройки аналогичны.

### JS

#### [webpack-stream](https://www.npmjs.com/package/webpack-stream)
Обёртка над js-сборщиком [webpack](#webpack). Настройки аналогичны.

### IMG

#### [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)
Обёртка над минификатором изображений [imagemin](https://www.npmjs.com/package/imagemin). Настройки аналогичны.

### SVG

#### [gulp-svg-sprite](https://www.npmjs.com/package/gulp-svg-sprite)
Обёртка над [svg-sprite](https://www.npmjs.com/package/svg-sprite). Настройки аналогичны.

Позволяет собрать все svg-файлы в один спрайт.

### Server

#### [gulp-json-srv](https://www.npmjs.com/package/gulp-json-srv)
Обёртка над имитационным сервером [json-server](#json-server). Настройки аналогичны.

## Webpack
* **Документация:** https://webpack.js.org/concepts/
* **Настройки:** `webpack.config.js` в корне проекта

В целях оптимизации вендорные библиотеки выделяются в отдельный файл.

### [eslint-loader](https://www.npmjs.com/package/eslint-loader)
Подключает js-линтер [eslint](#eslint). Выводит в консоль ошибки форматирования/корректности кода.

### [babel-loader](https://www.npmjs.com/package/babel-loader)
Подключает продвинутый js-компилятор [babel](https://babeljs.io/docs/en/). 

Используется рекомендованный пресет [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) для поддержки 
современных стандартов языка.

Используется технология [tree shaking](https://babeljs.io/docs/en/babel-preset-env#usebuiltins-usage), позволяющая не 
включать неиспользуемые модули в итоговую сборку.

### [uglifyjs-webpack-plugin](https://www.npmjs.com/package/uglifyjs-webpack-plugin)
Подключает минификатор [uglifyjs](https://www.npmjs.com/package/uglify-js). Настройки аналогичны.

## JSON Server
* **Документация:** https://github.com/typicode/json-server
* **Настройки:** `server.config.js` в корне проекта

Позволяет поднять полноценный сервер для тестирования запросов. 

Обработка запросв настраивается в `customRoutes`, где указывается `url`, `method` и `handler`. 
Такая обработка работает только для запросов начинающихся с `/api`.

## Инструменты контроля качества кода

### ESLint
* **Документация:** https://eslint.org/docs/user-guide/getting-started
* **Правила:** https://eslint.org/docs/rules/
* **Настройки:** `.eslintrc.js` в корне проекта

В качестве стартовых правил используется набор правил [eslint-config-standard](https://www.npmjs.com/package/eslint-config-standard), 
основанный на последних стандартах языка. Правила можно кастомизировать в параметре `rules`.

В PhpStorm есть встроенная поддержка ESLint. Чтобы включить: 
*Settings -> Languages & Frameworks -> JavaScript -> Code Quality Tools -> ESLint -> Automatic ESLint configuration*.
После чего в редакторе появятся подсказки на основе правил, установленных в файле настроек.

### Stylelint
* **Документация:** https://stylelint.io/user-guide/configuration
* **Правила CSS:** https://stylelint.io/user-guide/rules  
* **Правила SCSS:** https://github.com/kristerkari/stylelint-scss
* **Настройки:** `.stylelintrc.js` в корне проекта

В качестве стартовых правил используется набор правил [stylelint-config-recommended-scss](https://www.npmjs.com/package/stylelint-config-recommended-scss), 
основанный на последних стандартах языка. Правила можно кастомизировать в параметре `rules`.

В PhpStorm есть встроенная поддержка Stylelint. Чтобы включить: 
*Settings -> Languages & Frameworks -> StyleSheets -> Stylelint -> Enable*. После чего в редакторе появятся подсказки 
на основе правил, установленных в файле настроек.

## Bootstrap
**Документация:** https://bootstrap-4.ru/docs/4.3.1/getting-started/introduction/

По умолчанию из *bootstrap* взяты переменные, миксины, функции и некоторые модули.

### Методология Mobile First
Суть данной методологии в том, что стилями по умолчанию считаются стили для мобильных устройств. В результате этого 
становится намного проще масштабировать поддержку других типов устройств. 

Технически это означает, что медиа-запросы пишутся с использованием `min-width`:
```css
/* Mobile/Default */
.h1 {
    font-size: 26px
}

/* Tablet */
@media (min-width: 768px) {
    .h1 {
        font-size: 30px;
    }
}

/* Desktop */
@media (min-width: 1440px) {
    .h1 {
        font-size: 40px;
    }
}
```

### Методология атомарных css-компонентов
Суть данной методологии в том, чтобы для некоторых часто используемых css-свойств создать отдельные микро-классы
и внедрять их через *html*, вместо того, чтобы ломать голову, придумывая класс, "второму блоку слева во второй строке 
третьего блока главной страницы", если всего-то и нужно, что сделать текст в нём белым.

Bootstrap реализует эту методологию. Например, модуль `spacing.scss` предоставляет целую россыпь классов для гибкой 
настройки широкого спектра значений внешних/внутренних отступов в любые стороны.

### Переменные
* В проекте: `src/scss/variables`
* В Bootstrap `~bootstrap/scss/_variables`

Переменные взяты из *bootstrap* частично, по мере необходимости, и для удобства разбиты на разные файлы.

### Миксины
* В проекте: `src/scss/mixins`
* В Bootstrap `~bootstrap/scss/mixins/index`

Включены в проект полностью.

### Функции
* В проекте: `src/scss/functions`
* В Bootstrap `~bootstrap/scss/_functions`

Включены в проект полностью.

### Модули
**Документация:** https://bootstrap-4.ru/docs/4.3.1/utilities/

* В проекте: `src/scss/vendors/bootstrap/modules`
* В Bootstrap `~bootstrap/scss`

По умолчанию в проект включены модули:
* Сетка
* Цвет
    * Цвет фона
    * Цвет текста
    * Цвет рамок
    * Дополнительная палитра оттенков
* Отступы
* Типография
* Рамки
* Отображение элементов
* Flex
* Позиционирование
* Размеры
* Текст
* Видимость

По умолчанию все модули отключены. Подключение любого из модулей зависит от нужд проекта и настраивается в файле 
`src/scss/vendors/bootstrap/options`. 

Подключение любого дополнительного модуля из *bootstrap* может потребовать 
включение дополнительных переменных из оригинальных файлов.

#### Сетка
**Документация:** https://bootstrap-4.ru/docs/4.3.1/layout/overview/

Сетка в Bootstrap 4 основана на Flex.

По умолчанию используется:
* Количество колонок - 12
* Вертикальные/горизонтальные отступы между колонками - 24px
* Вертикальные/горизонтальные внутренние отступы контейнера - 12px
* Поддержка 5 брейкпоинтов
