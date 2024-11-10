const net = require('net');

const server = net.createServer((socket) => {
  console.log('New client connected');

  socket.on('data', (data) => {
    console.log(`Received: ${data}`);
    socket.write(`Echo: ${data}`);
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });

  socket.on('error', (err) => {
    console.error(`Error: ${err.message}`);
  });
});

server.listen(3000, () => {
  console.log('Server run on port 3000');
});
