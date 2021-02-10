import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/User.model';
import { map } from 'rxjs/operators';
import decode from 'jwt-decode';
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

    let today = new Date();
    today.setSeconds(3600);
  }

  private getToken() {
    this.userToken = (localStorage.getItem('token')) ? localStorage.getItem('token') : null;
  }


  private getTokenExpirationDate(): any{
    let token:any = decode(localStorage.getItem('token'));
    console.log("EL TOKEN ", token.exp);
    
    if(!token){
      return null;
    }
     let date = new Date(0);
     date.setUTCSeconds(token.exp);
     return date;
  }

  private isTokenExpired(){
    let expDate = this.getTokenExpirationDate();
    return expDate < new Date();
  }

  isLoggedIn(): boolean{
    this.getToken();
    return !!this.userToken && !this.isTokenExpired();
  }
}
