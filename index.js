import cron from 'node-cron';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Function to perform the backup
const backupDatabase = async ()=> {
    try {
        console.log('Starting database backup...');
        const backupCommand = 'mongodump --uri="mongodb://localhost:27017/mydatabase" --out=/path/to/backup';

        const { stdout, stderr } = await execAsync(backupCommand);

        if (stdout) console.log(`Backup stdout: ${stdout}`);
        if (stderr) console.error(`Backup stderr: ${stderr}`);

        console.log('Database backup completed successfully.');
    } catch (error) {
        console.error(`Backup failed: ${error.message}`);
    }
};

// Schedule the backup job
cron.schedule('0 2 * * *', () => {
    console.log('Running scheduled database backup at 2:00 AM');
    backupDatabase();
});
