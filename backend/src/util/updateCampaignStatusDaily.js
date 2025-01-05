import cron from 'node-cron';
import { sequelize } from '../db/sequelize.js';

cron.schedule('59 23 * * *', async () => {
  try {
    console.log('Cron job scheduled to update campaign status daily at midnight.');
    console.log('[CRON] Start to update campaign status...');
    
    const [updatedRows] = await sequelize.query(`
      UPDATE campaigns
      SET status = CASE
        WHEN CURRENT_DATE >= end_date THEN 'closed'
        ELSE 'open'
      END
      WHERE status != CASE
        WHEN CURRENT_DATE >= end_date THEN 'closed'
        ELSE 'open'
      END
    `);

    console.log(`[CRON] ${updatedRows.length} campaigns' status updated.`);
  } catch (err) {
    console.error('Error running cron job:', err);
  }
});