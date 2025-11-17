// === 1. GMAIL CHECKER ===
const gmailInput = document.getElementById('gmail_input');
const gmailButton = document.getElementById('gmail_button');
const gmailResult = document.getElementById('gmail_result');

const gmailRegExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

gmailButton.onclick = () => {
    const value = gmailInput.value.trim();
    if (gmailRegExp.test(value)) {
        gmailResult.textContent = 'Valid Gmail';
        gmailResult.style.color = '#4ade80';
    } else {
        gmailResult.textContent = 'Invalid Gmail';
        gmailResult.style.color = '#f87171';
    }
};

// === 1.1 IIN CHECKER ===
const iinInput = document.getElementById('iin_input');
const iinButton = document.getElementById('iin_button');
const iinResult = document.getElementById('iin_result');

const iinRegExp = /^\d{12}$/; // 12 digits

iinButton.onclick = () => {
    const value = iinInput.value.trim();
    if (iinRegExp.test(value)) {
        iinResult.textContent = 'Valid IIN';
        iinResult.style.color = '#4ade80';
    } else {
        iinResult.textContent = 'Invalid IIN (12 digits)';
        iinResult.style.color = '#f87171';
    }
};

// === 2. MOVING SQUARE ===
const parentBlock = document.querySelector('.parent_block');
const childBlock = document.querySelector('.child_block');

let x = 0, y = 0;
let dirX = 1, dirY = 0;
const speed = 3;

function move() {
    const maxX = parentBlock.offsetWidth - childBlock.offsetWidth;
    const maxY = parentBlock.offsetHeight - childBlock.offsetHeight;

    x += dirX * speed;
    y += dirY * speed;

    childBlock.style.left = x + 'px';
    childBlock.style.top = y + 'px';

    if (x >= maxX && dirX === 1) { dirX = 0; dirY = 1; }
    else if (y >= maxY && dirY === 1) { dirX = -1; dirY = 0; }
    else if (x <= 0 && dirX === -1) { dirX = 0; dirY = -1; }
    else if (y <= 0 && dirY === -1) { dirX = 1; dirY = 0; }

    requestAnimationFrame(move);
}
move();

// === 3. STOPWATCH ===
let ms = 0, interval, running = false;

const minutesEl = document.getElementById('minutesS');
const secondsEl = document.getElementById('secondsS');
const msEl = document.getElementById('ml-secondsS');

function update() {
    ms++;
    const minutes = Math.floor(ms / 6000).toString().padStart(2, '0');
    const seconds = Math.floor((ms % 6000) / 100).toString().padStart(2, '0');
    const tenths = (ms % 100).toString().padStart(2, '0');

    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
    msEl.textContent = tenths;
}

document.getElementById('start').onclick = () => {
    if (!running) {
        interval = setInterval(update, 10);
        running = true;
    }
};

document.getElementById('stop').onclick = () => {
    if (running) {
        clearInterval(interval);
        running = false;
    }
};

document.getElementById('reset').onclick = () => {
    ms = 0;
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    msEl.textContent = '00';
    if (running) {
        clearInterval(interval);
        running = false;
    }
};