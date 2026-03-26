# Domrena Front Gallery: WordPress Copy‑Paste Guide

Use this file to copy the exact CSS and JS and paste them into WordPress (Divi). No theme edits needed.

## What You Get
- Modern category gallery (Darbo rūbai, Pirštinės, Darbo batai, Pakavimo medžiagos, Kita)
- Blurred cover background + centered image (no weird cropping)
- Mobile: finger swipe, no arrows, edge‑to‑edge
- Desktop: elegant arrows
- Faint watermark on image sides (uses `logowoter.png`)

## Before You Paste
- In Divi Visual Builder:
  - Duplicate your current category row
  - On the duplicated row, set CSS Class to: `dr-target`
  - Hide the old collage modules (Advanced → Visibility → disable on Phone/Tablet/Desktop)
  - Leave the duplicated row empty; the gallery will render inside it

## Paste JS (Divi → Theme Options → Integration → “Add code to the <body>”)
Copy this exactly, then replace the five image URLs with your Media Library links.

```html
<script>
document.addEventListener('DOMContentLoaded', function () {
  var row = document.querySelector('.dr-target');
  if (!row) return;

  var wrap = document.createElement('div');
  wrap.className = 'dr-carousel';
  var track = document.createElement('div');
  track.className = 'dr-track';
  wrap.appendChild(track);
  row.appendChild(wrap);

  var data = [
    { title: 'Darbo rūbai', href: 'https://domrena.lt/product-category/darbo-rubai/', img: 'PASTE_URL_FOR_CLOTHES' },
    { title: 'Pirštinės', href: 'https://domrena.lt/product-category/pirstines/', img: 'PASTE_URL_FOR_GLOVES' },
    { title: 'Darbo batai', href: 'https://domrena.lt/product-category/batai/', img: 'PASTE_URL_FOR_SHOES' },
    { title: 'Pakavimo medžiagos', href: 'https://domrena.lt/product-category/pakavimo-medziagos/', img: 'PASTE_URL_FOR_PACKING' },
    { title: 'Kita', href: 'https://domrena.lt/product-category/kita/', img: 'PASTE_URL_FOR_OTHER' }
  ];

  var slides = [];
  data.forEach(function (d, i) {
    var a = document.createElement('a');
    a.href = d.href;
    a.className = 'dr-slide' + (i === 0 ? ' active' : '');
    a.style.setProperty('--img', 'url(' + d.img + ')');
    a.setAttribute('aria-label', d.title);

    var photo = document.createElement('div');
    photo.className = 'dr-photo';

    var t = document.createElement('span');
    t.className = 'dr-title';
    t.textContent = d.title;

    a.appendChild(photo);
    a.appendChild(t);
    track.appendChild(a);
    slides.push(a);
  });

  var left = document.createElement('button');
  var right = document.createElement('button');
  left.className = 'dr-arrow left';
  right.className = 'dr-arrow right';
  left.setAttribute('aria-label', 'Previous');
  right.setAttribute('aria-label', 'Next');
  left.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>';
  right.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
  wrap.appendChild(left);
  wrap.appendChild(right);

  var idx = 0;
  function setActive(i, dir){
    slides.forEach(function(s, k){
      s.classList.toggle('active', k === i);
      if (k === i) {
        s.style.transform = 'translateX(' + (dir === 'prev' ? '-6%' : '6%') + ')';
        requestAnimationFrame(function(){ s.style.transform = 'translateX(0)'; });
      }
    });
  }
  function advance(dir){
    idx = (idx + dir + slides.length) % slides.length;
    setActive(idx, dir < 0 ? 'prev' : 'next');
  }

  var isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (!isMobile) {
    left.addEventListener('click', function(){ advance(-1); pauseThenResume(); });
    right.addEventListener('click', function(){ advance(1); pauseThenResume(); });
  } else {
    left.style.display = 'none';
    right.style.display = 'none';
  }

  var startX = 0, startY = 0, swiping = false;
  wrap.addEventListener('touchstart', function(e){
    var t = e.touches[0];
    startX = t.clientX; startY = t.clientY; swiping = true; pause();
  }, { passive: true });
  wrap.addEventListener('touchmove', function(e){
    if (!swiping) return;
    var t = e.touches[0];
    var dx = t.clientX - startX;
    var dy = t.clientY - startY;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      swiping = false;
      if (dx < 0) { advance(1); } else { advance(-1); }
    }
  }, { passive: true });
  wrap.addEventListener('touchend', function(){ swiping = false; resume(); }, { passive: true });
  wrap.addEventListener('mouseenter', pause);
  wrap.addEventListener('mouseleave', resume);

  var timer = null;
  function randomDelay(){ return 4000 + Math.round(Math.random() * 3000); }
  function next(){ advance(1); }
  function schedule(){ timer = setTimeout(next, randomDelay()); }
  function pause(){ if (timer) { clearTimeout(timer); timer = null; } }
  function resume(){ if (!timer) schedule(); }
  function pauseThenResume(){ pause(); setTimeout(resume, 6000); }
  resume();
});
</script>
```

## Paste CSS (Page Settings → Advanced → Custom CSS, or Appearance → Customize → Additional CSS)
Copy this exactly. It uses `logowoter.png` for the watermark (already in this repo).

```css
.dr-carousel{position:relative;padding:8px 48px 24px;overflow:hidden}
.dr-track{position:relative;height:360px}
.dr-slide{position:absolute;left:0;top:0;width:100%;height:360px;border-radius:24px;background:none;background-color:#0f1115;box-shadow:0 16px 28px rgba(0,0,0,.28);overflow:hidden;opacity:0;pointer-events:none;transform:translateX(12%);transition:transform .35s ease,opacity .35s ease}
.dr-slide.active{opacity:1;pointer-events:auto;transform:translateX(0)}
.dr-slide::before{content:"";position:absolute;inset:0;background-image:var(--img);background-size:cover;background-position:center;filter:blur(16px) brightness(.85) saturate(1.05);transform:scale(1.08)}
.dr-slide::after{content:"";position:absolute;inset:0;background-image:url('logowoter.png'),url('logowoter.png');background-repeat:no-repeat,no-repeat;background-position:left 4% center,right 4% center;background-size:110px auto,110px auto;opacity:.14;pointer-events:none;z-index:0}
.dr-photo{position:absolute;inset:0;background-image:var(--img);background-size:contain;background-position:center;background-repeat:no-repeat;z-index:1}
.dr-title{position:absolute;left:16px;bottom:16px;z-index:2;background:rgba(0,0,0,.6);padding:8px 12px;border-radius:10px;font-weight:700;letter-spacing:.02em;color:#fff}
.dr-arrow{position:absolute;top:50%;transform:translateY(-50%);width:44px;height:44px;border-radius:9999px;border:1px solid rgba(255,255,255,.18);background:rgba(20,22,28,.6);display:grid;place-items:center;cursor:pointer;backdrop-filter:blur(8px);box-shadow:0 8px 20px rgba(0,0,0,.28);z-index:5;transition:transform .18s ease,background .18s ease,border-color .18s ease}
.dr-arrow.left{left:8px}
.dr-arrow.right{right:8px}
.dr-arrow:hover{transform:translateY(-50%) scale(1.04);background:rgba(28,30,36,.7);border-color:rgba(255,255,255,.28)}
.dr-arrow:active{transform:translateY(-50%) scale(0.98)}
.dr-arrow:focus{outline:none;box-shadow:0 0 0 2px rgba(255,255,255,.25),0 8px 20px rgba(0,0,0,.28)}
.dr-arrow svg{width:20px;height:20px;stroke:#fff;stroke-width:2.2;fill:none}
@media(min-width:992px){.dr-track{height:420px}.dr-slide{height:420px;border-radius:28px}}
@media(max-width:768px){.dr-arrow{display:none}.dr-slide::after{background-size:70px auto,70px auto;opacity:.1;background-position:left 3% center,right 3% center}.dr-carousel{padding:0}.dr-track{height:380px}.dr-slide{border-radius:0;box-shadow:none}.dr-title{left:12px;bottom:12px}}
```

## Final Checks
- Only the duplicated row should have `dr-target`
- Old collage modules should be disabled (not deleted)
- Clear caches (Divi + any cache plugin)
- Refresh the homepage (not in builder)

## Troubleshooting
- Nothing shows: verify the selector line `var row = document.querySelector('.dr-target');`, ensure CSS is published
- Duplicate gallery: remove `dr-target` from any other row; hide the original row on all devices
- Mobile gaps: CSS `@media(max-width:768px)` sets edge‑to‑edge; confirm it’s active

