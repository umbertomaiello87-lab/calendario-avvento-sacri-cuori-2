(() => {
  'use strict';
  const audio = document.getElementById('advent-audio');
  const button = document.getElementById('music-toggle');
  const label = document.getElementById('music-label');
  if (!audio || !button) return;
  const key = 'sacri-cuori-avvento-music';
  audio.volume = 0.28;
  let unavailable = false;
  function setPlaying(playing) {
    button.setAttribute('aria-pressed', String(playing));
    button.querySelector('.music-icon').textContent = playing ? 'Ⅱ' : '♫';
    label.textContent = playing ? 'MUSICA ATTIVA' : 'ATTIVA LA MUSICA';
  }
  audio.addEventListener('error', () => {
    unavailable = true;
    button.disabled = true;
    button.setAttribute('aria-label', 'Musica non disponibile: manca il file audio');
    label.textContent = 'AGGIUNGI UN BRANO AUTORIZZATO';
    setPlaying(false);
  });
  button.addEventListener('click', async () => {
    if (unavailable) return;
    if (audio.paused) {
      try {
        if (!audio.src) audio.src = window.ADVENT_SETTINGS.audioPath;
        await audio.play();
        setPlaying(true);
        try { localStorage.setItem(key, 'on'); } catch {}
      } catch {
        button.disabled = true;
        label.textContent = 'MUSICA NON DISPONIBILE';
      }
    } else {
      audio.pause();
      setPlaying(false);
      try { localStorage.setItem(key, 'off'); } catch {}
    }
  });
  audio.addEventListener('pause', () => setPlaying(false));
  audio.addEventListener('play', () => setPlaying(true));
  try {
    if (localStorage.getItem(key) === 'on') label.textContent = 'ATTIVA LA MUSICA';
  } catch {}
})();