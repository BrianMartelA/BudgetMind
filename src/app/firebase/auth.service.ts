import { FirestoreService } from './firestore.service';
import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  User,
} from '@angular/fire/auth';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStateSubject = new BehaviorSubject<any>(null);
  authState$ = this.authStateSubject.asObservable();

  constructor(
    private afAuth: Auth,
    private FirestoreService: FirestoreService
  ) {
    onAuthStateChanged(this.afAuth, async (user) => {
      if (user) {
        const userData = await this.FirestoreService.getUser(user.uid);
        const fullUserData = {
          uid: user.uid,
          email: user.email,
          ...userData,
        };
        this.authStateSubject.next(fullUserData);
      } else {
        this.authStateSubject.next(null);
      }
    });
  }

  Registrar(email: string, password: string) {
    return createUserWithEmailAndPassword(this.afAuth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.afAuth, email, password);
  }

  logout() {
    return signOut(this.afAuth).then(() => {
      this.authStateSubject.next(null);
    });
  }

  getCurrentUser() {
    return this.authStateSubject.value;
  }

  generarError(tipo: any) {
    let error: string = '';
    // Verificar el código del error para personalizar el mensaje
    switch (tipo.code) {
      case 'auth/email-already-in-use':
        error = 'El correo electrónico ya está en uso';
        break;
      case 'auth/invalid-email':
        error = 'El correo electrónico no es válido';
        break;
      case 'auth/user-not-found':
        error = 'Usuario no encontrado';
        break;
      case 'auth/wrong-password':
        error = 'Contraseña incorrecta';
        break;
      case 'auth/network-request-failed':
        error = 'Error de red. Verifique su conexión a internet';
        break;
      case 'auth/invalid-credential':
        error = 'Credenciales inválidas';
        break;
      default:
        error = 'Error: ' + tipo.message;
    }

    return error;
  }
}
