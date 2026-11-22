// Full-screen viewer for the ICTS archive grid. Without JavaScript,
// each thumbnail still links straight to the full-size photograph.
(() => {
  const dialog = document.querySelector('.viewer');
  const links = [...document.querySelectorAll('.archive-grid a')];
  if (!dialog || !links.length || typeof dialog.showModal !== 'function') return;
  const img = dialog.querySelector('img');
  const count = dialog.querySelector('.viewer-count');
  const total = links.length ? links[0].querySelector('img').alt.split(' of ').pop() : '';
  let index = 0;

  const show = (i) => {
    index = (i + links.length) % links.length;
    const link = links[index];
    img.src = link.href;
    img.alt = link.querySelector('img').alt;
    count.textContent = `${link.dataset.number} / ${total}`;
  };

  links.forEach((link, i) => link.addEventListener('click', (e) => {
    e.preventDefault();
    show(i);
    dialog.showModal();
  }));
  dialog.querySelector('.viewer-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.viewer-prev').addEventListener('click', () => show(index - 1));
  dialog.querySelector('.viewer-next').addEventListener('click', () => show(index + 1));
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
  dialog.addEventListener('close', () => { img.removeAttribute('src'); links[index].focus(); });
})();
