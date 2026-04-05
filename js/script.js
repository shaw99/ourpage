function updateTimeElapsed() {
    const startDate = new Date(2024, 6, 25, 19, 30);
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

// ===================== 以下是我新增的代码，完全不影响你原来的 =====================
let boyClickCount = 0;
const correctPassword = "123456";
const targetFileName = "私聊_雷雨田❤️.html";

function createPasswordModal() {
  if (document.getElementById("passwordModal")) return;
  const modal = document.createElement("div");
  modal.id = "passwordModal";
  modal.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:none;justify-content:center;align-items:center;z-index:9999;";
  const box = document.createElement("div");
  box.style.cssText = "background:#fff;padding:35px 30px;border-radius:20px;width:330px;text-align:center;box-shadow:0 8px 25px rgba(0,0,0,0.2);";
  box.innerHTML = `
    <div id="modalTitle" style="font-size:18px;font-weight:bold;color:#ff5e84;margin-bottom:20px;">💖 请输入密码 💖</div>
    <div id="pwdArea">
      <input type="password" id="passwordInput" placeholder="输入密码..." style="width:100%;padding:12px;border:1px solid #eee;border-radius:12px;font-size:16px;text-align:center;outline:none;box-sizing:border-box;margin-bottom:20px;">
    </div>
    <div id="dateArea" style="display:none;margin-bottom:20px;">
      <div style="display:flex;gap:10px;">
        <select id="yearSel" style="flex:1;padding:12px;border:1px solid #eee;border-radius:12px;"></select>
        <select id="monthSel" style="flex:1;padding:12px;border:1px solid #eee;border-radius:12px;"></select>
      </div>
    </div>
    <div style="display:flex;justify-content:center;gap:10px;">
      <button id="submitBtn" style="background:#ff5e84;color:#fff;border:none;padding:10px 25px;border-radius:12px;cursor:pointer;">确认</button>
      <button id="cancelBtn" style="background:#eee;border:none;padding:10px 25px;border-radius:12px;cursor:pointer;">取消</button>
    </div>
  `;
  modal.appendChild(box);
  document.body.appendChild(modal);
}

function showPwdModal() {
  createPasswordModal();
  document.getElementById("passwordModal").style.display = "flex";
  document.getElementById("pwdArea").style.display = "block";
  document.getElementById("dateArea").style.display = "none";
  document.getElementById("modalTitle").innerText = "💖 请输入密码 💖";
  document.getElementById("passwordInput").value = "";
}

function showDateSelect() {
  document.getElementById("pwdArea").style.display = "none";
  document.getElementById("dateArea").style.display = "block";
  document.getElementById("modalTitle").innerText = "💖 选择年月 💖";
  fillYearMonth();
}

function fillYearMonth() {
  const y = document.getElementById("yearSel");
  const m = document.getElementById("monthSel");
  y.innerHTML = "";
  m.innerHTML = "";

  // 年份列表
  [2024,2025,2026].forEach(yv => {
    const opt = document.createElement("option");
    opt.value = yv;
    opt.textContent = yv + "年";
    y.appendChild(opt);
  });

  // 监听年份变化，自动切换月份
  y.addEventListener("change", function() {
    updateMonths(this.value);
  });

  // 初始化月份
  updateMonths(y.value);
}

// 动态更新月份选项
function updateMonths(selectedYear) {
  const m = document.getElementById("monthSel");
  m.innerHTML = "";

  let startMonth = 1;
  if (selectedYear == 2024) {
    startMonth = 6; // 2024年从6月开始
  }

  for (let mv = startMonth; mv <= 12; mv++) {
    const opt = document.createElement("option");
    opt.value = mv;
    opt.textContent = mv + "月";
    m.appendChild(opt);
  }
}

function openTargetPage() {
  const y = document.getElementById("yearSel").value;
  const m = document.getElementById("monthSel").value;
  const folder = y + (m < 10 ? "0" + m : m);
  const url = `./wechat/${folder}/texts/${targetFileName}`;
  window.open(url, "_blank");
}

function bindModalActions() {
  const sub = document.getElementById("submitBtn");
  const can = document.getElementById("cancelBtn");
  sub.onclick = function() {
    const title = document.getElementById("modalTitle").innerText;
    if (title.includes("密码")) {
      const val = document.getElementById("passwordInput").value.trim();
      if (val === correctPassword) {
        showDateSelect();
      } else {
        alert("密码错误");
      }
    } else {
      openTargetPage();
      document.getElementById("passwordModal").style.display = "none";
      boyClickCount = 0;
    }
  };
  can.onclick = function() {
    document.getElementById("passwordModal").style.display = "none";
    boyClickCount = 0;
  };
}

// 你的原有头像点击逻辑，我只加了5次点击功能，完全保留原来效果
document.getElementById('boyAvatar').addEventListener('click', function() {
    boyClickCount++;
    const bubble = document.getElementById('bubble');

    if (boyClickCount < 5) {
        // 你原来的代码，完全不变
        bubble.innerHTML = '我永远爱你！';
        bubble.style.display = 'block';
        setTimeout(() => {
            bubble.style.display = 'none';
        }, 3000);
    } else {
        boyClickCount = 0;
        bubble.style.display = 'none';
        showPwdModal();
        bindModalActions();
    }
});
// ===================== 新增结束 =====================

document.addEventListener('DOMContentLoaded', (event) => {
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        bgMusic.play();
    }
});