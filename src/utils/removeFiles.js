const fs = require("fs").promises;

async function removeFiles(path) {
  try {
    let fileExists = false;

    await fs.access(path);
    fileExists = true;

    if (fileExists) {
      await fs.unlink(path);
      console.log("deleted old path.");
    }
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = removeFiles;
