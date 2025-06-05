Gestione Piante - La Tua App per Amanti del Verde
Benvenuto nel progetto "Gestione Piante"! Questa è un'applicazione web robusta e sicura, sviluppata con Node.js ed Express, pensata per aiutarti a tenere traccia delle tue piante in modo efficiente e intuitivo.

Caratteristiche Principali
Il cuore di questa applicazione è la sua capacità di offrire un'esperienza utente fluida e protetta, grazie a una combinazione di tecnologie moderne e solide pratiche di sicurezza:

Gestione Completa delle Piante: Aggiungi, visualizza, modifica ed elimina le tue piante, tenendo sotto controllo ogni dettaglio.
Archiviazione Affidabile: I dati delle tue piante sono gestiti con cura in un database MySQL, garantendo persistenza e integrità.
Performance Ottimizzate: Grazie all'integrazione di Memcached, le operazioni frequenti sono accelerate, offrendo un'esperienza rapida e reattiva.
Sicurezza al Primo Posto:
Controlli di Sicurezza: Implementazione di meccanismi per prevenire vulnerabilità comuni.
Rate Limiting: Protezione contro attacchi di forza bruta e abusi, limitando il numero di richieste che un utente può effettuare in un dato periodo.
Protezione CSRF: Salvaguardia contro gli attacchi di Cross-Site Request Forgery per garantire che solo le richieste legittime siano elaborate.
Funzionalità Future (In Sviluppo)
Il progetto è in continua evoluzione! Alcune delle funzionalità su cui stiamo lavorando o che sono in programma includono:

Autenticazione Utente: Implementazione di un sistema di login/registrazione per gestire account utente.
Gestione Collezioni: Possibilità di organizzare le piante in collezioni personalizzate.
Notifiche e Promemoria: Promemoria per l'irrigazione, la concimazione o altre cure specifiche per ogni pianta.
Report e Statistiche: Visualizzazione di dati aggregati sulle tue piante (es. piante per tipo, frequenza di cura).
API di Terze Parti: Integrazione con servizi esterni per informazioni aggiuntive sulle piante (es. identificazione, cura specifica).
Tecnologie Utilizzate
Node.js: Runtime JavaScript lato server.
Express.js: Framework web minimalista e flessibile per Node.js.
MySQL: Sistema di gestione di database relazionali.
Memcached: Sistema di caching distribuito in-memory per accelerare le query.
HTML, CSS (Tailwind CSS/Preline UI): Per l'interfaccia utente moderna e reattiva.
Installazione e Avvio
Per far girare l'applicazione in locale, segui questi passaggi:

Clona il repository:
Bash

git clone [URL_DEL_TUO_REPOSITORY]
cd [NOME_CARTELLA_PROGETTO]
Installa le dipendenze:
Bash

npm install
Configura il database MySQL:
Crea un database MySQL.
Importa lo schema del database (se presente, schema.sql o simile).
Configura le credenziali del database in un file .env o simile (vedi config.example.js se disponibile).
Configura Memcached:
Assicurati che un'istanza di Memcached sia in esecuzione e accessibile.
Configura i dettagli di connessione nel tuo file di configurazione.
Avvia l'applicazione:
Bash

npm start
L'applicazione sarà disponibile all'indirizzo http://localhost:3000 (o la porta configurata).
