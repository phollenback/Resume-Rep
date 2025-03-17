import { db } from './index';
import { resumeTable } from './schema';

async function testConnection() {
  try {
    const result = await db.select().from(resumeTable);
    console.log('Resumes:', result);
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

testConnection(); 