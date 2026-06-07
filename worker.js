export default {
  async fetch(request) {
    return new Response(`<!DOCTYPE html>
<html lang="fa">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Cat OS Pro</title>

<style>
:root {
    --bg1: #ffdde1;
    --bg2: #ff6f91;
    --card: rgba(255,255,255,0.85);
}

body {
    margin: 0;
    height: 100vh;
    overflow: hidden;
    font-family: system-ui, Arial;
    background: radial-gradient(circle at top, var(--bg1), var(--bg2));
}

.glow {
    position: fixed;
    inset: -50%;
    background: radial-gradient(circle, rgba(255,255,255,0.2), transparent 60%);
    animation: drift 10s linear infinite;
    pointer-events: none;
}

@keyframes drift {
    0% { transform: translate(-10%, -10%); }
    50% { transform: translate(10%, 15%); }
    100% { transform: translate(-10%, -10%); }
}

.card {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: min(360px, 85%);
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(14px);
    border-radius: 18px;
    padding: 18px;
    text-align: center;
    box-shadow: 0 20px 50px rgba(0,0,0,0.25);
    z-index: 10;
}

h1 { font-size: 16px; margin-bottom: 12px; }

button {
    width: 100%;
    padding: 12px;
    margin-top: 10px;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-size: 14px;
    transition: 0.15s;
}

button:active { transform: scale(0.97); }

.yes { background: #ff4d8d; color: white; }
.no { background: #222; color: white; }

#result {
    margin-top: 10px;
    min-height: 28px;
    font-size: 13px;
}

.cat {
    position: absolute;
    font-size: 30px;
    pointer-events: none;
    will-change: transform;
}

.flying {
    position: fixed;
    font-size: 28px;
    pointer-events: none;
    animation: fly 1.6s ease-out forwards;
}

@keyframes fly {
    0% { transform: translateY(0) scale(1); opacity: 1; }
    100% { transform: translateY(-240px) translateX(120px) rotate(360deg); opacity: 0; }
}
</style>
</head>

<body>

<div class="glow"></div>

<div class="card">
    <div>🐱</div>
    <h1>آیا تو نیکی هستی؟</h1>

    <button class="yes" id="yesBtn">بله، من پیشی لئو هستم</button>
    <button class="no" id="noBtn">نه نیستم</button>

    <div id="result"></div>
</div>

<script>
const state = { cats: [], targetX: innerWidth / 2, targetY: innerHeight / 2 };
const CAT_COUNT = 10;

function meow() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    const f = ctx.createBiquadFilter();

    o.type = "triangle";
    const t = ctx.currentTime;

    o.frequency.setValueAtTime(900, t);
    o.frequency.exponentialRampToValueAtTime(420, t + 0.12);
    o.frequency.exponentialRampToValueAtTime(650, t + 0.25);

    f.type = "lowpass";
    f.frequency.value = 1400;

    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.12, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);

    o.connect(f);
    f.connect(g);
    g.connect(ctx.destination);

    o.start(t);
    o.stop(t + 0.35);
    o.onended = () => ctx.close();
}

function setResult(text) {
    document.getElementById("result").textContent = text;
}

function spawnFlying(x, y) {
    const el = document.createElement("div");
    el.className = "flying";
    el.textContent = "🐱";
    el.style.left = x + "px";
    el.style.top = y + "px";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1600);
}

function burstCats() {
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            spawnFlying(Math.random() * innerWidth, innerHeight - 40);
        }, i * 60);
    }
}

function yes() {
    setResult("لئو خیلی دوستت داره پیشی خوشگله♥️");
    meow();
    burstCats();
}

function no() {
    setResult("برو بگو شوهرت واست سایت بسازه");
    meow();
    burstCats();
}

function createCats() {
    for (let i = 0; i < CAT_COUNT; i++) {
        const c = document.createElement("div");
        c.className = "cat";
        c.textContent = "🐱";
        c.x = Math.random() * innerWidth;
        c.y = Math.random() * innerHeight;
        document.body.appendChild(c);
        state.cats.push(c);
    }
}

function updateCats() {
    state.cats.forEach((c, i) => {
        const dx = state.targetX - c.x;
        const dy = state.targetY - c.y;

        c.x += dx * 0.04;
        c.y += dy * 0.04;

        c.x += Math.sin(performance.now() / 400 + i) * 1.2;
        c.y += Math.cos(performance.now() / 400 + i) * 1.2;

        c.style.transform = `translate(${c.x}px, ${c.y}px)`;
    });

    requestAnimationFrame(updateCats);
}

addEventListener("mousemove", e => {
    state.targetX = e.clientX;
    state.targetY = e.clientY;
});

addEventListener("touchmove", e => {
    const t = e.touches[0];
    state.targetX = t.clientX;
    state.targetY = t.clientY;
});

addEventListener("click", e => {
    meow();
    spawnFlying(e.clientX, e.clientY);
});

document.getElementById("yesBtn").onclick = yes;
document.getElementById("noBtn").onclick = no;

createCats();
updateCats();
</script>

</body>
</html>`, {
      headers: {
        "content-type": "text/html; charset=UTF-8",
      },
    });
  }
};
