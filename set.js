const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUo2dkRpSVpkcU5qMjJXcFJKT1FhallDeHpUUTY2MG9SZEJhNkxHMDFHWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYVIwdEdtNXUrUDFkNmk1V1JzdmVldUlMUlhOcFZrNE02L3BnWDBvalREOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0SzBjZ01uUTJkcUhQanJmVWs2SG01b0VxVnpwdmVBRS9pK25SSXFDMUVJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYU3o4MmZuTDFEWTkrSnVWTEZUS3dNU0RaOXljczdVK0lyNGJra2NlZlNvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlNdHFuVTk0S3YxTEx0MEQwMEZwOWVZQzMvTlE2Ylowb3hWQ3RxVkJFMms9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik43TW96RHkxWkppeWRaTkFla2c2clJ1OGxwaWUxbUpkdlRkVTVyTzFaaTg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkh0VUtaYmF4a2ltRUQzakgxVk9lNFRVVVBmZFFjZW9lbGJLUWNGSTkwWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibWpmMThUSmhSYW4rVDU2QVdVSWdnMWpVZHJGWnFYR3N5R0Z6UksyWmozND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkF4YXdjQjRLUXBRblM5b0Fpenlwc215V1Q1ZlNQdjZpZGJHK0tYVlFwNlo4TDRSbVJpcUNHK2ZXMi91SFo3TmVYK2YxelhTZmNxcUMxUmx0MEhJZGl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTYsImFkdlNlY3JldEtleSI6ImJQaysveGhaYlpGTXV6djhUL0tPZW1VQ2ZXUGJmaE1vd0JFUUhhL0l3K0E9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlNJTDFueXc1UWlxajYtU2xuU2V6MlEiLCJwaG9uZUlkIjoiODM2MWU4YjYtMjYyNC00ODkwLTg5MzgtNGY0ZmZkMDk2OGE2IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNJUnY3eERIMU1nYmYyckxCT2lRNWFYY2k1bz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5MXp1MjMxbTRsTTAySlFiMXJNdFNpVVRCclE9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMkNQQ1Y0RkQiLCJtZSI6eyJpZCI6Ijk0NzAzNTM2MjY5OjhAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09PK3FhSUdFUDJwekxjR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IldiVTljTXJKTjRNMG1RZHBSaVVEcXFXamZWeE9NKzdibGxyaHAzTERKejQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjBUZXZIeTFFRHVZOXlSVjFhdURQNUdHY01qTkNZNS96RU9SZ251dEoyRDFzTk55NGNCV2s2K2FYRXJNN2dNNnc4M3RCSG0yN3dGa3ZMNVc0VWU2SEJ3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJkS3FKZ1A0OTRQQzFDMDF3NXEzeHJPQ2lZNEdDUStqc0FoNkNvNTB4N25jWGxacEZQNjMzZVhSRWFzY01CZFFLVkozVFlaeGl6YVN6dlRaSk9TV01pdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0NzAzNTM2MjY5OjhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVm0xUFhES3lUZUROSmtIYVVZbEE2cWxvMzFjVGpQdTI1WmE0YWR5d3ljKyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNzIwNjY2NiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFPb0kifQ==',
    PREFIXES: (process.env.PREFIX || '').split('.').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254105915061",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
