// тут описываю состояния пешеходного светофора
const STATES = {
    red: 'red',
    green: 'green'
};

const DURATION = {
    red: 30,
    green: 20
};

const LABELS = {
    red: 'Стоп',
    green: 'Идите'
};

let currentState = STATES.red;
let timeLeft = DURATION.red;
let interval = null;
let requested = false;

// тут играю звук при зелёном сигнале
function playBeep() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 880;
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
        // браузер мог заблокировать AudioContext
    }
}

// тут переключаю состояние между красным и зелёным
function switchState(signalEl, labelEl, timerEl, btnEl) {
    if (currentState === STATES.red) {
        currentState = STATES.green;
        timeLeft = DURATION.green;
        playBeep();
        btnEl.disabled = true;
        requested = false;
    } else {
        currentState = STATES.red;
        timeLeft = DURATION.red;
        btnEl.disabled = false;
    }

    signalEl.className = 'signal ' + currentState;
    labelEl.className = 'signal-label ' + currentState;
    labelEl.textContent = LABELS[currentState];
}

// тут запускаю таймер обратного отсчёта
function startTimer(signalEl, labelEl, timerEl, btnEl) {
    if (interval) clearInterval(interval);

    signalEl.className = 'signal ' + currentState;
    labelEl.className = 'signal-label ' + currentState;
    labelEl.textContent = LABELS[currentState];
    timerEl.textContent = timeLeft;

    interval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(interval);
            if (currentState === STATES.green || requested) {
                switchState(signalEl, labelEl, timerEl, btnEl);
            } else {
                timeLeft = DURATION.red;
            }
            startTimer(signalEl, labelEl, timerEl, btnEl);
        }
    }, 1000);
}

// тут обрабатываю нажатие кнопки вызова перехода
function requestCrossing(signalEl, labelEl, timerEl, btnEl) {
    if (currentState === STATES.green) return;
    requested = true;
    btnEl.disabled = true;
}
