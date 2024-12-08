import { FirestoreService } from './../../firebase/firestore.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/firebase/auth.service';
import { budget } from 'src/app/models/Budget.models';
@Component({
  selector: 'app-hub',
  templateUrl: './hub.page.html',
  styleUrls: ['./hub.page.scss'],
})
export class HubPage implements OnInit {

user:any = {};
  constructor(private firestoreService:FirestoreService, private router:Router, private fb:FormBuilder,private authService: AuthService,) { }
  userUID: string = ''; // Almacena el UID del usuario.

  budgetForm!:FormGroup;
  ngOnInit() {
    console.log("Cargando pagina de presupuesto")
    this.authService.authState$.subscribe((userData) => {
      this.user = userData;
      this.userUID = userData?.uid;
      console.log(console.error());

    });

    this.budgetForm = this.fb.group({

      month: ['', Validators.required], // Agregar validadores si es necesario
      name: ['', Validators.required],
      value: [0, [Validators.required, Validators.min(0)]]
    })

}

userBudget:budget={
  name :'',
  value:0,
  month:''
};
  async addBudget(){
  if(this.budgetForm.valid){
    try{
      const {month,name,value} = this.userBudget;
      await this.firestoreService.CreateBudget(this.userUID,{month,name,value})
      console.log('created', this.userUID, this.userBudget)

    }
    catch{
      console.error('Error durante el registro:');


    }
  }

}
}
