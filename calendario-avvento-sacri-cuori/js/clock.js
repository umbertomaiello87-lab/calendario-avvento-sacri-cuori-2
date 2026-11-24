(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const target = new Date(2026, 11, 25, 0, 0, 0, 0);
  const pad = n => String(n).padStart(2, '0');
  function update() {
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    if (diff <= 0) {
      $('countdown').hidden = true;
      $('countdown-message').textContent = 'È Natale! Che la gioia della Natività accompagni ogni famiglia.';
      return;
    }
    const seconds = Math.floor(diff / 1000);
    $('count-days').textContent = String(Math.floor(seconds / 86400));
    $('count-hours').textContent = pad(Math.floor(seconds % 86400 / 3600));
    $('count-minutes').textContent = pad(Math.floor(seconds % 3600 / 60));
    $('count-seconds').textContent = pad(seconds % 60);
  }
  update();
  setInterval(update, 1000);
})();