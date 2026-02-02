# Dish-ki
Progetto per il corso universitario di "Comunicazione visiva e design delle interfacce" che unisce il mondo della ristorazione futuristica all'energia della musica.

Il sito è visionabile al seguente indirizzo [Dish-ki](https://www.dishki.altervista.org/)


# HTML
Sfruttando il sistema a griglia e i componenti predefiniti di Bootstrap (come navbar e footer), è stato possibile strutturare velocemente il layout, garantendo un risultato finale altamente fedele ai mockup iniziali.

Il background principale, comune a tutte le pagine, è costituito da una tonalità blu scuro (#0A0B1A) su cui è applicato un effetto noise animato, che rievoca l'assenza di segnale dei vecchi televisori analogici.
Per conferire maggiore dinamismo, le sezioni principali sono arricchite da una griglia puntinata che simula un movimento ondulatorio. Cromaticamente, questi punti richiamano il colore tematico della pagina specifica, ad eccezione della pagina Menu, che aggrega l'intera palette colori.
La struttura visiva è scandita da linee divisorie (continue o tratteggiate) che emulano le classiche luci presenti sulle insegne retrò. Questo effetto 'alone' (glow) non è limitato ai divisori, ma viene applicato anche agli elementi di rilievo per catturare immediatamente l'attenzione dell'utente.

Per gestire la ridotta area di visualizzazione dei dispositivi mobili, in sezioni critiche presenti in pagine come l'index è stato adottato un layout adattivo che varia significativamente rispetto alla versione desktop. La priorità è stata assegnata alla funzionalità: si è scelto di semplificare la struttura grafica per garantire un accesso ai contenuti fluido e senza ostacoli, piuttosto che mantenere un'estetica complessa inadatta agli schermi ridotti.

La funzionalità multilingua è presente nella home page come proof of concept dell'implementazione di altre lingue. Il selettore permette di scegliere tra quattro opzioni: oltre alle lingue standard (Italiano e Inglese), sono state integrate le rispettive conversioni in codice Morse.
Questa scelta non è solo estetica ma funzionale: il Morse è stato selezionato per la sua capacità di rappresentare l'informazione sia attraverso il canale visivo che quello uditivo, arricchendo l'esperienza utente rimanendo coerenti con il concept.

Per non dilungarci ulteriormente rimandiamo alla documentazione ufficiale.


# CSS
L'architettura degli stili è centralizzata in un unico file monolitico (main.css), strutturato in macro-sezioni logiche per facilitarne la manutenzione e la leggibilità.

## Elementi generali (General styles)
Questa sezione definisce le fondamenta visive del progetto. Qui vengono importati i font e impostata la tipografia fluida tramite la funzione CSS clamp(), garantendo una scalabilità ottimale del testo. Sono inoltre dichiarate le variabili per la palette colori e il sistema di spaziature (custom spacing). Include anche l'animazione noise (rumore di fondo), trattandosi di un asset grafico globale presente in ogni pagina.

## Elementi ripetuti (Used more than once)
Raggruppa gli stili di tutti i componenti riutilizzabili e trasversali all'interfaccia. Tra questi rientrano: la navbar, il footer, i pulsanti, le linee divisorie, le finestre modali, la Hero section e molti altri. L'obiettivo è mantenere coerenza visiva e ridurre la duplicazione del codice.

## Pagine (Pages)
Contiene le regole di stile specifiche che non rientrano nei componenti riutilizzabili. La sezione è suddivisa in blocchi dedicati a ciascuna pagina, permettendo modifiche puntuali al layout o agli elementi unici di una determinata vista senza influenzare il resto del sito.

## Responsive (Responsive style)
Gestisce l'adattabilità del layout attraverso le media queries. Le regole sono organizzate per coprire progressivamente diversi scenari: ottimizzazioni congiunte per tablet e mobile, regole specifiche solo per tablet, fino a gestire casi particolari per schermi desktop con aspect ratio specifici (es. monitor 4:3).


# JavaScript
La logica JavaScript del progetto è stata sviluppata mediante un flusso di lavoro AI-assisted. Sebbene la base di codice sia stata generata con l'ausilio di Gemini 3 Pro, ogni file è stato successivamente analizzato e validato da un umano (in teoria competente e laureato in informatica).
Questo processo di revisione manuale ha avuto un duplice scopo: documentare il codice tramite commenti e rettificare le istruzioni per ottenere l'esatto comportamento desiderato, risolvendo le interpretazioni talvolta approssimative fornite dal modello generativo.

Per garantire un codice pulito ed efficiente, abbiamo massimizzato l'uso di funzioni riutilizzabili. Invece di duplicare il codice, abbiamo creato script flessibili che agiscono diversamente a seconda dei dati di input.
Il caso d'uso principale è l'animazione delle onde nella pagina Ristorante: la stessa logica viene riutilizzata più volte, modificando solo i parametri passati alla funzione per adattare l'effetto alle diverse sezioni.

Sfruttando la potenza dei dizionari, abbiamo realizzato un meccanismo di traduzione in tempo reale. Questo approccio elimina i tempi di attesa, permettendo all'utente di cambiare lingua istantaneamente senza dover aggiornare la pagina.

Oltre alla localizzazione, JavaScript è il motore delle interazioni avanzate del sito: gestisce la multimedialità della Hero section (sincronizzando cambio frequenza, musica e video), crea l'effetto di profondità per il carosello 3D nella pagina Liberal e altre funzionalità.


# Altro
Al fine di garantire la piena accessibilità del sito e la sua fruibilità tramite tecnologie assistive (come gli screen reader), il markup è stato arricchito con gli attributi ARIA (Accessible Rich Internet Applications) laddove necessari.

Parallelamente, per quanto riguarda l'ottimizzazione per i motori di ricerca (SEO), sono stati implementati tutti gli accorgimenti tecnici fondamentali e i meta-tag essenziali per favorire una corretta indicizzazione dei contenuti.