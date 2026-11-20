// Week list on the trainings page (layouts/_partials/schedule-week.html): mark the nearest training, from the visitor's clock.
// Runs right after the list; data-weekday is 0 = Monday, each time carries data-start/data-end.
(() => {
  const week = document.currentScript && document.currentScript.previousElementSibling;
  if (!week || !week.dataset.labels) return;
  const labels = JSON.parse(week.dataset.labels);
  const now = new Date();
  const today = (now.getDay() + 6) % 7;
  const minutes = now.getHours() * 60 + now.getMinutes();
  const toMinutes = hm => { const [h, m] = hm.split(":").map(Number); return h * 60 + m; };
  const times = week.querySelectorAll("[data-start]");
  // With a single training there is nothing to choose from
  if (times.length < 2) return;
  let best = null;
  for (const time of times) {
    const day = time.closest("[data-weekday]");
    const weekday = Number(day.dataset.weekday);
    const start = toMinutes(time.dataset.start);
    const ongoing = weekday === today && minutes >= start && minutes < toMinutes(time.dataset.end);
    let wait = ((weekday - today + 7) % 7) * 1440 + start - minutes;
    if (ongoing) wait = 0;
    else if (wait < 0) wait += 7 * 1440;
    if (!best || wait < best.wait) best = { day, weekday, wait, ongoing };
  }
  if (!best) return;
  const inDays = (best.weekday - today + 7) % 7;
  best.day.classList.add("is-next");
  best.day.dataset.nextLabel = best.ongoing ? labels.now
    : inDays === 0 ? labels.today
    : inDays === 1 ? labels.tomorrow
    : labels.next;
})();
