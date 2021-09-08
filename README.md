# News (in progress)

Интерфейс для сайта новостей  Hacker News https://news.ycombinator.com/news

###Технологии:
* TypeScript
* JavaScript
* React
* React Router v5
* Redux
* HTML 
* Material Ui
* API (https://github.com/HackerNews/API)

###Запуск
Приложение запускается командой `npm start` по адресу `localhost:3000`

###Описание приложения и логика работы
Приложение для отображения списка новостей с сайта Hacker News, состоящее из двух страниц.


Главная страница показывает последние 100 новостей в виде списка, отсортированного по дате, самые свежие сверху.
При нажатии на новость происходит переход на страницу новости. 

**На главной странице находятся:**
* карточки новостей с наванием новости, рейтингом, датой публикации, автором новости
* кнопка для для перехода на конкретную новость
* кнопка обновления новостей 
  
Новости автоматически обновляются один раз в минуту без участия пользователя

**На странице новости находятся:**
* новость (название, автор, ссылка на новость, дата новости)
* список комментариев в виде дерева
* счетчик комментариев
* кнопка обновления комментариев
* кнопка для возврата к списку новостей

Комментарии автоматически обновляются один раз в минуту без участия пользователя




