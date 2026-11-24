(() => {
  'use strict';
  const settings = window.ADVENT_SETTINGS;
  const content = window.ADVENT_CONTENT;
  const $ = id => document.getElementById(id);
  const TOTAL_DAYS = 25;
  let readDays = readProgress();
  let refreshTimer = null;

  function readProgress() {
    try {
      const value = JSON.parse(localStorage.getItem(settings.storageKey) || '[]');
      return Array.isArray(value) ? [...new Set(value.filter(n => Number.isInteger(n) && n >= 1 && n <= TOTAL_DAYS))] : [];
    } catch { return []; }
  }
  function saveProgress() {
    try { localStorage.setItem(settings.storageKey, JSON.stringify(readDays)); }
    catch { toast('Il browser non consente di salvare i progressi su questo dispositivo.'); }
  }
  // The device's local calendar is intentionally authoritative for this static site.
  function localDate() {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth(), day: now.getDate(), now };
  }
  function availableDay(date = localDate()) {
    return window.AdventDate.availableDay(date);
  }
  function toast(message) {
    const el = $('toast');
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove('show'), 2600);
  }
  function formatToday(date) {
    return new Intl.DateTimeFormat('it-IT', {weekday:'long', day:'numeric', month:'long', year:'numeric'}).format(date.now);
  }
  function render() {
    const grid = $('door-grid');
    grid.replaceChildren();
    const date = localDate();
    const unlocked = availableDay(date);
    content.slice(0, TOTAL_DAYS).forEach((item, index) => {
      const day = index + 1;
      const isAvailable = day <= unlocked;
      const isRead = readDays.includes(day);
      const isToday = day === unlocked && unlocked > 0 && date.year === settings.year && date.month === settings.month;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'door' + (isRead ? ' opened' : '') + (!isAvailable ? ' locked' : '') + (isToday ? ' today' : '') + (day === 25 ? ' christmas' : '');
      button.disabled = !isAvailable;
      button.setAttribute('aria-label', `Porticina ${day}${!isAvailable ? ', bloccata fino al ' + day + ' dicembre' : isRead ? ', contenuto già letto, riapri' : isToday ? ', disponibile oggi, apri' : ', disponibile, apri'}`);
      const number = document.createElement('span');
      number.className = 'door-number'; number.textContent = String(day).padStart(2, '0');
      const label = document.createElement('span');
      label.className = 'door-label';
      label.textContent = !isAvailable ? 'IN ATTESA' : isRead ? 'LETTO' : isToday ? 'APRI OGGI' : 'DISPONIBILE';
      const leaf = document.createElement('span'); leaf.className = 'door-leaf'; leaf.setAttribute('aria-hidden','true');
      button.append(number, label, leaf);
      if (isAvailable) button.addEventListener('click', () => openDay(day));
      grid.appendChild(button);
    });
    $('today-date').textContent = formatToday(date);
    updateProgress(unlocked);
    scheduleMidnightRefresh();
  }
  function openDay(day) {
    const unlocked = availableDay();
    if (day > unlocked || day < 1 || day > TOTAL_DAYS) {
      toast(`Questa porticina si aprirà il ${day} dicembre.`);
      return;
    }
    if (!readDays.includes(day)) { readDays.push(day); readDays.sort((a,b) => a-b); saveProgress(); }
    const door = $('door-grid').children[day - 1];
    if (door) {
      door.classList.add('opened');
      const label = door.querySelector('.door-label');
      if (label) label.textContent = 'LETTO';
    }
    window.AdventModal.show(day, content[day - 1]);
  }
  function updateProgress(unlocked) {
    $('progress-count').textContent = `${unlocked} / ${TOTAL_DAYS}`;
    $('progress-bar').style.width = `${unlocked / TOTAL_DAYS * 100}%`;
    $('progress-track').setAttribute('aria-valuenow', String(unlocked));
    $('progress-message').textContent = unlocked === 0
      ? 'Il cammino comincerà il 1° dicembre.'
      : unlocked === TOTAL_DAYS
        ? 'Tutte le porticine sono disponibili. Buon Natale!'
        : `${unlocked} ${unlocked === 1 ? 'porticina è' : 'porticine sono'} disponibili: torna ogni giorno per continuare il cammino.`;
  }
  function scheduleMidnightRefresh() {
    clearTimeout(refreshTimer);
    const now = new Date();
    const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 1);
    refreshTimer = setTimeout(render, Math.max(1000, nextMidnight.getTime() - now.getTime()));
  }
  document.addEventListener('visibilitychange', () => { if (!document.hidden) render(); });
  window.addEventListener('focus', render);
  window.addEventListener('storage', event => { if (event.key === settings.storageKey) { readDays = readProgress(); render(); } });
  window.AdventCalendar = { availableDay, refresh: render };
  if (content.length !== TOTAL_DAYS) console.error(`Il calendario richiede ${TOTAL_DAYS} contenuti: trovati ${content.length}.`);
  render();
})();