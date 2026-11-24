(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const modal = $('content-modal');
  let lastFocus = null;
  function show(day, item) {
    lastFocus = document.activeElement;
    $('modal-day').textContent = `GIORNO ${String(day).padStart(2,'0')}`;
    $('modal-date').textContent = `${day} DICEMBRE ${window.ADVENT_SETTINGS.year}`;
    $('modal-symbol').textContent = item.symbol || '✦';
    $('modal-category').textContent = item.category || 'IL PENSIERO DEL GIORNO';
    $('modal-title').textContent = item.title;
    $('modal-quote').textContent = item.quote || '';
    $('modal-reference').textContent = item.reference || '';
    $('modal-description').textContent = item.body || '';
    $('modal-activity').textContent = item.activity || '';
    $('modal-activity-label').textContent = item.kind === 'prayer' ? 'UN MOMENTO DI PREGHIERA' : item.kind === 'quiz' ? 'LA CURIOSITÀ DI OGGI' : 'IL PICCOLO GESTO DI OGGI';
    $('modal-extra').replaceChildren();
    if (item.quiz) {
      const quiz = document.createElement('div'); quiz.className = 'daily-quiz';
      const question = document.createElement('p'); question.className = 'quiz-question'; question.textContent = item.quiz.question; quiz.appendChild(question);
      item.quiz.options.forEach((label, index) => {
        const button = document.createElement('button'); button.type = 'button'; button.className = 'quiz-option'; button.textContent = label;
        button.addEventListener('click', () => {
          quiz.querySelectorAll('button').forEach(b => { b.disabled = true; });
          const result = document.createElement('p'); result.className = 'quiz-result';
          result.textContent = index === item.quiz.correct ? `Esatto! ${item.quiz.explanation}` : `Non proprio. ${item.quiz.explanation}`;
          quiz.appendChild(result);
        });
        quiz.appendChild(button);
      });
      $('modal-extra').appendChild(quiz);
    } else if (item.extra) {
      const extra = document.createElement('p'); extra.textContent = item.extra; $('modal-extra').appendChild(extra);
    }
    $('modal-activity-wrap').hidden = !item.activity;
    modal.classList.add('visible');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    $('modal-close').focus();
  }
  function close() {
    if (!modal.classList.contains('visible')) return;
    modal.classList.remove('visible');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }
  $('modal-close').addEventListener('click', close);
  $('modal-done').addEventListener('click', () => { close(); window.dispatchEvent(new CustomEvent('advent:content-read')); });
  modal.addEventListener('click', event => { if (event.target === modal) close(); });
  document.addEventListener('keydown', event => {
    if (!modal.classList.contains('visible')) return;
    if (event.key === 'Escape') { close(); return; }
    if (event.key === 'Tab') {
      const focusable = [...modal.querySelectorAll('button:not(:disabled),a[href],[tabindex]:not([tabindex="-1"])')].filter(el => !el.hidden);
      if (!focusable.length) { event.preventDefault(); modal.focus(); return; }
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  window.AdventModal = { show, close };
})();