// NOTE: File-based storage. Works for local dev only.
// Do NOT deploy this to Vercel/serverless as-is — the filesystem is read-only there.
// This is a temporary stand-in until MongoDB is connected (see future task).

import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

export async function readData(filename) {
  const filePath = path.join(DATA_DIR, filename);
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw);
}

export async function writeData(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}
