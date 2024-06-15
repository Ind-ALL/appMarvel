import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(public ngFireAuth: AngularFireAuth) { }

  loginNoFirebase(email: string , password:string){
    return this.ngFireAuth.signInWithEmailAndPassword(email, password)
  }

  insereNoFirebase(email:string, password:string){
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password)
  }
}
