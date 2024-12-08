import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/firebase/auth.service';
import { FirestoreService } from 'src/app/firebase/firestore.service';
import { users } from 'src/app/models/User.models';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userData: users = {
    nombre: '',
    apellido:'',
    email: '',

  };
  registerForm!: FormGroup;

  error: string = '';
  password: string = '';
  confPassword: string = '';

  constructor(
    private fb:FormBuilder,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Register page initialized');
  this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confPassword: ['', [Validators.required]],
    },
  {
    validators: this.passwordMatchValidator
  });


    console.log(this.registerForm); // Verifica si el formulario se ha inicializado

  }
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confPassword = control.get('confPassword');

    return password && confPassword && password.value === confPassword.value
      ? null
      : { passwordMismatch: true };
  }
  async registerUser() {
    if(this.registerForm.valid){   try {
      console.log('Iniciando registro de usuario...');
      const userCredential = await this.authService.Registrar(this.userData.email, this.password);
      const uid = userCredential.user?.uid;

      if (uid) {
        console.log('Usuario registrado en Firebase Authentication, UID:', uid);
        const { nombre, apellido, email } = this.userData;
        await this.firestoreService.createUser(uid, { nombre, apellido, email });
        console.log('Datos de usuario guardados en Firestore');
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Error durante el registro:');
    }}
  }


}
