

import { createClient } from '@supabase/supabase-js';

// !! IMPORTANTE !!
// Substitua as strings vazias abaixo pela URL e Chave Anônima do seu projeto Supabase.
// Você pode encontrá-las em: Project Settings > API
const supabaseUrl = 'https://ijotrtrjjmkqdycushon.supabase.co'; // COLE SUA URL AQUI
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlqb3RydHJqam1rcWR5Y3VzaG9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzNTcwNjUsImV4cCI6MjA3NjkzMzA2NX0.zhPWRWSMHRSl9g0WJ9_iUtKOCeadRhbKXNjErYRyJDg'; // COLE SUA CHAVE ANÔNIMA (ANON KEY) AQUI

// Cria o cliente Supabase SOMENTE se as credenciais existirem.
// Se não, exporta null para que o app possa lidar com isso sem travar.
const supabaseInstance = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const supabase = supabaseInstance;
