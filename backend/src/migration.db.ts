import { config as dotenvConfig } from "dotenv";
import { Liquibase, LiquibaseConfig } from "liquibase";

// Load environment variables from .env
dotenvConfig();

// Liquibase configuration
const liquibaseConfig: LiquibaseConfig = {
  changeLogFile: 'changelog/db.changelog.xml', // Path to the master changelog file
  url: process.env.DATABASE_URL as string,                 // PostgreSQL JDBC URL
  username: process.env.DB_USER as string,       // DB username
  password: process.env.DB_PASSWORD as string,       // DB password
  classpath: process.env.DB_CLASSPATH as string,     // Path to the PostgreSQL JDBC driver
};

const liquibase = new Liquibase(liquibaseConfig);

(async () => {
  try {
    console.log('Running Liquibase update...');
    await liquibase.update({}); // Apply database changes
    console.log('Database updated successfully!');
  } catch (error) {
    console.error('Error running Liquibase:', error);
  }
})();
