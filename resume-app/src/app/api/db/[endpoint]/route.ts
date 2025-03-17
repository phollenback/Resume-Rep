import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface RouteContext {
  params: {
    endpoint: string;
  }
}

export async function POST(request: Request, context: RouteContext) {
  try {
    const endpoint = context.params.endpoint;
    const body = await request.json();
    
    // Use the appropriate Supabase method based on the endpoint
    let result;
    if (endpoint === 'select') {
      const { data, error } = await supabase
        .from(body.table)
        .select(body.columns || '*');
      
      if (error) throw error;
      result = data;
    } else if (endpoint === 'insert') {
      const { data, error } = await supabase
        .from(body.table)
        .insert(body.values)
        .select();
      
      if (error) throw error;
      result = data;
    } else if (endpoint === 'update') {
      const { data, error } = await supabase
        .from(body.table)
        .update(body.values)
        .match(body.where)
        .select();
      
      if (error) throw error;
      result = data;
    } else if (endpoint === 'delete') {
      const { data, error } = await supabase
        .from(body.table)
        .delete()
        .match(body.where)
        .select();
      
      if (error) throw error;
      result = data;
    } else {
      return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 });
    }
    
    return NextResponse.json(result);
  } catch (err) {
    console.error('Database error:', err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
} 