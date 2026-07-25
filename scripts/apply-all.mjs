/**
 * apply-all.mjs  –  esegue tutte le modifiche al DB:
 *   1. Rimuove highlights esistenti (tabella + file storage)
 *   2. Carica le nuove foto/video dalla cartella Galleria/
 *   3. Inserisce i record in highlights
 */
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.join(__dirname, '..');
const GALLERIA  = path.join(ROOT, 'Galleria');
const BUCKET    = 'highlights';

const URL_SB = 'https://cxhshzqgvgivhfhydana.supabase.co';
const KEY_SB = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4aHNoenFndmdpdmhmaHlkYW5hIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTEzNDI2NSwiZXhwIjoyMDc0NzEwMjY1fQ.fGy3cjmVSBR3pYpjfIsbe8y6UoawH8KU_xtyFSf-Wjw';

const sb = createClient(URL_SB, KEY_SB);

// ── Metadati gallery (22 luglio 2026 – premiazione Tiki Taka / FC Lesmo) ──
const META = {
  'WhatsApp Image 2026-07-22 at 10.26.33.jpeg':        { titolo: 'Capocannoniere del Torneo',               descrizione: 'Il miglior marcatore posa con il trofeo individuale accanto ai premi in palio, davanti al banner ASD DIMM.', featured: true  },
  'WhatsApp Image 2026-07-22 at 10.26.33 (1).jpeg':    { titolo: 'Foto di gruppo – Premiazione',            descrizione: 'Cinque protagonisti posano sorridenti con il trofeo conquistato nella serata finale davanti al logo ASD DIMM.', featured: true  },
  'WhatsApp Image 2026-07-22 at 10.26.34.jpeg':        { titolo: 'Clase Azul – Podio',                      descrizione: 'La squadra Clase Azul esulta con il trofeo conquistato al termine della competizione ASD DIMM.', featured: true  },
  'WhatsApp Image 2026-07-22 at 10.26.34 (1).jpeg':    { titolo: 'Squadra con trofeo',                      descrizione: 'Una delle squadre finaliste festeggia con il trofeo nella serata di premiazione.', featured: false },
  'WhatsApp Image 2026-07-22 at 10.26.34 (2).jpeg':    { titolo: 'Premiazione individuale',                 descrizione: 'Riconoscimento individuale durante la cerimonia finale ASD DIMM del 22 luglio 2026.', featured: false },
  'WhatsApp Image 2026-07-22 at 10.26.34 (3).jpeg':    { titolo: 'Premiazione – Torneo ASD DIMM',           descrizione: 'Consegna dei premi individuali durante la cerimonia conclusiva del torneo.', featured: false },
  'WhatsApp Image 2026-07-22 at 10.26.34 (4).jpeg':    { titolo: 'Premiazione – Torneo ASD DIMM',           descrizione: 'Un premiato nella serata di chiusura: momento da incorniciare.', featured: false },
  'WhatsApp Image 2026-07-22 at 10.26.34 (5).jpeg':    { titolo: 'Premiazione – Torneo ASD DIMM',           descrizione: 'Cerimonia finale: consegna riconoscimenti ai protagonisti del torneo.', featured: false },
  'WhatsApp Image 2026-07-22 at 10.26.34 (6).jpeg':    { titolo: 'Premiazione – Torneo ASD DIMM',           descrizione: 'Serata di premi: un altro giocatore riceve il suo riconoscimento ufficiale.', featured: false },
  'WhatsApp Image 2026-07-22 at 10.26.34 (7).jpeg':    { titolo: 'Premiazione – Torneo ASD DIMM',           descrizione: 'Premiazione serale con i trofei in palio nel torneo ASD DIMM.', featured: false },
  'WhatsApp Image 2026-07-22 at 10.26.34 (8).jpeg':    { titolo: 'Premiazione – Torneo ASD DIMM',           descrizione: 'Ultimo momento della cerimonia: la serata si chiude con sorrisi e trofei.', featured: false },
  'WhatsApp Image 2026-07-22 at 10.26.35.jpeg':        { titolo: 'Premio Individuale',                      descrizione: 'Giocatore premiato durante la cerimonia conclusiva del torneo ASD DIMM, 22 luglio 2026.', featured: false },
  'WhatsApp Image 2026-07-22 at 10.26.49.jpeg':        { titolo: 'Raimon FC – Premiazione al Tiki Taka',    descrizione: 'Raimon FC riceve il trofeo nella serata finale al Tiki Taka di Lesmo, con le maglie ufficiali.', featured: true  },
  'WhatsApp Image 2026-07-22 at 10.26.49 (1).jpeg':    { titolo: 'Premiazione al FC Lesmo',                 descrizione: 'Momento della cerimonia di chiusura presso la struttura del FC Lesmo.', featured: false },
  'WhatsApp Image 2026-07-22 at 10.26.49 (2).jpeg':    { titolo: 'Premiazione al FC Lesmo',                 descrizione: 'Riconoscimento consegnato durante la serata conclusiva al FC Lesmo.', featured: false },
  'WhatsApp Image 2026-07-22 at 10.26.49 (3).jpeg':    { titolo: 'Premiazione al FC Lesmo',                 descrizione: 'Un altro momento dell\'evento di premiazione finale presso il FC Lesmo.', featured: false },
  'WhatsApp Image 2026-07-22 at 10.26.49 (4).jpeg':    { titolo: 'Premiazione al FC Lesmo',                 descrizione: 'Serata di premi: un protagonista del torneo ritira il suo trofeo.', featured: false },
  'WhatsApp Image 2026-07-22 at 10.26.50.jpeg':        { titolo: 'Premio individuale – FC Lesmo',           descrizione: 'Giocatore premiato all\'esterno della sede del FC Lesmo: un sorriso e un trofeo meritato.', featured: false },
  'WhatsApp Image 2026-07-22 at 10.26.50 (1).jpeg':    { titolo: 'Premiazione – FC Lesmo',                  descrizione: 'Consegna dei premi individuali nella serata conclusiva del torneo al FC Lesmo.', featured: false },
  'WhatsApp Image 2026-07-22 at 10.26.50 (2).jpeg':    { titolo: 'Premiazione – FC Lesmo',                  descrizione: 'Riconoscimento individuale durante la cerimonia di chiusura del torneo ASD DIMM.', featured: false },
  'WhatsApp Image 2026-07-22 at 10.26.50 (3).jpeg':    { titolo: 'Premiazione – FC Lesmo',                  descrizione: 'Un altro premiato nella serata di chiusura del torneo al FC Lesmo.', featured: false },
  'WhatsApp Image 2026-07-22 at 10.26.51.jpeg':        { titolo: 'Premio al FC Lesmo',                      descrizione: 'Giocatore in posa con il trofeo individuale davanti all\'insegna ufficiale del FC Lesmo.', featured: false },
  'WhatsApp Image 2026-07-22 at 10.26.51 (1).jpeg':    { titolo: 'Premiazione serale – FC Lesmo',           descrizione: 'Cerimonia di premiazione notturna al FC Lesmo: il torneo si chiude con grandi emozioni.', featured: false },
  'WhatsApp Image 2026-07-22 at 10.26.51 (2).jpeg':    { titolo: 'Serata finale – FC Lesmo',                descrizione: 'L\'ultimo premiato della serata: una chiusura perfetta per il torneo ASD DIMM 2026.', featured: false },
  'WhatsApp Video 2026-07-22 at 10.26.37.mp4':         { titolo: 'Video – Cerimonia di Premiazione',        descrizione: 'Ripresa video della cerimonia di premiazione del torneo ASD DIMM, 22 luglio 2026.', featured: true  },
  'WhatsApp Video 2026-07-22 at 10.26.44.mp4':         { titolo: 'Video – Momenti del Torneo',              descrizione: 'Video con i momenti salienti della serata conclusiva del torneo ASD DIMM al Tiki Taka di Lesmo.', featured: false },
};

// ── Helpers ───────────────────────────────────────────────────────────────
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── STEP 1: Elimina tutti gli highlights esistenti (tabella) ─────────────
async function deleteOldHighlights() {
  console.log('\n🗑️  STEP 1 – Rimozione highlights esistenti dalla tabella...');
  const { data: existing, error: listErr } = await sb.from('highlights').select('id');
  if (listErr) { console.warn('  ⚠️  Impossibile leggere highlights:', listErr.message); return; }
  if (!existing?.length) { console.log('  ✅ Nessun highlight da rimuovere.'); return; }

  const ids = existing.map(h => h.id);
  const { error: delErr } = await sb.from('highlights').delete().in('id', ids);
  if (delErr) {
    console.error('  ❌ DELETE fallito (RLS?):', delErr.message);
    console.log('  ℹ️  Serve la Service Role Key per eliminare i record. Continuo con l\'upload...');
  } else {
    console.log(`  ✅ ${ids.length} highlights rimossi.`);
  }
}

// ── STEP 2 + 3: Carica file e inserisce record ────────────────────────────
async function uploadAndInsert() {
  console.log('\n📤 STEP 2+3 – Upload file + inserimento record highlights...');
  const files = fs.readdirSync(GALLERIA).filter(f => !f.startsWith('.'));
  let ok = 0, fail = 0;

  for (const filename of files) {
    const meta = META[filename];
    if (!meta) { console.log(`  ⏭️  Skip: ${filename}`); continue; }

    const ext     = path.extname(filename).toLowerCase();
    const isVideo = ['.mp4','.mov','.avi','.webm'].includes(ext);
    const mime    = isVideo ? 'video/mp4' : 'image/jpeg';
    const safe    = filename.replace(/\s+/g,'_').replace(/[()]/g,'');
    const storagePath = `gallery/${safe}`;

    // Upload
    const buf = fs.readFileSync(path.join(GALLERIA, filename));
    const { error: upErr } = await sb.storage.from(BUCKET)
      .upload(storagePath, buf, { contentType: mime, upsert: true });

    if (upErr) {
      console.error(`  ❌ Upload [${filename}]: ${upErr.message}`);
      fail++; continue;
    }

    const { data: urlData } = sb.storage.from(BUCKET).getPublicUrl(storagePath);

    // Insert
    const { error: insErr } = await sb.from('highlights').insert({
      titolo:       meta.titolo,
      descrizione:  meta.descrizione,
      file_type:    isVideo ? 'video' : 'image',
      category:     null,
      featured:     meta.featured,
      url:          urlData.publicUrl,
      upload_date:  '2026-07-22T10:00:00+00:00',
    });

    if (insErr) {
      console.error(`  ❌ Insert [${filename}]: ${insErr.message}`);
      fail++;
    } else {
      console.log(`  ✅ ${meta.titolo}`);
      ok++;
    }
    await sleep(150);
  }
  return { ok, fail };
}

// ── Main ─────────────────────────────────────────────────────────────────
console.log('═'.repeat(55));
console.log('  ASD DIMM – Aggiornamento DB Highlights');
console.log('═'.repeat(55));

await deleteOldHighlights();
const { ok, fail } = await uploadAndInsert();

console.log('\n' + '═'.repeat(55));
console.log(`  Completato: ${ok} ok, ${fail} errori`);
if (fail > 0) console.log('  Nota: se vedi errori RLS, serve la Service Role Key.');
console.log('═'.repeat(55));
