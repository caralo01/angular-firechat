import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';

import { Mensaje } from '../../interfaces/mensaje.interface'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

	mensaje:string = "";
	elemento:any;

  constructor(private _cs:ChatService, 
              private _authService: AuthService) { 
  	this._cs.cargarMensajes().subscribe(() => {
  		setTimeout(() => {
  			this.elemento.scrollTop = this.elemento.scrollHeight;
  		}, 200);
  	})
  }

  ngOnInit() {
  	this.elemento = document.getElementById('app-mensajes');
  }

  enviarMensaje(){
  	if(this.mensaje.length == 0){
  		return;
  	}
  	this._cs.agregarMensaje(this.mensaje)
  			.then(() => {
  				console.log("Mensaje enviado");
  				this.mensaje = "";
  			})
  			.catch( (error) => console.error("Error al enviar mensaje", error));
  }

  salir(){
    this._authService.logout();
  }

}
