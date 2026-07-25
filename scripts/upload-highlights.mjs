/**
 * upload-highlights.mjs
 *
 * Carica i file dalla cartella Galleria/ su Supabase Storage,
 * inserisce i record nella tabella `highlights` ed elimina quelli vecchi.
 *
 * Setup:
 *   1. Crea il file .env.local nella root del progetto con:
 *        VITE_SUPABASE_URL=https://xxxx.supabase.co
 *        VITE_SUPABASE_SERVICE_KEY=eyJ...  (la Service Role Key, NON la anon key)
 *   2. Esegui:  node scripts/upload-highlights.mjs
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// ── Legge .env.local ──────────────────────────────────────────────────────
const envPath = path.join(ROOT, '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌  .env.local non trovato. Crealo con VITE_SUPABASE_URL e VITE_SUPABASE_SERVICE_KEY');
  process.exit(1);
}
const env = {};
fs.readFileSync(envPath, 'utf-8').split('\n').forEach(line => {
  const idx = line.indexOf('=');
  if (idx > 0) {
    const k = line.slice(0, idx).trim();
    const v = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    env[k] = v;
  }
});

const SUPABASE_URL = env.VITE_SUPABASE_URL;
const SUPABASE_KEY = env.VITE_SUPABASE_SERVICE_KEY || env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌  VITE_SUPABASE_URL o VITE_SUPABASE_SERVICE_KEY mancanti nel .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const GALLERIA = path.join(ROOT, 'Galleria');
const BUCKET = 'highlights';

// ── Metadati per ogni file ────────────────────────────────────────────────
const META = {
  'WhatsApp Image 2026-07-22 at 10.26.33.jpeg': {
    titolo: 'Capocannoniere del Torneo',
    descrizione: 'Il miglior marcatore posa con il trofeo individuale accanto ai premi in palio, davanti al banner ASD DIMM.',
    featured: true,
  },
  'WhatsApp Image 2026-07-22 at 10.26.33 (1).jpeg': {
    titolo: 'Foto di gruppo – Premiazione',
    descrizione: 'Cinque protagonisti posano sorridenti con il trofeo conquistato nella serata finale, davanti al logo ASD DIMM.',
    featured: true,
  },
  'WhatsApp Image 2026-07-22 at 10.26.34.jpeg': {
    titolo: 'Clase Azul – Podio',
    descrizione: 'La squadra Clase Azul esulta con il trofeo conquistato al termine della competizione ASD DIMM.',
    featured: true,
  },
  'WhatsApp Image 2026-07-22 at 10.26.34 (1).jpeg': {
    titolo: 'Squadra con trofeo – Cerimonia',
    descrizione: 'Una delle squadre del torneo festeggia con il trofeo nella serata di premiazione.',
    featured: false,
  },
  'WhatsApp Image 2026-07-22 at 10.26.34 (2).jpeg': {
    titolo: 'Premiazione individuale – Miglior Portiere',
    descrizione: 'Riconoscimento individuale per il miglior portiere nella cerimonia ASD DIMM del 22 luglio 2026.',
    featured: false,
  },
  'WhatsApp Image 2026-07-22 at 10.26.34 (3).jpeg': {
    titolo: 'Premiazione – Torneo ASD DIMM',
    descrizione: 'Consegna dei premi individuali durante la cerimonia conclusiva del torneo.',
    featured: false,
  },
  'WhatsApp Image 2026-07-22 at 10.26.34 (4).jpeg': {
    titolo: 'Premiazione – Torneo ASD DIMM',
    descrizione: 'Un altro premiato nella serata di chiusura: momento da incorniciare.',
    featured: false,
  },
  'WhatsApp Image 2026-07-22 at 10.26.34 (5).jpeg': {
    titolo: 'Premiazione – Torneo ASD DIMM',
    descrizione: 'Cerimonia finale: consegna riconoscimenti ai protagonisti del torneo.',
    featured: false,
  },
  'WhatsApp Image 2026-07-22 at 10.26.34 (6).jpeg': {
    titolo: 'Premiazione – Torneo ASD DIMM',
    descrizione: 'Serata di premi: un altro giocatore riceve il suo riconoscimento ufficiale.',
    featured: false,
  },
  'WhatsApp Image 2026-07-22 at 10.26.34 (7).jpeg': {
    titolo: 'Premiazione – Torneo ASD DIMM',
    descrizione: 'Premiazione serale con i trofei in palio nel torneo ASD DIMM.',
    featured: false,
  },
  'WhatsApp Image 2026-07-22 at 10.26.34 (8).jpeg': {
    titolo: 'Premiazione – Torneo ASD DIMM',
    descrizione: 'Ultimo momento della cerimonia: la serata si chiude con sorrisi e trofei.',
    featured: false,
  },
  'WhatsApp Image 2026-07-22 at 10.26.35.jpeg': {
    titolo: 'Premio Individuale',
    descrizione: 'Giocatore premiato durante la cerimonia conclusiva del torneo ASD DIMM, 22 luglio 2026.',
    featured: false,
  },
  'WhatsApp Image 2026-07-22 at 10.26.49.jpeg': {
    titolo: 'Raimon FC – Premiazione al Tiki Taka',
    descrizione: 'Raimon FC riceve il trofeo nella serata finale presso il Tiki Taka di Lesmo, con le maglie ufficiali della squadra.',
    featured: true,
  },
  'WhatsApp Image 2026-07-22 at 10.26.49 (1).jpeg': {
    titolo: 'Premiazione al FC Lesmo',
    descrizione: 'Momento della cerimonia di chiusura presso la struttura del FC Lesmo di Monza e Brianza.',
    featured: false,
  },
  'WhatsApp Image 2026-07-22 at 10.26.49 (2).jpeg': {
    titolo: 'Premiazione al FC Lesmo',
    descrizione: 'Riconoscimento consegnato durante la serata conclusiva al FC Lesmo.',
    featured: false,
  },
  'WhatsApp Image 2026-07-22 at 10.26.49 (3).jpeg': {
    titolo: 'Premiazione al FC Lesmo',
    descrizione: 'Un altro momento dell\'evento di premiazione finale presso il FC Lesmo.',
    featured: false,
  },
  'WhatsApp Image 2026-07-22 at 10.26.49 (4).jpeg': {
    titolo: 'Premiazione al FC Lesmo',
    descrizione: 'Serata di premi e celebrazioni: un protagonista del torneo ritira il suo trofeo.',
    featured: false,
  },
  'WhatsApp Image 2026-07-22 at 10.26.50.jpeg': {
    titolo: 'Premio Individuale – FC Lesmo',
    descrizione: 'Giocatore premiato all\'esterno della sede del FC Lesmo: un sorriso e un trofeo meritato.',
    featured: false,
  },
  'WhatsApp Image 2026-07-22 at 10.26.50 (1).jpeg': {
    titolo: 'Premiazione – FC Lesmo',
    descrizione: 'Consegna dei premi individuali nella serata conclusiva del torneo al FC Lesmo.',
    featured: false,
  },
  'WhatsApp Image 2026-07-22 at 10.26.50 (2).jpeg': {
    titolo: 'Premiazione – FC Lesmo',
    descrizione: 'Riconoscimento individuale durante la cerimonia di chiusura del torneo ASD DIMM.',
    featured: false,
  },
  'WhatsApp Image 2026-07-22 at 10.26.50 (3).jpeg': {
    titolo: 'Premiazione – FC Lesmo',
    descrizione: 'Un altro premiato nella serata di chiusura del torneo al FC Lesmo.',
    featured: false,
  },
  'WhatsApp Image 2026-07-22 at 10.26.51.jpeg': {
    titolo: 'Premio al FC Lesmo',
    descrizione: 'Giocatore in posa con il trofeo individuale davanti all\'insegna ufficiale del FC Lesmo.',
    featured: false,
  },
  'WhatsApp Image 2026-07-22 at 10.26.51 (1).jpeg': {
    titolo: 'Premiazione serale – FC Lesmo',
    descrizione: 'Cerimonia di premiazione notturna presso il FC Lesmo: il torneo si conclude con grandi emozioni.',
    featured: false,
  },
  'WhatsApp Image 2026-07-22 at 10.26.51 (2).jpeg': {
    titolo: 'Serata finale – FC Lesmo',
    descrizione: 'L\'ultimo premiato della serata: una chiusura perfetta per il torneo ASD DIMM 2026.',
    featured: false,
  },
  'WhatsApp Video 2026-07-22 at 10.26.37.mp4': {
    titolo: 'Video – Cerimonia di Premiazione',
    descrizione: 'Ripresa video della cerimonia di premiazione del torneo ASD DIMM, 22 luglio 2026.',
    featured: true,
  },
  'WhatsApp Video 2026-07-22 at 10.26.44.mp4': {
    titolo: 'Video – Momenti del Torneo',
    descrizione: 'Video con i momenti salienti della serata conclusiva del torneo ASD DIMM al Tiki Taka di Lesmo.',
    featured: false,
  },
};

// ── Funzione principale ───────────────────────────────────────────────────
async function main() {
  // 1. Elimina tutti gli highlights esistenti
  console.log('🗑️  Rimozione highlights esistenti...');
  const { error: delErr } = await supabase
    .from('highlights')
    .delete()
    .not('id', 'is', null);
  if (delErr) {
    console.warn('⚠️  Attenzione durante la rimozione:', delErr.message);
  } else {
    console.log('✅ Highlights precedenti rimossi.\n');
  }

  // 2. Carica i nuovi file
  const files = fs.readdirSync(GALLERIA).filter(f => !f.startsWith('.'));
  console.log(`📤 Caricamento di ${files.length} file su Supabase...\n`);

  let ok = 0, fail = 0;

  for (const filename of files) {
    const meta = META[filename];
    if (!meta) {
      console.log(`⏭️  Skip (metadato mancante): ${filename}`);
      continue;
    }

    const ext = path.extname(filename).toLowerCase();
    const isVideo = ['.mp4', '.mov', '.avi', '.webm'].includes(ext);
    const mimeType = isVideo ? 'video/mp4' : 'image/jpeg';
    const safeName = filename.replace(/\s+/g, '_').replace(/[()]/g, '');
    const storagePath = `gallery/${Date.now()}_${safeName}`;

    // Upload
    const fileBuffer = fs.readFileSync(path.join(GALLERIA, filename));
    const { error: upErr } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, fileBuffer, { contentType: mimeType, upsert: true });

    if (upErr) {
      console.error(`❌ Upload fallito [${filename}]: ${upErr.message}`);
      fail++;
      continue;
    }

    // URL pubblica
    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
    const publicUrl = urlData.publicUrl;

    // Inserimento record
    const { error: insErr } = await supabase.from('highlights').insert({
      titolo: meta.titolo,
      descrizione: meta.descrizione,
      file_type: isVideo ? 'video' : 'image',
      category: null,
      featured: meta.featured,
      url: publicUrl,
      upload_date: new Date('2026-07-22').toISOString(),
    });

    if (insErr) {
      console.error(`❌ Insert fallito [${filename}]: ${insErr.message}`);
      fail++;
    } else {
      console.log(`✅ ${meta.titolo}`);
      ok++;
    }

    // Piccola pausa per non sovraccaricare l'API
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`🎉 Completato: ${ok} caricati, ${fail} falliti.`);
  if (fail > 0) {
    console.log('   Controlla i messaggi di errore sopra.');
  }
}

main().catch(err => {
  console.error('Errore fatale:', err);
  process.exit(1);
});
