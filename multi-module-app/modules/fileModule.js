const fs = require('fs').promises;
const path = require('path');

const fileModule = {
  readFile: async (filename) => {
    try {
      const data = await fs.readFile(path.join(__dirname, '..', filename), 'utf8');
      return data;
    } catch (err) {
      console.error('Error reading file:', err);
      throw err;
    }
  },

  writeFile: async (filename, data) => {
    try {
      await fs.writeFile(path.join(__dirname, '..', filename), data, 'utf8');
      console.log(`Data written to file: ${filename}`);
    } catch (err) {
      console.error('Error writing file:', err);
      throw err;
    }
  },
};

module.exports = fileModule;
