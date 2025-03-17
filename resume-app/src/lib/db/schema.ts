import { mysqlTable, serial, varchar, text, timestamp, mysqlEnum, int } from 'drizzle-orm/mysql-core';

export const resumeTable = mysqlTable('resumes', {
  id: serial('id').primaryKey(),
  clerkUserId: varchar('clerkUserId', { length: 255 }).notNull(),
  fileUrl: varchar('file_url', { length: 255 }).notNull(),
  positionTitle: varchar('position_title', { length: 255 }).notNull(),
  company: varchar('company', { length: 255 }),
  keywords: text('keywords'),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  progress: mysqlEnum('progress', [
    'applied', 
    'phone_screen',
    'technical_test',
    'interview_1',
    'interview_2',
    'offer_received',
    'hired'
  ]).default('applied'),
  completed: int('completed').default(0),
  points: int('points').default(0),
  details: text('details'),
});

export const usersTable = mysqlTable('users', {
  id: serial('id').primaryKey(),
  clerkUserId: varchar('clerk_user_id', { length: 255 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull(),
  totalPoints: int('total_points').default(0).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
}); 