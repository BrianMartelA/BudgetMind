import { FirestoreService } from './../../firebase/firestore.service';
import { Firestore } from '@angular/fire/firestore/public_api';
import { AuthService } from './../../firebase/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  error: string = '';
  constructor(private authService:AuthService,private FirestoreService:FirestoreService,private router:Router,)
  {
    this.error ='';
  }



  ngOnInit():void {
    console.log('login');
  }


  async ingreso(){
    try{
      const userCredential = await this.authService.login(this.email,this.password);

      const uid = userCredential.user?.uid;

      const  userData = await this.FirestoreService.getUser(uid);
      console.log(userData);
      console.log('Paso 1: Login exitoso', userCredential);
      console.log('Paso 2: Datos de usuario:', userData);

      this.router.navigate(['/hub']);


    }
    catch(error){
      console.error('Error al iniciar sesión:', error);
      this.error = this.authService.generarError(error)
    }



}

}
