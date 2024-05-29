const WebSocket = require('ws');
const axios = require('axios');

const wss = new WebSocket.Server({ port: 3501 });

// Map zur Zuordnung von Verbindungsobjekten zu Tokens
const connectionTokens = new Map();

wss.on('connection', (ws) => {
    console.log('Ein neuer Client hat sich verbunden.');
    
    let token = "no token"; // Standard-Token

    ws.on('message', (message) => {
        if (typeof message !== 'string') {
            message = message.toString();
        }

        let cookie = "";
        if(message.includes('My token')){
            token = message.split(':')[1].trim();
            
            // Token der aktuellen Verbindung in der Map aktualisieren
            connectionTokens.set(ws, token);
            
            axios.get('https://api.webolary.com?liveUpdate=&token='+token)
                .then(response => {
                    console.log('API-Antwort erhalten:', response.data);
        
                    ws.send(`API-Antwort: ${JSON.stringify(response.data)}`);
                    if(response.status == 'success'){
                        console.log('WebolaryLive Services connection established');
                    }
                })
                .catch(error => {
                    ws.send('Connection Error \n Can not connect to Webolary Server :(');
                });           
        }
       
        console.log(message);
    });

    ws.on('close', () => {
        console.log('Ein Client hat die Verbindung geschlossen.');
        
        // Token der aktuellen Verbindung aus der Map entfernen
        const closedToken = connectionTokens.get(ws);
        connectionTokens.delete(ws);
        
        // API-Anfrage mit dem richtigen Token senden
        axios.get('https://api.webolary.com?liveUpdateClose=&token='+closedToken)
            .then(response => {
                console.log('request sent');
            })
            .catch(error => {
                console.error('Connection Error \n Can not connect to Webolary Server :(');
            });
    });

    ws.on('error', (error) => {
        console.error(`WebSocket-Fehler: ${error}`);
    });

    ws.send('Willkommen! Sie sind erfolgreich verbunden.');
});

console.log('WebSocket-Server is running ws://localhost:3501');
