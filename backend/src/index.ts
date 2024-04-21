import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

import { gameManager } from './gameManager';
const gamemanager = new gameManager()

wss.on('connection', function connection(ws) {
    gamemanager.addUser(ws)

    ws.on("disconnect",()=>{
        gamemanager.removeUser(ws)
    })
});