import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Mensaje } from '../interfaces/mensaje.interface';

import { AuthService } from "./auth.service";

@Injectable()
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];

  constructor(private afs: AngularFirestore, private _auth:AuthService) {
  }

  cargarMensajes(){
  	this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc')
  					.limit(5));

  	return this.itemsCollection.valueChanges() 
  				.map(mensajes => {
  					this.chats = [];
  					for(let mensaje of mensajes){
  						this.chats.unshift(mensaje);
  					}
  					return this.chats;
  				})
  }

  agregarMensaje(texto: string) {
    console.log(this._auth.usuario);

  	let mensaje: Mensaje = {
  		nombre: this._auth.usuario.nombre,
  		mensaje: texto,
  		fecha: new Date().getTime(),
      uid: this._auth.usuario.uid
  	}
    return this.itemsCollection.add(mensaje);
  }

}
