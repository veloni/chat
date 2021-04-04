# О проекте

1) Приложение создано при помощи `React Hook`, хуки передаются через компоненту `Body` из одной компоненты в другую.

2) При старте приложения создаётся форма ввода, при вводе `login:"admin"` `password:"admin"` происходит переход в сам чат, при дальнейшем заходе в приложение форма не появляется. Так как вход уже был совершен.

3) В приложении реализованы два чата, оба чата записываются в свой state и в свой ключ `local storage`. 

4) Добавлена возможности редактирования и удаления сообщений, при нажатии левой клавишы мыши создаётся `PopUp` с выбором действия.

5) При удалении данного сообщения удаляется из `state` и `localStorage`, при редактировании, в форме ввода сообщений появляется контент выбраного сообщения для редактирования, после нажатия Enter сообщение меняется. Справа от формы появляется знак редактирования, и отмены редактирования.

6) Добавлены смайлики и один стикер. 

7) Добавлены возможность выбора `background image`, формата `png`, для фона, находится слева от формы ввода сообщения.

8) При переключении чата, меняется `state` и происходит рендер другого чата.

9) Поиск находится в `Aside` , при вводе сообщения происходит поиск в `localstorage`, и рендер найденных сообщений в `Aside`, при нажатии на нужное сообщение происходит скролл к данному сообщению и подсветка.

10) В мобильной версии `Aside` не присутсвует.

11) Создавал с помощью `create-react-app`, запуск  `npm start`

12) [Ссылка на проект](https://veloni.github.io/)
