require('dotenv').config();
const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: process.env.WS_PORT || 8001 })

wss.on('connection', ws => {
  console.log("Jalan di port : " + process.env.WS_PORT)
  ws.on('message', data => {
    console.log(data)
    wss.clients.forEach(client => {
      if (client!== ws && client.readyState === WebSocket.OPEN) {
      // if (client.readyState === WebSocket.OPEN) {
        console.log(data)
        client.send(data);
      }
    })
  })
})
