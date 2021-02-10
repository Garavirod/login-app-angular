import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/User.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apikey = 'AIzaSyAlRNeAvqiZqEjAeMf5dE_6h9-J0gKrhAM';
  private userToken: string;
  // Create new users
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  // Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  constructor(private http: HttpClient) { 
    this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
  }

  login(user: UserModel) {
    const authData = {
      ...user,
      returnSecureToken: true
    };

    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apikey}`, authData)
      .pipe(
        map(res => {
          console.log("Inside map RSJX");
          this.saveToken(res['idToken']);
          return res;
        })
      );
  }
  signup(user: UserModel) {
    const authData = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    };
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apikey}`, authData)
    .pipe(
      map(res => {
        console.log("Inside map RSJX");
        this.saveToken(res['idToken']);
        return res;
      })
    );
  }

  private saveToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  private getToken() {
    this.userToken = (localStorage.getItem('token')) ? localStorage.getItem('token') : '';
  }

  isLoggedIn(): boolean{
    return (this.userToken.length > 2) ? true: false;
  }
}
