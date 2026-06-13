const startDate = new Date(2024, 6, 25, 19, 30);
let timerRafId = null;

function updateTimeElapsed() {
    const diff = Date.now() - startDate;

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('timeElapsed').innerHTML = `
    <div style="max-width:400px;">
        <div>我们从2024年7月25日开始</div>
        <div>&nbsp;</div>
        <div>在一起已经：${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒</div>
    </div>
    `;
}

function startTimer() {
    updateTimeElapsed();
    let lastSecond = Math.floor((Date.now() - startDate) / 1000);
    function loop() {
        const currentSecond = Math.floor((Date.now() - startDate) / 1000);
        if (currentSecond !== lastSecond) {
            updateTimeElapsed();
            lastSecond = currentSecond;
        }
        timerRafId = requestAnimationFrame(loop);
    }
    timerRafId = requestAnimationFrame(loop);
}

function stopTimer() {
    if (timerRafId) {
        cancelAnimationFrame(timerRafId);
        timerRafId = null;
    }
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopTimer();
    } else {
        updateTimeElapsed(); 
        startTimer();
    }
});

startTimer();

document.body.addEventListener('click', function(event) {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.textContent = '❤';
    heart.style.left = event.clientX + 'px';
    heart.style.top  = event.clientY + 'px';
    document.body.appendChild(heart);

    heart.addEventListener('animationend', () => heart.remove());
});

let lunarLibLoaded = false;
const LUNAR_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/lunar-javascript/1.6.12/lunar.min.js';

function loadLunarLib() {
    return new Promise((resolve, reject) => {
        if (lunarLibLoaded && typeof Solar !== 'undefined') return resolve();
        if (typeof Solar !== 'undefined') {
            lunarLibLoaded = true;
            return resolve();
        }
        const script = document.createElement('script');
        script.src = LUNAR_CDN;
        script.onload = () => { lunarLibLoaded = true; resolve(); };
        script.onerror = () => reject(new Error('农历库加载失败'));
        document.head.appendChild(script);
    });
}

function findNextLunarBirthday() {
    const now = new Date();
    const todayYear = now.getFullYear();
    const todayMonth = now.getMonth() + 1;
    const todayDay = now.getDate();

    const candidates = [todayYear, todayYear + 1];

    for (const year of candidates) {
        try {
            const lunar = Lunar.fromYmd(year, 6, 13);
            const solarDate = lunar.getSolar();
            const sy = solarDate.getYear();
            const sm = solarDate.getMonth();
            const sd = solarDate.getDay();

            if (sy > todayYear ||
                (sy === todayYear && sm > todayMonth) ||
                (sy === todayYear && sm === todayMonth && sd >= todayDay)) {
                return { year: sy, month: sm, day: sd };
            }
        } catch (e) {
            continue;
        }
    }

    try {
        const lunar = Lunar.fromYmd(todayYear + 2, 6, 13);
        const solarDate = lunar.getSolar();
        return { year: solarDate.getYear(), month: solarDate.getMonth(), day: solarDate.getDay() };
    } catch (e) {
        const future = new Date(todayYear + 1, 5, 30);
        return { year: future.getFullYear(), month: future.getMonth() + 1, day: future.getDate() };
    }
}

document.getElementById('girlAvatar').addEventListener('click', async function() {
    const bubble = document.getElementById('bubble');

    try {
        await loadLunarLib();
        const next = findNextLunarBirthday();
        bubble.innerHTML = '我宝的下一个生日在：' + next.year + '年' + next.month + '月' + next.day + '日';
    } catch (e) {
        bubble.innerHTML = '加载失败，请检查网络后重试';
    }

    bubble.style.display = 'block';
    setTimeout(() => {
        bubble.style.display = 'none';
    }, 3000);
});

// ---------- 男孩头像：点击显示气泡 ----------
document.getElementById('boyAvatar').addEventListener('click', function() {
    const bubble = document.getElementById('bubble');
    bubble.innerHTML = '我永远爱你！';
    bubble.style.display = 'block';
    setTimeout(() => {
        bubble.style.display = 'none';
    }, 3000);
});
