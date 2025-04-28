import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient)

  onSignUp(user:User){
    return this.http.post("http://localhost:3000/user", user)
  }

  onLogin(name:string, pass:string){
    return this.http.get<User[]>(`http://localhost:3000/user?email=${name}&password=${pass}`)
  }

  getUserbyId(id:any){
    return this.http.get<User>(`http://localhost:3000/user/${id}`)
  }

  constructor() { }
}
