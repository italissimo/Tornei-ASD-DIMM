# Query SQL per Update - Supabase

Raccolta di query SQL per aggiornare i dati nelle tabelle del database.

---

## 📅 Calendario Calcio 5

### Aggiornare una partita specifica

```sql
UPDATE calendario_calcio5
SET 
    data = '2024-10-15',
    ora = '20:30',
    campo = 'Campo A',
    squadra_casa = 'Squadra 1',
    squadra_trasferta = 'Squadra 2',
    risultato = '3-2'
WHERE id = 1;
```

### Aggiornare solo il risultato

```sql
UPDATE calendario_calcio5
SET risultato = '4-1'
WHERE id = 1;
```

### Aggiornare partite di una giornata

```sql
UPDATE calendario_calcio5
SET campo = 'Campo Principale'
WHERE giornata = 5;
```

---

## 📅 Calendario Calcio 7

### Aggiornare una partita specifica

```sql
UPDATE calendario_calcio7
SET 
    data = '2024-10-15',
    ora = '21:00',
    campo = 'Campo B',
    squadra_casa = 'Team A',
    squadra_trasferta = 'Team B',
    risultato = '5-3'
WHERE id = 1;
```

### Aggiornare solo il risultato

```sql
UPDATE calendario_calcio7
SET risultato = '4-1'
WHERE id = 1;
```

---

## 🏆 Classifica Calcio 5

### Aggiornare statistiche di una squadra

```sql
UPDATE standings_calcio5
SET 
    punti = 15,
    giocate = 8,
    vittorie = 4,
    pareggi = 3,
    sconfitte = 1,
    reti_fatte = 25,
    reti_subite = 18,
    ammonizioni = 10,
    espulsioni = 1
WHERE squadra = 'Nome Squadra' AND serie = 'A';
```

### Aggiornare la posizione

```sql
UPDATE standings_calcio5
SET posizione = 2
WHERE id = 1;
```

### Incrementare statistiche

```sql
-- Incrementare punti
UPDATE standings_calcio5
SET punti = punti + 3
WHERE squadra = 'Nome Squadra' AND serie = 'A';

-- Incrementare vittorie e partite giocate
UPDATE standings_calcio5
SET 
    vittorie = vittorie + 1,
    giocate = giocate + 1
WHERE squadra = 'Nome Squadra' AND serie = 'A';
```

---

## 🏆 Classifica Calcio 7

### Aggiornare statistiche di una squadra

```sql
UPDATE standings_calcio7
SET 
    punti = 20,
    giocate = 10,
    vittorie = 6,
    pareggi = 2,
    sconfitte = 2,
    reti_fatte = 30,
    reti_subite = 15,
    ammonizioni = 8,
    espulsioni = 1
WHERE squadra = 'Nome Squadra' AND serie = 'A';
```

### Incrementare statistiche

```sql
-- Incrementare punti
UPDATE standings_calcio7
SET punti = punti + 3
WHERE squadra = 'Nome Squadra' AND serie = 'A';
```

---

## ⚽ Capocannonieri Calcio 5

### Aggiornare statistiche di un giocatore

```sql
UPDATE capocannonieri_calcio5
SET 
    gol = 12,
    assist = 5,
    ammonizioni = 2,
    espulsioni = 0,
    posizione = 1
WHERE giocatore = 'Nome Giocatore' AND squadra = 'Nome Squadra';
```

### Incrementare i gol di un giocatore

```sql
UPDATE capocannonieri_calcio5
SET gol = gol + 1
WHERE id = 1;
```

### Incrementare assist e ammonizioni

```sql
UPDATE capocannonieri_calcio5
SET 
    assist = assist + 1,
    ammonizioni = ammonizioni + 1
WHERE giocatore = 'Nome Giocatore' AND squadra = 'Nome Squadra';
```

---

## ⚽ Capocannonieri Calcio 7

### Aggiornare statistiche di un giocatore

```sql
UPDATE capocannonieri_calcio7
SET 
    gol = 15,
    assist = 8,
    ammonizioni = 1,
    espulsioni = 0,
    posizione = 1
WHERE giocatore = 'Nome Giocatore' AND squadra = 'Nome Squadra';
```

### Incrementare i gol di un giocatore

```sql
UPDATE capocannonieri_calcio7
SET gol = gol + 1
WHERE id = 1;
```

---

## 🎥 Highlights

### Aggiornare un highlight

```sql
UPDATE highlights
SET 
    titolo = 'Nuovo Titolo',
    descrizione = 'Nuova descrizione',
    category = 'calcio7',
    featured = true
WHERE id = 'uuid-del-highlight';
```

### Impostare come featured

```sql
UPDATE highlights
SET featured = true
WHERE id = 'uuid-del-highlight';
```

### Rimuovere featured da tutti e impostarlo su uno specifico

```sql
-- Prima rimuovi featured da tutti
UPDATE highlights
SET featured = false
WHERE category = 'calcio5';

-- Poi imposta il nuovo featured
UPDATE highlights
SET featured = true
WHERE id = 'uuid-del-highlight';
```

### Cambiare categoria

```sql
UPDATE highlights
SET category = 'calcio7'
WHERE id = 'uuid-del-highlight';
```

---

## 🔧 Query Utili Avanzate

### Ricalcolare le posizioni in classifica (Calcio 5)

```sql
WITH ranked AS (
    SELECT 
        id, 
        ROW_NUMBER() OVER (
            PARTITION BY serie 
            ORDER BY punti DESC, (reti_fatte - reti_subite) DESC, reti_fatte DESC
        ) as new_pos
    FROM standings_calcio5
)
UPDATE standings_calcio5 s
SET posizione = r.new_pos
FROM ranked r
WHERE s.id = r.id;
```

### Ricalcolare le posizioni in classifica (Calcio 7)

```sql
WITH ranked AS (
    SELECT 
        id, 
        ROW_NUMBER() OVER (
            PARTITION BY serie 
            ORDER BY punti DESC, (reti_fatte - reti_subite) DESC, reti_fatte DESC
        ) as new_pos
    FROM standings_calcio7
)
UPDATE standings_calcio7 s
SET posizione = r.new_pos
FROM ranked r
WHERE s.id = r.id;
```

### Ricalcolare le posizioni capocannonieri (Calcio 5)

```sql
WITH ranked AS (
    SELECT 
        id, 
        ROW_NUMBER() OVER (
            ORDER BY gol DESC, assist DESC
        ) as new_pos
    FROM capocannonieri_calcio5
)
UPDATE capocannonieri_calcio5 c
SET posizione = r.new_pos
FROM ranked r
WHERE c.id = r.id;
```

### Ricalcolare le posizioni capocannonieri (Calcio 7)

```sql
WITH ranked AS (
    SELECT 
        id, 
        ROW_NUMBER() OVER (
            ORDER BY gol DESC, assist DESC
        ) as new_pos
    FROM capocannonieri_calcio7
)
UPDATE capocannonieri_calcio7 c
SET posizione = r.new_pos
FROM ranked r
WHERE c.id = r.id;
```

### Aggiornare multiple squadre in una transazione

```sql
BEGIN;

UPDATE standings_calcio5
SET 
    punti = punti + 3,
    vittorie = vittorie + 1,
    giocate = giocate + 1,
    reti_fatte = reti_fatte + 3,
    reti_subite = reti_subite + 1
WHERE squadra = 'Squadra Vincente' AND serie = 'A';

UPDATE standings_calcio5
SET 
    sconfitte = sconfitte + 1,
    giocate = giocate + 1,
    reti_fatte = reti_fatte + 1,
    reti_subite = reti_subite + 3
WHERE squadra = 'Squadra Perdente' AND serie = 'A';

COMMIT;
```

---

## ⚠️ Note Importanti

1. **Sempre usare WHERE**: Non dimenticare mai la clausola `WHERE` per evitare di aggiornare tutte le righe
2. **Last Update**: Il campo `last_update` si aggiorna automaticamente con `now()`
3. **Testing**: Testa sempre le query su dati di test prima di usarle in produzione
4. **Backup**: Fai sempre un backup prima di operazioni massive
5. **Transazioni**: Usa `BEGIN` e `COMMIT` per operazioni multiple correlate
6. **UUID**: Per la tabella highlights, ricorda che l'id è un UUID, non un integer

---

## 📝 Esempi di Uso Combinato

### Aggiornare risultato partita e statistiche squadre

```sql
BEGIN;

-- Aggiorna il risultato della partita
UPDATE calendario_calcio5
SET risultato = '3-1'
WHERE id = 1;

-- Aggiorna la squadra vincente
UPDATE standings_calcio5
SET 
    punti = punti + 3,
    vittorie = vittorie + 1,
    giocate = giocate + 1,
    reti_fatte = reti_fatte + 3,
    reti_subite = reti_subite + 1
WHERE squadra = 'Squadra Casa';

-- Aggiorna la squadra perdente
UPDATE standings_calcio5
SET 
    sconfitte = sconfitte + 1,
    giocate = giocate + 1,
    reti_fatte = reti_fatte + 1,
    reti_subite = reti_subite + 3
WHERE squadra = 'Squadra Trasferta';

COMMIT;
```

### Gestire un pareggio

```sql
BEGIN;

-- Aggiorna il risultato
UPDATE calendario_calcio5
SET risultato = '2-2'
WHERE id = 1;

-- Aggiorna entrambe le squadre con un pareggio
UPDATE standings_calcio5
SET 
    punti = punti + 1,
    pareggi = pareggi + 1,
    giocate = giocate + 1,
    reti_fatte = reti_fatte + 2,
    reti_subite = reti_subite + 2
WHERE squadra IN ('Squadra Casa', 'Squadra Trasferta');

COMMIT;
```

---

## 🔍 Query di Verifica

### Verificare una squadra

```sql
SELECT * FROM standings_calcio5
WHERE squadra = 'Nome Squadra' AND serie = 'A';
```

### Verificare un giocatore

```sql
SELECT * FROM capocannonieri_calcio5
WHERE giocatore = 'Nome Giocatore';
```

### Verificare partite di una giornata

```sql
SELECT * FROM calendario_calcio5
WHERE giornata = 5
ORDER BY data, ora;
```
