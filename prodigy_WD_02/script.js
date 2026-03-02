let startTime;
let elapsed = 0;
let timerInterval;
let laps = [];

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('lapsList');

function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor(ms % 1000);

    return (
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0') + ':' +
        String(milliseconds).padStart(3, '0')
    );
}

function updateDisplay() {
    const now = Date.now();
    const currentElapsed = elapsed + (now - startTime);
    display.textContent = formatTime(currentElapsed);
    timerInterval = requestAnimationFrame(updateDisplay);
}

function start() {
    startTime = Date.now();
    updateDisplay();

    document.body.classList.add('running');
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
    // Smooth transition for glow managed by CSS class on body
}

function pause() {
    cancelAnimationFrame(timerInterval);
    elapsed += Date.now() - startTime;

    document.body.classList.remove('running');
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

function reset() {
    cancelAnimationFrame(timerInterval);
    elapsed = 0;
    laps = [];
    display.textContent = '00:00:00:000';
    lapsList.innerHTML = '';

    document.body.classList.remove('running');
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

function lap() {
    const now = Date.now();
    const currentElapsed = elapsed + (now - startTime);
    laps.unshift(currentElapsed); // Add new lap to top

    const lapItem = document.createElement('li');
    lapItem.className = 'lap-item';
    lapItem.innerHTML = `
        <span class="lap-num">Lap ${laps.length}</span>
        <span class="lap-time">${formatTime(currentElapsed)}</span>
    `;
    lapsList.prepend(lapItem);
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
