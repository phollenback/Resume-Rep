import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

// Create connection pool
const connectionPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Create drizzle instance
export const db = drizzle(connectionPool, { 
  schema,
  mode: 'default'
});

// Test connection
async function testConnection() {
  try {
    const connection = await connectionPool.getConnection();
    console.log('Successfully connected to the database');
    connection.release();
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw new Error('Database connection failed');
  }
}

// Run connection test
testConnection().catch(console.error); 