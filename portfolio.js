
// ─── CONSTELLATION CANVAS ───
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let w, h, pts = [];

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function randColor() {
    const colors = ['rgba(0,200,255,', 'rgba(168,85,247,', 'rgba(34,211,160,'];
    return colors[Math.floor(Math.random() * colors.length)];
}

for (let i = 0; i < 80; i++) {
    pts.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2.5 + 1,
        c: randColor()
    });
}

function draw() {
    ctx.clearRect(0, 0, w, h);
    pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c + '0.8)';
        ctx.fill();
    });
    for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
            const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 130) {
                ctx.beginPath();
                ctx.moveTo(pts[i].x, pts[i].y);
                ctx.lineTo(pts[j].x, pts[j].y);
                ctx.strokeStyle = `rgba(0,200,255,${0.12 * (1 - d / 130)})`;
                ctx.lineWidth = 0.6;
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(draw);
}
draw();

// ─── SCROLL ANIMATIONS ───
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ─── ACTIVE NAV ───
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let curr = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) curr = s.id; });
    navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + curr);
    });
});

// ─── THEME TOGGLE ───
let dark = true;
function toggleTheme() {
    dark = !dark;
    document.documentElement.style.setProperty('--bg', dark ? '#050a12' : '#f0f4f8');
    document.documentElement.style.setProperty('--bg2', dark ? '#080e1a' : '#e2e8f0');
    document.documentElement.style.setProperty('--card', dark ? '#0d1524' : '#fff');
    document.documentElement.style.setProperty('--text', dark ? '#e2e8f0' : '#1a202c');
    document.documentElement.style.setProperty('--muted', dark ? '#8ba0b8' : '#64748b');
    document.querySelector('.theme-btn').textContent = dark ? '☀️' : '🌙';
}

// ─── CONTACT ───
function sendMessage() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ─── COUNTER ANIMATION ───
const statNums = document.querySelectorAll('.stat-num[data-target]');
const countObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting && !e.target.dataset.done) {
            e.target.dataset.done = true;
            const target = +e.target.dataset.target;
            let cur = 0;
            const inc = target / 40;
            const interval = setInterval(() => {
                cur += inc;
                if (cur >= target) { cur = target; clearInterval(interval); }
                e.target.textContent = Math.floor(cur) + '+';
            }, 35);
        }
    });
}, { threshold: 0.5 });
statNums.forEach(n => countObserver.observe(n));
