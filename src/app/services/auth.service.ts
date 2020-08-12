import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyAlRNeAvqiZqEjAeMf5dE_6h9-J0gKrhAM';
  // Create new users
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  // Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  constructor(private http: HttpClient) {
  }

  logout() {  
  }
  
  login(user: UserModel) {

  }
  signup(user: UserModel) {
    const authData = {
      email : user.email,
      password: user.password,
      returnSecureToken : true
    };
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ this.apikey }`, authData );
  }
}
