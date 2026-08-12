const fs = require('fs').promises;
const path = require('path');
const { logger} = require("./logger");

async function listDir(dirPath) {
  try {
    const logfiles = [ ];
    const files = await fs.readdir(dirPath);
    const statPromises = files.map(async (file) => {
      const fullPath = path.join(dirPath, file);
      const stats = await fs.stat(fullPath);

      if (stats.isFile() && file.startsWith("gateway_logfile.")) {
        logfiles.push(`${file}`);
      }
    });
    await Promise.all(statPromises);
    return logfiles;
  } catch (err) {
    console.error("Error reading directory:", err);
    logger.error(`Error reading directory: ${err}`);
  }
}

module.exports = listDir;
