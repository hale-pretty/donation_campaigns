import fs from 'fs';
import { sequelize } from '../src/db/sequelize.js'; // Adjust path if needed

import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runMigration(file) {
  const filePath = resolve(__dirname, 'sql', file);
  const sql = fs.readFileSync(filePath, 'utf-8');

  try {
    await sequelize.query(sql);  // Execute the SQL query
    console.log(`Migration ${file} applied successfully.`);
  } catch (err) {
    console.error(`Error applying migration ${file}:`, err);
    throw err;
  }
}

async function runMigrations() {
  await sequelize.authenticate(); // Connect to the database
  const migrationFiles = fs.readdirSync(join(__dirname, 'sql'));

  for (const file of migrationFiles) {
    if (file.endsWith('.sql')) {
      await runMigration(file); // Run each migration
    }
  }

  await sequelize.close();
}

runMigrations();
