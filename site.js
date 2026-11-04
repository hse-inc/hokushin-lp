(() => {
  const START_MS = 60, STEP_MS = 110;
  let timers = [];
  const pages = [...document.querySelectorAll('.page')];
  const video = document.querySelector('.hero__video');
  const enter = (page) => {
    timers.forEach(clearTimeout);
    pages.forEach((p) => p.classList.toggle('is-now', p === page));
    document.querySelectorAll('.rvp.is-on').forEach((el) => { if (!page.contains(el)) el.classList.remove('is-on'); });
    timers = [...page.querySelectorAll('.rvp:not(.is-on)')].map((el, k) => setTimeout(() => el.classList.add('is-on'), START_MS + STEP_MS * k));
    if (video) { if (page.contains(video)) video.play().catch(() => {}); else video.pause(); }
  };
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) enter(e.target); }), { root: document.getElementById('slider'), threshold: 0.5 });
  pages.forEach((p) => io.observe(p));

  document.querySelectorAll('[data-caro]').forEach((caro) => {
    const list = caro.querySelector('.caro__list');
    const step = (d) => {
      const w = list.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(list).columnGap || 0);
      const end = list.scrollLeft + list.clientWidth >= list.scrollWidth - 4;
      list.scrollTo({ left: d > 0 && end ? 0 : list.scrollLeft + d * w, behavior: 'smooth' });
    };
    const timer = setInterval(() => { if (caro.closest('.page').classList.contains('is-now')) step(1); }, 4000);
    const stop = () => clearInterval(timer);
    list.addEventListener('pointerdown', stop, { passive: true });
    list.addEventListener('touchstart', stop, { passive: true });
    caro.querySelectorAll('.caro__btn').forEach((b) => b.addEventListener('click', () => { stop(); step(Number(b.dataset.dir)); }));
  });
})();
