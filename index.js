// тут нахожу все нужные элементы на странице
const signalEl = document.querySelector('.js-signal');
const labelEl = document.querySelector('.js-label');
const timerEl = document.querySelector('.js-timer');
const btnEl = document.querySelector('.js-btn');

// тут вешаю обработчик на кнопку
btnEl.addEventListener('click', function () {
    requestCrossing(signalEl, labelEl, timerEl, btnEl);
});

// тут запускаю светофор при загрузке страницы
startTimer(signalEl, labelEl, timerEl, btnEl);
