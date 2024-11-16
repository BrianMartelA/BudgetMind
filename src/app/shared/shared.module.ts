import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';



@NgModule({
  declarations: [FooterComponent,HeaderComponent,FormComponent],
  imports: [
    CommonModule,
    IonicModule,ReactiveFormsModule,FormsModule
  ],
  exports: [FooterComponent,HeaderComponent,FormComponent,ReactiveFormsModule]
})
export class SharedModule { }
