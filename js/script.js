function updateTimeElapsed() {
    const startDate = new Date(2024, 6, 25, 19, 30); // 设定为2024年7月25日19:30
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('timeElapsed').innerHTML = `
    <div style="width: 400px;">
        <div>我们从2024年7月25日开始</div>
        <div>&nbsp;</div> 
        <div>在一起已经：${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒</div>
    </div>
    `;
}

setInterval(updateTimeElapsed, 1000);
updateTimeElapsed();

document.body.addEventListener('click', function(event) {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.innerHTML = '❤';
    heart.style.left = event.clientX + 'px';
    heart.style.top = event.clientY + 'px';
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1000);
});

document.getElementById('girlAvatar').addEventListener('click', function() {
    const now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let found = false;

    while (!found) {
        const solarDate = Solar.fromYmd(year, month, day);
        const lunarDate = solarDate.getLunar();
        if (lunarDate.getMonth() === 6 && lunarDate.getDay() === 13) {
            found = true;
            const bubble = document.getElementById('bubble');
            bubble.innerHTML = `我宝的下一个生日在：${year}年${month}月${day}日`;
            bubble.style.display = 'block';
            setTimeout(() => {
                bubble.style.display = 'none';
            }, 3000);
        } else {
            const nextDate = new Date(year, month - 1, day + 1);
            year = nextDate.getFullYear();
            month = nextDate.getMonth() + 1;
            day = nextDate.getDate();
        }
    }
});

document.getElementById('boyAvatar').addEventListener('click', function() {
    const bubble = document.getElementById('bubble');
    bubble.innerHTML = '我永远爱你！';
    bubble.style.display = 'block';
    setTimeout(() => {
        bubble.style.display = 'none';
    }, 3000);
});

document.addEventListener('DOMContentLoaded', (event) => {
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        bgMusic.play();
    }
});