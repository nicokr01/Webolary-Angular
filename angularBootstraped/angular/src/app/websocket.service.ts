import { Injectable } from '@angular/core';
import { log } from 'console';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {
  private socket: WebSocket | null = null;
  private readonly url: string = 'wss://api.webolary.com:8080';

  constructor(private cookieService: CookieService) { 
    // Establish Websocket connection
    this.connect();
  }

  private connect(): void {
    if (this.socket === null) {
      this.socket = new WebSocket(this.url);

      this.socket.onopen = () => {
        console.log('Webolary Live Services Connection established');
        this.socket?.send("My Token:"+this.cookieService.get('username'));
      };

      this.socket.onmessage = (event) => {
        console.log('Message from server', event.data);
        var msg = event.data;

        if(event.data.match('lock screen')){
          var token = event.data.split(':')[1];
          if(token == this.cookieService.get('username')){
            location.href = '/Bierpause';
          }
          else{
            location.href = '/Bierpause';
          }
        }
      };

      this.socket.onclose = () => {
        console.log('WebSocket connection closed, reconnecting...');
        this.socket = null;
        setTimeout(() => this.connect(), 100); // Attempt to reconnect every second
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error', error);
      };
    }
  }

  sendMessage(message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error('WebSocket is not open');
    }
  }

  closeConnection(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}