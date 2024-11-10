// Import required modules
const fs = require('fs').promises;
const path = require('path');

// Use process.cwd() to get the current working directory
const currentDir = process.cwd(); 

// Function to read multiple files asynchronously
async function readFiles() {
  try {
    // Define file paths relative to the current working directory
    const files = [
      path.join(currentDir, 'data', 'file1.txt'),
      path.join(currentDir, 'data', 'file2.txt'),
      path.join(currentDir, 'data', 'file3.txt')
    ];

    // Use Promise.all to read all files in parallel
    const fileReadPromises = files.map(file => fs.readFile(file, 'utf8'));

    // Wait for all file reading to complete
    const fileContents = await Promise.all(fileReadPromises);

    // Print contents of each file
    fileContents.forEach((content, index) => {
      console.log(`Content of file${index + 1}:`);
      console.log(content);
      console.log('---'); // Just to separate the outputs
    });
  } catch (error) {
    // Handle any errors during the file reading process
    console.error('Error reading files:', error.message);
  }
}

// Call the function to read files
readFiles();
