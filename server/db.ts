/**
 * Database Connection Module
 * 
 * @module server/db
 * @description Establishes and exports the database connection for the application.
 * Uses Neon PostgreSQL with Drizzle ORM for database operations.
 * 
 * @requires @neondatabase/serverless
 * @requires drizzle-orm/neon-serverless
 * @requires ws
 * @requires @shared/schema
 */

import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure Neon database to use WebSockets
// This is required for serverless environments
neonConfig.webSocketConstructor = ws;

// Validate that the DATABASE_URL environment variable is set
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

/**
 * Connection pool for Neon PostgreSQL
 * Uses the DATABASE_URL environment variable for connection details
 */
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

/**
 * Drizzle ORM instance configured with the Neon connection pool
 * and the application schema for type-safe database operations
 */
export const db = drizzle({ client: pool, schema });
