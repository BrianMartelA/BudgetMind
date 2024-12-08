import { Injectable } from '@angular/core';
import { doc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, getDoc, setDoc } from '@firebase/firestore';
import { users } from '../models/User.models';
import { budget } from '../models/Budget.models';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {





  constructor(private firestore:Firestore) {}

  createUser(uid:string,userData:users){
    const userDocRef = doc(this.firestore,`users/${uid}`);
    return setDoc(userDocRef,userData)
  };

  CreateBudget(uid:string,budgetData:budget){
    const budgetDocRef = doc(this.firestore,`budget/${uid}`);
    return setDoc(budgetDocRef,budgetData)
  };

  async getUser(uid:string){
    const userDocRef = doc(this.firestore,`users/${uid}`);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists()?userDoc.data() :null;
  };
}
