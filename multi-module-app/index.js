const fileModule = require('./modules/fileModule');
const dataModule = require('./modules/dataModule');

const inputFile = 'input.txt';
const outputFile = 'output.txt';

const runApp = async () => {
  try {
    const data = await fileModule.readFile(inputFile);
    console.log('Original Data:', data);

    const processedData = dataModule.processData(data);
    console.log('Processed Data:', processedData);

    await fileModule.writeFile(outputFile, processedData);
  } catch (err) {
    console.error('Error in application:', err);
  }
};

runApp();
