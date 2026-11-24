# Calendario dell'Avvento — Parrocchia Sacri Cuori 2026

Esperienza web statica per accompagnare la comunità parrocchiale dal 1° al 25 dicembre 2026. Realizzata con HTML5, CSS3 e JavaScript vanilla; non richiede backend, database, chiavi API o processo di build.

## Avvio locale

Aprire `index.html` nel browser oppure, dalla cartella del progetto, avviare un server statico:

```bash
python -m http.server 8000
```

Visitare `http://localhost:8000`.

## Struttura

- `index.html`: homepage, calendario, countdown, player audio e finestra dei contenuti.
- `css/style.css`: identità visiva, layout, calendario e responsive design.
- `css/animations.css`: animazioni, modale, quiz e notifiche.
- `js/content.js`: i 25 contenuti giornalieri.
- `js/settings.js`: anno e chiavi LocalStorage.
- `js/calendar.js`: generazione delle porticine, blocco e progressi.
- `js/date-rules.js`: regola pura per il calcolo dei giorni disponibili, condivisa con i test.
- `js/modal.js`: finestra accessibile dei contenuti e quiz.
- `js/clock.js`: conto alla rovescia locale verso la mezzanotte del 25 dicembre.
- `js/music.js`: controlli audio e memorizzazione della preferenza.
- `assets/icons/favicon.svg`: icona del sito.
- `assets/audio/`: collocare qui un brano autorizzato, nominato `avvento.mp3`.
- `assets/images/`: riservata a eventuali immagini originali autorizzate.

## Data e sblocco

Il calendario usa la data locale del dispositivo (`new Date()`), senza una data amministrativa modificabile. Prima del 1° dicembre 2026 le porticine sono tutte bloccate; dal 1° al 25 dicembre si sbloccano progressivamente; dal 26 dicembre restano tutte disponibili.

La pagina aggiorna lo stato al caricamento, quando torna visibile, quando la finestra riprende il focus e al cambio del giorno locale. Un sito statico non può certificare l'ora reale: modificare l'orologio del dispositivo può alterare lo sblocco. LocalStorage conserva soltanto i giorni già consultati e la preferenza musicale, non determina l'accessibilità delle date.

## Modificare i contenuti

Aprire `js/content.js` e modificare gli oggetti nell'array `window.ADVENT_CONTENT`, mantenendo 25 elementi nell'ordine dal 1° al 25 dicembre. Ogni contenuto può usare:

- `title`, `category`, `symbol`
- `quote`, `reference`
- `body`, `activity`
- `kind`, `extra`
- `quiz` con `question`, `options`, `correct`, `explanation`

Verificare sempre le citazioni bibliche e i riferimenti su un’edizione approvata: i testi attuali sono bozze editoriali da sottoporre alla Parrocchia. Le formulazioni introdotte come riflessioni sono esplicitamente indicate come tali e non come citazioni testuali.

## Musica

Aggiungere in `assets/audio/` un file `avvento.mp3` per il quale la Parrocchia possieda i diritti necessari. Il player parte soltanto dopo un'interazione dell'utente e usa un volume iniziale moderato. Senza il file audio, il controllo segnala che il brano deve essere inserito. Non è stato incluso alcun audio non autorizzato.

## Pubblicazione su GitHub Pages

1. Caricare il contenuto della cartella nella radice del repository.
2. Aprire **Settings → Pages**.
3. In **Build and deployment**, scegliere **Deploy from a branch**.
4. Selezionare `main` e `/ (root)`, quindi salvare.
5. Attendere la pubblicazione.

I percorsi sono relativi, quindi il sito funziona anche in un repository GitHub Pages pubblicato in una sottocartella.

## Scelte e limitazioni note

- Il presepe geometrico precedente è stato rimosso: non raggiungeva il livello illustrativo realistico richiesto. Non è stata sostituita con un'illustrazione mediocre o con immagini di provenienza incerta.
- Non è stato aggiunto un brano audio: manca un file fornito o autorizzato dalla Parrocchia.
- Il contenuto del calendario è una bozza; testi, citazioni, quiz e messaggi devono essere verificati e approvati prima della pubblicazione.
- La preferenza e i progressi sono locali al browser/dispositivo e non si sincronizzano.
- I font Cormorant Garamond e Source Sans 3 sono caricati da Google Fonts; in assenza di rete vengono usati i font di fallback.
- Non è presente una modalità pubblica di anteprima che consenta di forzare lo sblocco delle date.

## Verifiche

Il report `REPORT-TEST.md` accompagna l'archivio e distingue i controlli statici eseguiti dalle prove non eseguibili senza un browser reale o i file audio definitivi.
