/**
 * lib/db.js
 * ---------
 * MongoDB connection module using Mongoose.
 * Handles connection pooling, graceful reconnection, and shutdown.
 *
 * Usage:
 *   import connectDB from './db.js';
 *   await connectDB();
 */

import dns from 'dns';
import mongoose from 'mongoose';
import 'dotenv/config';

// ── DNS Fix for MongoDB Atlas SRV resolution ──────────────────────────────────
// Some environments (Windows, sandboxed networks) fail to resolve MongoDB's
// SRV records using the local DNS resolver. Force Node.js to use Google's
// public DNS servers which reliably support SRV record lookups.
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
// Also prefer IPv4 to avoid IPv6 lookup failures on Windows
dns.setDefaultResultOrder('ipv4first');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    '❌  MONGODB_URI is not defined. ' +
    'Please create a .env file at the project root with your Atlas connection string.\n' +
    'See .env.example for the correct format.'
  );
}

// Mongoose connection options (optimized for MongoDB Atlas)
const MONGOOSE_OPTIONS = {
  serverSelectionTimeoutMS: 30000, // Give Atlas 30s to respond
  socketTimeoutMS: 45000,          // Close sockets after 45s of inactivity
  family: 4,                       // Force IPv4 — avoids IPv6 DNS issues on Windows
  tls: true,                       // Explicitly enable TLS for Atlas
  retryWrites: true,
};

// Track connection state so we don't reconnect on every call
let isConnected = false;

/**
 * Connect to MongoDB Atlas via Mongoose.
 * Safe to call multiple times — only connects once.
 */
export async function connectDB() {
  if (isConnected) {
    return;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI, MONGOOSE_OPTIONS);
    isConnected = true;

    const { host, port, name } = conn.connection;
    console.log(`✅  MongoDB connected: ${host}:${port || 'Atlas'} → database: "${name}"`);
  } catch (error) {
    console.error('❌  MongoDB connection failed:', error.message);
    process.exit(1); // Exit process on connection failure — server can't run without DB
  }
}

// ── Mongoose event listeners ──────────────────────────────────────────────────

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️   MongoDB disconnected. Attempting to reconnect...');
  isConnected = false;
});

mongoose.connection.on('reconnected', () => {
  console.log('✅  MongoDB reconnected successfully.');
  isConnected = true;
});

mongoose.connection.on('error', (err) => {
  console.error('❌  MongoDB runtime error:', err.message);
});

// ── Graceful shutdown ─────────────────────────────────────────────────────────

async function gracefulShutdown(signal) {
  console.log(`\n🛑  ${signal} received — closing MongoDB connection...`);
  await mongoose.connection.close();
  console.log('✅  MongoDB connection closed. Exiting.');
  process.exit(0);
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'));   // Ctrl+C
process.on('SIGTERM', () => gracefulShutdown('SIGTERM')); // Docker / PM2 stop

export default connectDB;
