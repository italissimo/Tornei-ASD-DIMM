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
    risultato = '3-2',
    tipo_competizione = 'campionato'
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

### Aggiornare una partita di coppa

```sql
UPDATE calendario_calcio5
SET 
    tipo_competizione = 'coppa',
    fase_coppa = 'Quarti di Finale',
    girone = 'A'
WHERE id = 1;
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
    risultato = '5-3',
    tipo_competizione = 'campionato'
WHERE id = 1;
```

### Aggiornare solo il risultato

```sql
UPDATE calendario_calcio7
SET risultato = '4-1'
WHERE id = 1;
```

### Aggiornare una partita di coppa

```sql
UPDATE calendario_calcio7
SET 
    tipo_competizione = 'coppa',
    fase_coppa = 'Semifinale',
    girone = 'B'
WHERE id = 1;
```

---

## 🏆 Classifica Calcio 5

### Aggiornare statistiche di una squadra (Campionato)

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

### Aggiornare statistiche di una squadra (Coppa)

```sql
UPDATE standings_calcio5
SET 
    posizione_coppa = 1,
    punti_coppa = 12,
    giocate_coppa = 4,
    vittorie_coppa = 4,
    pareggi_coppa = 0,
    sconfitte_coppa = 0,
    reti_fatte_coppa = 15,
    reti_subite_coppa = 3,
    ammonizioni_coppa = 2,
    espulsioni_coppa = 0
WHERE squadra = 'Nome Squadra' AND serie = 'A' AND girone = 'A';
```

### Aggiornare la posizione

```sql
UPDATE standings_calcio5
SET posizione = 2
WHERE id = 1;
```

### Incrementare statistiche (Campionato)

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

### Incrementare statistiche (Coppa)

```sql
-- Incrementare punti coppa
UPDATE standings_calcio5
SET punti_coppa = punti_coppa + 3
WHERE squadra = 'Nome Squadra' AND serie = 'A' AND girone = 'A';

-- Incrementare vittorie e partite giocate coppa
UPDATE standings_calcio5
SET 
    vittorie_coppa = vittorie_coppa + 1,
    giocate_coppa = giocate_coppa + 1
WHERE squadra = 'Nome Squadra' AND serie = 'A' AND girone = 'A';
```

---

## 🏆 Classifica Calcio 7

### Aggiornare statistiche di una squadra (Campionato)

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

### Aggiornare statistiche di una squadra (Coppa)

```sql
UPDATE standings_calcio7
SET 
    posizione_coppa = 2,
    punti_coppa = 9,
    giocate_coppa = 3,
    vittorie_coppa = 3,
    pareggi_coppa = 0,
    sconfitte_coppa = 0,
    reti_fatte_coppa = 12,
    reti_subite_coppa = 5,
    ammonizioni_coppa = 3,
    espulsioni_coppa = 1
WHERE squadra = 'Nome Squadra' AND serie = 'A' AND girone = 'B';
```

### Incrementare statistiche (Campionato)

```sql
-- Incrementare punti
UPDATE standings_calcio7
SET punti = punti + 3
WHERE squadra = 'Nome Squadra' AND serie = 'A';
```

### Incrementare statistiche (Coppa)

```sql
-- Incrementare punti coppa
UPDATE standings_calcio7
SET punti_coppa = punti_coppa + 3
WHERE squadra = 'Nome Squadra' AND serie = 'A' AND girone = 'A';
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
WHERE giocatore = 'Nome Giocatore' AND squadra = 'Nome Squadra' AND serie = 'A';
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
WHERE giocatore = 'Nome Giocatore' AND squadra = 'Nome Squadra' AND serie = 'A';
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
WHERE id = 'uuid-del-highlight'::uuid;
```

### Impostare come featured

```sql
UPDATE highlights
SET featured = true
WHERE id = 'uuid-del-highlight'::uuid;
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
WHERE id = 'uuid-del-highlight'::uuid;
```

### Cambiare categoria

```sql
UPDATE highlights
SET category = 'calcio7'
WHERE id = 'uuid-del-highlight'::uuid;
```

---

## 🔧 Query Utili Avanzate

### Ricalcolare le posizioni in classifica (Calcio 5 - Campionato)

```sql
WITH ranked AS (
    SELECT 
        id, 
        ROW_NUMBER() OVER (
            PARTITION BY serie 
            ORDER BY punti DESC, (reti_fatte - reti_subite) DESC, reti_fatte DESC
        ) as new_pos
    FROM standings_calcio5
    WHERE serie IS NOT NULL
)
UPDATE standings_calcio5 s
SET posizione = r.new_pos
FROM ranked r
WHERE s.id = r.id;
```

### Ricalcolare le posizioni in classifica (Calcio 5 - Coppa)

```sql
WITH ranked AS (
    SELECT 
        id, 
        ROW_NUMBER() OVER (
            PARTITION BY girone 
            ORDER BY punti_coppa DESC, (reti_fatte_coppa - reti_subite_coppa) DESC, reti_fatte_coppa DESC
        ) as new_pos
    FROM standings_calcio5
    WHERE girone IS NOT NULL
)
UPDATE standings_calcio5 s
SET posizione_coppa = r.new_pos
FROM ranked r
WHERE s.id = r.id;
```

### Ricalcolare le posizioni in classifica (Calcio 7 - Campionato)

```sql
WITH ranked AS (
    SELECT 
        id, 
        ROW_NUMBER() OVER (
            PARTITION BY serie 
            ORDER BY punti DESC, (reti_fatte - reti_subite) DESC, reti_fatte DESC
        ) as new_pos
    FROM standings_calcio7
    WHERE serie IS NOT NULL
)
UPDATE standings_calcio7 s
SET posizione = r.new_pos
FROM ranked r
WHERE s.id = r.id;
```

### Ricalcolare le posizioni in classifica (Calcio 7 - Coppa)

```sql
WITH ranked AS (
    SELECT 
        id, 
        ROW_NUMBER() OVER (
            PARTITION BY girone 
            ORDER BY punti_coppa DESC, (reti_fatte_coppa - reti_subite_coppa) DESC, reti_fatte_coppa DESC
        ) as new_pos
    FROM standings_calcio7
    WHERE girone IS NOT NULL
)
UPDATE standings_calcio7 s
SET posizione_coppa = r.new_pos
FROM ranked r
WHERE s.id = r.id;
```

### Ricalcolare le posizioni capocannonieri (Calcio 5)

```sql
WITH ranked AS (
    SELECT 
        id, 
        ROW_NUMBER() OVER (
            PARTITION BY serie
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

### Aggiornare multiple squadre in una transazione (Campionato)

```sql
BEGIN;

-- Squadra vincente
UPDATE standings_calcio5
SET 
    punti = punti + 3,
    vittorie = vittorie + 1,
    giocate = giocate + 1,
    reti_fatte = reti_fatte + 3,
    reti_subite = reti_subite + 1
WHERE squadra = 'Squadra Vincente' AND serie = 'A';

-- Squadra perdente
UPDATE standings_calcio5
SET 
    sconfitte = sconfitte + 1,
    giocate = giocate + 1,
    reti_fatte = reti_fatte + 1,
    reti_subite = reti_subite + 3
WHERE squadra = 'Squadra Perdente' AND serie = 'A';

COMMIT;
```

### Aggiornare multiple squadre in una transazione (Coppa)

```sql
BEGIN;

-- Squadra vincente
UPDATE standings_calcio5
SET 
    punti_coppa = punti_coppa + 3,
    vittorie_coppa = vittorie_coppa + 1,
    giocate_coppa = giocate_coppa + 1,
    reti_fatte_coppa = reti_fatte_coppa + 3,
    reti_subite_coppa = reti_subite_coppa + 1
WHERE squadra = 'Squadra Vincente' AND serie = 'A' AND girone = 'A';

-- Squadra perdente
UPDATE standings_calcio5
SET 
    sconfitte_coppa = sconfitte_coppa + 1,
    giocate_coppa = giocate_coppa + 1,
    reti_fatte_coppa = reti_fatte_coppa + 1,
    reti_subite_coppa = reti_subite_coppa + 3
WHERE squadra = 'Squadra Perdente' AND serie = 'A' AND girone = 'A';

COMMIT;
```

---

## 📝 Esempi di Uso Combinato

### Aggiornare risultato partita e statistiche squadre (Campionato)

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
WHERE squadra = 'Squadra Casa' AND serie = 'A';

-- Aggiorna la squadra perdente
UPDATE standings_calcio5
SET 
    sconfitte = sconfitte + 1,
    giocate = giocate + 1,
    reti_fatte = reti_fatte + 1,
    reti_subite = reti_subite + 3
WHERE squadra = 'Squadra Trasferta' AND serie = 'A';

COMMIT;
```

### Gestire un pareggio (Campionato)

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
WHERE squadra IN ('Squadra Casa', 'Squadra Trasferta') AND serie = 'A';

COMMIT;
```

### Aggiornare risultato partita e statistiche squadre (Coppa)

```sql
BEGIN;

-- Aggiorna il risultato della partita
UPDATE calendario_calcio5
SET risultato = '4-2'
WHERE id = 1 AND tipo_competizione = 'coppa';

-- Aggiorna la squadra vincente
UPDATE standings_calcio5
SET 
    punti_coppa = punti_coppa + 3,
    vittorie_coppa = vittorie_coppa + 1,
    giocate_coppa = giocate_coppa + 1,
    reti_fatte_coppa = reti_fatte_coppa + 4,
    reti_subite_coppa = reti_subite_coppa + 2
WHERE squadra = 'Squadra Casa' AND serie = 'A' AND girone = 'A';

-- Aggiorna la squadra perdente
UPDATE standings_calcio5
SET 
    sconfitte_coppa = sconfitte_coppa + 1,
    giocate_coppa = giocate_coppa + 1,
    reti_fatte_coppa = reti_fatte_coppa + 2,
    reti_subite_coppa = reti_subite_coppa + 4
WHERE squadra = 'Squadra Trasferta' AND serie = 'A' AND girone = 'A';

COMMIT;
```

---

## 🔍 Query di Verifica

### Verificare una squadra (Campionato)

```sql
SELECT * FROM standings_calcio5
WHERE squadra = 'Nome Squadra' AND serie = 'A';
```

### Verificare una squadra (Coppa)

```sql
SELECT * FROM standings_calcio5
WHERE squadra = 'Nome Squadra' AND serie = 'A' AND girone = 'A';
```

### Verificare un giocatore

```sql
SELECT * FROM capocannonieri_calcio5
WHERE giocatore = 'Nome Giocatore' AND serie = 'A';
```

### Verificare partite di una giornata

```sql
SELECT * FROM calendario_calcio5
WHERE giornata = 5
ORDER BY data, ora;
```

### Verificare partite di coppa per fase

```sql
SELECT * FROM calendario_calcio5
WHERE tipo_competizione = 'coppa' AND fase_coppa = 'Quarti di Finale'
ORDER BY data, ora;
```

---

## ⚠️ Note Importanti

1. **Sempre usare WHERE**: Non dimenticare mai la clausola `WHERE` per evitare di aggiornare tutte le righe
2. **Last Update**: Il campo `last_update` si aggiorna automaticamente con `now()`
3. **Testing**: Testa sempre le query su dati di test prima di usarle in produzione
4. **Backup**: Fai sempre un backup prima di operazioni massive
5. **Transazioni**: Usa `BEGIN` e `COMMIT` per operazioni multiple correlate
6. **UUID**: Per la tabella highlights, ricorda che l'id è un UUID, non un integer. Usa il cast `::uuid` quando necessario
7. **Serie**: La tabella `capocannonieri_calcio5` ha il campo `serie` con default 'A', ricordati di includerlo nelle WHERE
8. **Coppa vs Campionato**: Le tabelle standings hanno campi separati per campionato e coppa. Assicurati di aggiornare i campi corretti
9. **Girone**: Il campo `girone` è presente in entrambe le tabelle standings e calendario, utile per gestire i gironi della coppa
10. **Tipo Competizione**: Il campo `tipo_competizione` nel calendario ha default 'campionato', specificarlo quando è 'coppa'

---

## 🎯 Best Practices

### 1. Usa transazioni per operazioni correlate
Quando aggiorni più tabelle che dipendono l'una dall'altra (es. risultato partita + classifica), usa sempre transazioni.

### 2. Verifica prima di aggiornare
```sql
-- Prima verifica
SELECT * FROM standings_calcio5 WHERE squadra = 'Nome Squadra';

-- Poi aggiorna
UPDATE standings_calcio5 SET punti = punti + 3 WHERE squadra = 'Nome Squadra';

-- Infine verifica di nuovo
SELECT * FROM standings_calcio5 WHERE squadra = 'Nome Squadra';
```

### 3. Gestisci campionato e coppa separatamente
Non confondere i campi del campionato con quelli della coppa. Sono sistemi di punteggio separati.

### 4. Ricalcola le posizioni dopo aggiornamenti massivi
Dopo aver aggiornato i punti di più squadre, ricalcola sempre le posizioni con le query avanzate fornite sopra.
