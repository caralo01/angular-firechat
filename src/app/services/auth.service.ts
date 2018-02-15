import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Router } from "@angular/router";

@Injectable()
export class AuthService {


  public usuario:any = {};

  constructor(private afAuth: AngularFireAuth,  private router: Router) { 
  	this.afAuth.authState.subscribe(user => {
  		if( !user){
  			this.router.navigate(['/login']);
  			return;
  		}
  		else{
  			console.log(user);
  			this.usuario.nombre = user.displayName;
  			this.usuario.uid = user.uid;
  			this.router.navigate(['/chat']);

  		}
  	});
  }

  login(proveedor:string) {
  	if(proveedor === "google"){
    	this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    else if(proveedor === "facebook"){
    	this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    } 
  }
  logout() {
    this.afAuth.auth.signOut();
    this.usuario = {};
  }

  isAuthenticated(){
  	return this.afAuth.auth.currentUser != null ? true : false;
  }

}
