import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3Ynpla2x5dWRreG9zZmN0Ym9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3NDI0ODYsImV4cCI6MjA2MDMxODQ4Nn0.WKibqZQqz_YkSdgw4S2dCEpeE2fOF8uft97qWDRoPWo";
const supabaseAnonKey =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3Ynpla2x5dWRreG9zZmN0Ym9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3NDI0ODYsImV4cCI6MjA2MDMxODQ4Nn0.WKibqZQqz_YkSdgw4S2dCEpeE2fOF8uft97qWDRoPWo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// User profile types
export interface UserProfile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  investment_style: string;
  risk_tolerance: 'low' | 'medium' | 'high';
  created_at: string;
}

// Investment types
export interface Investment {
  id: string;
  user_id: string;
  symbol: string;
  name: string;
  amount: number;
  purchase_price: number;
  purchase_date: string;
  created_at: string;
}

// Financial goal types
export interface FinancialGoal {
  id: string;
  user_id: string;
  title: string;
  target_amount: number;
  current_amount: number;
  target_date: string;
  created_at: string;
}

// Functions to interact with Supabase
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data as UserProfile;
}

export async function getUserInvestments(userId: string) {
  const { data, error } = await supabase
    .from('investments')
    .select('*')
    .eq('user_id', userId);
  
  if (error) throw error;
  return data as Investment[];
}

export async function getUserGoals(userId: string) {
  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .eq('user_id', userId);
  
  if (error) throw error;
  return data as FinancialGoal[];
} 