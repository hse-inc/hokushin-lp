(() => {
  const START_MS = 60, STEP_MS = 80;
  let timers = [];
  const enter = (page) => {
    timers.forEach(clearTimeout);
    document.querySelectorAll('.rvp.is-on').forEach((el) => { if (!page.contains(el)) el.classList.remove('is-on'); });
    timers = [...page.querySelectorAll('.rvp:not(.is-on)')].map((el, k) => setTimeout(() => el.classList.add('is-on'), START_MS + STEP_MS * k));
  };
  const pages = [...document.querySelectorAll('.page')];
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) enter(e.target); }), { root: document.getElementById('slider'), threshold: 0.5 });
  pages.forEach((p) => io.observe(p));

  document.querySelectorAll('[data-caro]').forEach((caro) => {
    const list = caro.querySelector('.caro__list');
    const step = (d) => {
      const w = list.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(list).columnGap || 0);
      const end = list.scrollLeft + list.clientWidth >= list.scrollWidth - 4;
      list.scrollTo({ left: d > 0 && end ? 0 : list.scrollLeft + d * w, behavior: 'smooth' });
    };
    let timer = setInterval(() => step(1), 4000);
    const stop = () => { clearInterval(timer); timer = null; };
    list.addEventListener('pointerdown', stop, { passive: true });
    list.addEventListener('touchstart', stop, { passive: true });
    caro.querySelectorAll('.caro__btn').forEach((b) => b.addEventListener('click', () => { stop(); step(Number(b.dataset.dir)); }));
  });
})();
