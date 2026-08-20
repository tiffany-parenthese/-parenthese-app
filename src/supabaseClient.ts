import { createClient } from '@supabase/supabase-js';

// ─── Connexion à Supabase ──────────────────────────────────────────────────
// Ces deux valeurs ne sont PAS des secrets : elles sont conçues pour être
// visibles dans le code d'une app frontend. La vraie sécurité est assurée
// par les règles "Row Level Security" configurées dans la base de données.

const supabaseUrl = 'https://mjmirwkfcjhqjlfxctrl.supabase.co';
const supabaseKey = 'sb_publishable_PwHpivHx_VmouHcwUFgD5w_UbjY30T6';

export const supabase = createClient(supabaseUrl, supabaseKey);
