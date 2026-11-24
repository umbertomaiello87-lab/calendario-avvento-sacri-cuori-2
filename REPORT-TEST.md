# Report di verifica — Calendario dell'Avvento 2026

## Verifiche eseguite

- [x] Analizzata la struttura originale e letti HTML, CSS, JavaScript e README.
- [x] Verificata la sequenza di 25 contenuti, con Vigilia il 24 dicembre e Natività il 25 dicembre.
- [x] Controllata la presenza di esattamente 25 oggetti contenuto.
- [x] Verificati i contenuti speciali dell’8, 24 e 25 dicembre.
- [x] Controllata la presenza di esattamente 25 porticine generate dal ciclo `content.slice(0, 25)`.
- [x] Corretta la logica da 24 a 25 giorni.
- [x] Sblocco calcolato dalla data locale del dispositivo, non da LocalStorage.
- [x] Regole data simulate con i casi richiesti (30/11, 1/12, 5/12, 8/12, 15/12, 24/12, 25/12 e 26/12).
- [x] Date precedenti consultabili e date future disabilitate.
- [x] Aggiornamento al caricamento, al ritorno della visibilità, al focus e al cambio di giorno.
- [x] Countdown locale verso il 25 dicembre 2026, senza valori negativi.
- [x] Rimosso il parametro pubblico `?preview=1`, che permetteva di anticipare le date.
- [x] Rimosso il presepe geometrico non conforme alla direzione artistica richiesta.
- [x] Finestra contenuti con chiusura via pulsante, clic sullo sfondo, tasto Escape e contenimento del focus.
- [x] Aggiunto supporto `prefers-reduced-motion`, focus visibile e layout responsive.
- [x] Nessun backend, database, API o framework aggiunto.
- [x] Percorsi locali relativi.

## Controlli automatici

I file JavaScript sono stati sottoposti al controllo sintattico di Node.js. La struttura dell'HTML, il numero dei contenuti e i collegamenti locali sono stati controllati con script.

## Non verificato in un browser reale

- Resa visiva effettiva su dispositivi fisici e differenti browser.
- Animazione 3D e comportamento touch su Safari iOS e browser Android.
- Ciclo completo di interazione con la modale tramite tecnologie assistive.
- Cambio reale della data a mezzanotte durante una sessione aperta.
- Riproduzione audio: il progetto non contiene ancora un brano `assets/audio/avvento.mp3`.

## Da completare prima della pubblicazione

1. Far approvare alla Parrocchia tutti i testi, le preghiere, le citazioni e i riferimenti biblici.
2. Inserire un brano natalizio autorizzato in `assets/audio/avvento.mp3`.
3. Eseguire un collaudo manuale su smartphone, tablet e desktop.
4. Verificare la resa con la versione definitiva dei contenuti e degli eventuali asset.
