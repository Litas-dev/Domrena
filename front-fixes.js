document.addEventListener('DOMContentLoaded', function () {
  var row = document.querySelector('.home .et_pb_row_4');
  if (!row) return;
  // Paslėpti originalius tekstinius blokus tik po to, kai karuselė sukurta
  // Hide original modules; build uniform slides
  var data = [
    { title: 'Darbo rūbai', href: 'https://domrena.lt/product-category/darbo-rubai/', img: 'clothes.png' },
    { title: 'Pirštinės', href: 'https://domrena.lt/product-category/pirstines/', img: 'glowe.png' },
    { title: 'Darbo batai', href: 'https://domrena.lt/product-category/batai/', img: 'shoose.png' },
    { title: 'Pakavimo medžiagos', href: 'https://domrena.lt/product-category/pakavimo-medziagos/', img: 'packing.png' },
    { title: 'Kita', href: 'https://domrena.lt/product-category/kita/', img: 'other.png' }
  ];
  var wrap = document.createElement('div');
  wrap.className = 'dr-carousel';
  var track = document.createElement('div');
  track.className = 'dr-track';
  wrap.appendChild(track);
  row.appendChild(wrap);
  var slides = [];
  data.forEach(function (d, i) {
    var a = document.createElement('a');
    a.href = d.href;
    a.className = 'dr-slide' + (i === 0 ? ' active' : '');
    a.style.setProperty('--img', 'url(' + d.img + ')');
    a.setAttribute('aria-label', d.title);
    var photo = document.createElement('div');
    photo.className = 'dr-photo';
    // inline background not needed; CSS uses --img
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
  left.setAttribute('aria-label', 'Ankstesnė kategorija');
  right.setAttribute('aria-label', 'Kita kategorija');
  left.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>';
  right.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
  wrap.appendChild(left);
  wrap.appendChild(right);
  var idx = 0;
  var isMobile = window.matchMedia('(max-width: 768px)').matches;
  function advance(dir){
    idx = (idx + dir + slides.length) % slides.length;
    setActive(idx, dir < 0 ? 'prev' : 'next');
  }
  function setActive(i, dir){
    slides.forEach(function(s, k){
      s.classList.toggle('active', k === i);
      if (k === i) {
        s.style.transform = 'translateX(' + (dir === 'prev' ? '-6%' : '6%') + ')';
        requestAnimationFrame(function(){ s.style.transform = 'translateX(0)'; });
      }
    });
  }
  if (!isMobile) {
    left.addEventListener('click', function () { advance(-1); pauseThenResume(); });
    right.addEventListener('click', function () { advance(1); pauseThenResume(); });
  } else {
    left.style.display = 'none';
    right.style.display = 'none';
  }

  // Touch swipe (mobile)
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
      if (dx < 0) { right.click(); } else { left.click(); }
    }
  }, { passive: true });
  wrap.addEventListener('touchend', function(){ swiping = false; resume(); }, { passive: true });
  wrap.addEventListener('mouseenter', pause);
  wrap.addEventListener('mouseleave', resume);

  // Autoplay "organic"
  var timer = null;
  function randomDelay(){ return 4000 + Math.round(Math.random() * 3000); }
  function next(){ advance(1); }
  function schedule(){ timer = setTimeout(next, randomDelay()); }
  function pause(){ if (timer) { clearTimeout(timer); timer = null; } }
  function resume(){ if (!timer) schedule(); }
  function pauseThenResume(){ pause(); setTimeout(resume, 6000); }
  resume();

  // removed duotone sampling; using blurred cover background layer instead
});
