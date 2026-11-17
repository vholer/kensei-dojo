// Branch page hero: show one of the Musashi prints at random. The <img> carries the first print
// (shown without JavaScript) and the full list in data-prints; this runs right after it, before it is painted.
(() => {
  const img = document.currentScript && document.currentScript.previousElementSibling;
  if (!img || !img.dataset.prints) return;
  const prints = JSON.parse(img.dataset.prints);
  const pick = prints[Math.floor(Math.random() * prints.length)];
  img.src = pick.src;
  img.alt = pick.alt;
})();
