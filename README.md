# UI к Miranda на React и Vite

## Установка

Получение:

    git clone https://github.com/chaos-soft/miranda-next.git && cd miranda-next

Установка компонентов:

    npm install

Запуск:

    npm run dev

[Открываем в браузере](http://localhost:5173).

## Production

Создаём файл .env.production со ссылкой на сервер, где уже работает
[Miranda](https://github.com/chaos-soft/miranda):

    VITE_WEBSOCKET_URL=wss://xxx

Если, конечно, удаленный сервер вообще нужен.
Далее необходимо собрать статичную версию программы командой:

    npm run build

По окончанию будет создана папка dist, файлы из которой можно использовать на любом сервере.

## Оформление и темы

В наличии четыре темы оформления:

- pages/2b.jsx
- pages/jill.jsx
- pages/main.jsx
- pages/stream.jsx

Ссылки на них всегда есть на главной странице.

Main — главная тема со всеми сообщениями, включая системные.
Она показывает все сообщения, которые есть в базе данных на текущий момент.

Остальные — это темы для OBS с разными стилями скрытия сообщений.

## Релизы

Все master-коммиты являются стабильными версиями.

## Руководство по стилю

В проекте используется [JavaScript Standard Style](https://standardjs.com).

v1
