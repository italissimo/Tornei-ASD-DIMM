import { Team, Player, Highlight, Rule } from '../types';

export const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Real Madrid FC',
    points: 18,
    played: 8,
    won: 6,
    drawn: 0,
    lost: 2,
    goalsFor: 24,
    goalsAgainst: 12,
    goalDifference: 12,
    category: 'calcio5'
  },
  {
    id: '2',
    name: 'Barcelona United',
    points: 15,
    played: 8,
    won: 5,
    drawn: 0,
    lost: 3,
    goalsFor: 22,
    goalsAgainst: 15,
    goalDifference: 7,
    category: 'calcio5'
  },
  {
    id: '3',
    name: 'Manchester City',
    points: 21,
    played: 8,
    won: 7,
    drawn: 0,
    lost: 1,
    goalsFor: 28,
    goalsAgainst: 8,
    goalDifference: 20,
    category: 'calcio7'
  },
  {
    id: '4',
    name: 'Liverpool FC',
    points: 18,
    played: 8,
    won: 6,
    drawn: 0,
    lost: 2,
    goalsFor: 25,
    goalsAgainst: 12,
    goalDifference: 13,
    category: 'calcio7'
  }
];

export const mockPlayers: Player[] = [
  { id: '1', name: 'Marco Rossi', team: 'Real Madrid FC', goals: 12, category: 'calcio5' },
  { id: '2', name: 'Luca Bianchi', team: 'Barcelona United', goals: 10, category: 'calcio5' },
  { id: '3', name: 'Andrea Verdi', team: 'Manchester City', goals: 15, category: 'calcio7' },
  { id: '4', name: 'Giuseppe Neri', team: 'Liverpool FC', goals: 13, category: 'calcio7' }
];

export const mockHighlights: Highlight[] = [
  {
    id: '1',
    title: 'Finale Calcio a 5',
    description: 'I momenti salienti della finale di calcio a 5',
    type: 'photo',
    url: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Gol spettacolare',
    description: 'Il gol più bello del torneo di calcio a 7',
    type: 'photo',
    url: 'https://images.pexels.com/photos/1171084/pexels-photo-1171084.jpeg',
    createdAt: '2024-01-10'
  }
];

/**
 * Regolamento ufficiale ASD DIMM per tornei di calcio a 5 e calcio a 7
 * Formato Markdown pulito per ottimale leggibilità
 */
export const officialRegulation: Rule[] = [
  {
    id: '1',
    title: 'Regole Specifiche Calcio a 5 (FIGC)',
    content: `**SOLO PER IL CALCIO A 5 - NEI TORNEI E CAMPIONATI ASD DIMM:**

**La SCIVOLATA DIRETTA NON È MAI AMMESSA** salvo che sia per intercettazione palla e non pericolosa e sempre a discrezione del giudice di gara.

**Retropassaggio al portiere:** questi deve giocare la palla con i piedi e sulla rimessa dal fondo può ricevere la palla dai suoi compagni **una sola volta** nell'ambito della stessa azione (se la palla passa la metà campo, esce lateralmente o se la tocca un avversario si considera altra azione).

Un giocatore **NON può fare ostruzione al portiere** in caso di calcio di punizione.

**Time out:** è concesso **uno per squadra a partita**, SOLO in possesso di palla.`,
    order: 1
  },
  {
    id: '2',
    title: 'Falli, Vantaggio e Punizioni',
    content: `**Falli cumulativi per il tiro libero** sono quelli diretti (compresi falli di mano), al **quinto fallo subito** si procede con un tiro libero a proprio favore e alla fine del tempo di gioco si riparte da zero e si ricomincia il conteggio.

**La regola del vantaggio** viene applicata quando il vantaggio è concretamente realizzato, lasciando al direttore di gara l'interpretazione del maggior profitto derivante alla squadra dall'iscrizione di un fallo cumulativo o del proseguo dell'azione.

**Calci di punizione:** battere entro **4 secondi** oppure chiedere la distanza di gioco (**5 metri**) e aspettare il fischio del direttore di gara.

**Rimesse laterali:** battere entro **4 secondi** con il pallone fermo e sulla riga (cambio rimessa ogni altra situazione). La tolleranza è di **una spanna** dall'esterno del campo fino alla riga di bordo campo.`,
    order: 2
  },
  {
    id: '3',
    title: 'Durata Gare e Timing',
    content: `⏰ **Durata della gara:** **20 minuti per tempo**

**Tempo di attesa:** **10 minuti** (pena: **perdita a TAVOLINO**)

**Il giocatore espulso** potrà essere sostituito dalla squadra, trascorsi **2 minuti** dall'evento.

**Posticipo gare:** è possibile posticipare ad un'altra data (previo accordo con l'organizzatore **almeno 10 giorni prima** della data della gara) per motivi gravi ed imprevisti **una sola partita**.`,
    order: 3
  },
  {
    id: '4',
    title: 'Sanzioni e Tariffario',
    content: `💰 **TARIFFARIO SANZIONI:**
• **Ammonizione:** 5 euro
• **Espulsione:** 10 euro (successive 20 euro)
• **Ritardo:** 5 euro (entro 15 minuti dall'orario d'inizio)
• **Mancata presentazione:** 45 euro (CALCIO A 5) / 65 euro (CALCIO A 7)

⚠️ **Ogni altro comportamento scorretto:** pena il **ritiro delle somme versate ed espulsione della squadra dal torneo**.`,
    order: 4
  },
  {
    id: '5',
    title: 'Formazione Squadre',
    content: `**LA PARTECIPAZIONE È APERTA A SQUADRE DI OGNI LIVELLO DI GIOCO:**

**Composizione squadra:**
• **5 calciatori in campo** (uno dei quali nel ruolo di portiere)
• Sino ad un **massimo di 5 giocatori di riserva**
• Oltre all'eventuale **allenatore/accompagnatore** (massimo 2 accompagnatori in tutto, gli altri fuori dal campo)

**Numero minimo giocatori:**
• **TRE giocatori per CALCIO A 5**
• **CINQUE per il CALCIO A 7** in campo

**Esclusività:** Gli atleti iscritti in una squadra **NON potranno far parte di altre squadre** dello stesso campionato (pena annullamento partita, vittoria a tavolino a discrezione dell'organizzatore).

**Ricorsi:** Ogni casistica o richiesta va dichiarata **pre-partita all'organizzatore** come ogni ricorso partita o **entro 10 giorni dalla gara**, altrimenti non verrà considerata valida anche se corretta.`,
    order: 5
  },
  {
    id: '6',
    title: 'Equipaggiamento e Comportamento',
    content: `**L'EQUIPAGGIAMENTO CONSIGLIATO:**
• Maglia numerata
• Pantaloncini e calzettoni
• Scarpe da tennis o con chiodi in gomma (da calcetto)
• **Parastinchi** (obbligatori)
• Consigliamo di **coprire con cerotto o togliere eventuali piercing**

**Divise:** Nel caso in cui le squadre avversarie presentino divise di colore uguale l'arbitro con sorteggio farà indossare la **pettorina messa a disposizione dall'organizzazione**.

**Presentazione:** Il responsabile della squadra è tenuto a presentarsi **IN RECEPTION** per marcare la presenza della sua squadra agli organizzatori in tempo utile prima di ogni gara e le squadre al campo **almeno 15 minuti prima della partita** per far sì che si possano rispettare gli orari previsti delle partite.

⚠️ **Rispetto e Fair Play:**
• **Non saranno permessi gesti o frasi** che possono offendere o oltraggiare il direttore di gara
• Saranno **pesantemente sanzionate** (pena massima squalifica) tutte le forme irrispettose nei confronti di avversari e classe arbitrale
• **Non sarà permessa nessuna forma di violenza fisica e verbale** dentro e fuori il campo
• Il torneo è a **livello amatoriale** ed è stato creato per **far divertire i partecipanti**, quindi si dovrà svolgere nel **massimo della correttezza e della sportività**`,
    order: 6
  },
  {
    id: '7',
    title: 'Comunicazioni e Informazioni',
    content: `**Canali ufficiali:** Tutti i capitani o mister, ma in generale tutti i giocatori iscritti ai tornei ASD DIMM, sono **INVITATI a consultare il sito** per essere sempre aggiornati di eventuali comunicazioni di servizio, risultati, variazioni o altro da parte dell'organizzazione.

**Social Media:** Abbiamo attiva anche la nostra **PAGINA FACEBOOK e INSTAGRAM**, dove pubblicheremo foto, video, interviste e quant'altro di più simpatico.

**Ritardi:** Ricordiamo che ogni eventuale ritardo della partita è commisurato agli eventi (infortuni, etc.) non programmabili e sarà **nostra premura informare la squadra** al verificarsi dello stesso.`,
    order: 7
  },
  {
    id: '8',
    title: 'Assicurazione (TESSERAMENTO ACSI)',
    content: `**Copertura obbligatoria:** I calciatori sono assicurati con una **copertura base obbligatoria** e copre anche gli scontri di gioco e tutto ciò che accade durante l'attività sportiva (**TESSERAMENTO ACSI**).

⚠️ **Responsabilità:** Se un giocatore dietro nostro ripetuto consiglio **NON presenta richiesta di assicurazione**, ASD DIMM **si ritiene assolta da ogni infortunio o colpa e responsabilità**.`,
    order: 8
  },
  {
    id: '9',
    title: 'Quote di Iscrizione e Pagamenti',
    content: `💰 **QUOTA DI ISCRIZIONE: EURO 10 X GIOCATORE** (comprende la copertura assicurativa per ogni giocatore + tesseramento stagionale). Entro **1 mese dall'inizio del campionato** il candidato è coperto dall'assicurazione e vi faremo pervenire le **tessere soci con la relativa copertura assicurativa ACSI**.

**CAPARRA:** **100 EURO di caparra disciplinare** (verrà restituita solo ed esclusivamente **entro 15 giorni dalle premiazioni** detratte eventuali ammende).

**QUOTA PARTITA:** Ogni squadra verserà (esclusa quota d'iscrizione) **la quota partita**, il cui pagamento verrà stabilito all'atto dell'iscrizione con l'organizzazione.

**SALDO TORNEO ENTRO MARZO 2026**

⚠️ **L'abbandono della squadra dal torneo NON comporterà la restituzione** delle somme versate e il **non rispettare i termini di pagamento** potrà indurre l'organizzazione **all'esclusione della stessa**.`,
    order: 9
  },
  {
    id: '10',
    title: 'Premi',
    content: `🏆 **NON saranno messi in palio premi in denaro**, ma:
• Buoni da spendere presso **centri sportivi**
• **Ristoranti e negozi locali**
• **Coppe, trofei, oggetti sportivi**

**Scadenza:** Usufruibili **entro TRE MESI** fine campionato o torneo, **previo accordo con organizzatori**. In caso contrario il **premio verrà perso e trattenuto dall'organizzazione** e rimesso in palio per altro evento.`,
    order: 10
  },
  {
    id: '11',
    title: 'Calcio a 7',
    content: `**PER IL CALCIO A 7 VALGONO LE REGOLE FIGC SENZA VARIAZIONI**

Si applicano integralmente le norme stabilite dalla **Federazione Italiana Giuoco Calcio** per la disciplina del calcio a 7.`,
    order: 11
  }
];