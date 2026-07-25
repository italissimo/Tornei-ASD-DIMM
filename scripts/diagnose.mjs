/**
 * diagnose.mjs – legge il DB e stampa lo stato attuale
 */
import { createClient } from '@supabase/supabase-js';

const URL  = 'https://cxhshzqgvgivhfhydana.supabase.co';
const KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4aHNoenFndmdpdmhmaHlkYW5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzQyNjUsImV4cCI6MjA3NDcxMDI2NX0.n_I6GmVADFUE-4HZtQ9JZWx8_ildIW1gnLmXCPT37e4';
const sb   = createClient(URL, KEY);

async function q(label, table, filter) {
  let query = sb.from(table).select('*');
  if (filter) query = filter(query);
  const { data, error } = await query;
  console.log(`\n=== ${label} ===`);
  if (error) { console.error('ERRORE:', error.message); return; }
  console.log(`${data.length} righe`);
  if (data.length) console.log(JSON.stringify(data.slice(0, 5), null, 2));
}

await q('highlights (prime 5)',     'highlights',              q => q.limit(5));
await q('estivo c5 – eliminazione', 'calendario_estivo_calcio5',
        q => q.in('fase_coppa',['ottavi','quarti','semifinali','finale']));
await q('estivo c7 – eliminazione', 'calendario_estivo_calcio7',
        q => q.in('fase_coppa',['ottavi','quarti','semifinali','finale']));

// storage buckets
const { data: buckets } = await sb.storage.listBuckets();
console.log('\n=== Storage Buckets ===');
console.log(buckets?.map(b => b.name + (b.public?' (public)':' (private)')).join(', '));
