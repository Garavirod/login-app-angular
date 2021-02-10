import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
/* Local */
import { UserModel } from '../../models/User.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user: UserModel = new UserModel();
  rememberme = false;
  constructor(private auth: AuthService, 
              private router: Router) { }

  ngOnInit() {
    this.user.email = '';
    this.user.name = '';
    this.user.password = '';
  }

  sendData(form: NgForm) {
    // if form is invalid
    if ( form.invalid) { return; }
    // valid registration
    this.auth.signup(this.user).subscribe(res => {
      alert("User was register succesfully");
      this.router.navigateByUrl('/home'); // redirect to
      // sasve on storge rememeberme
      if(this.rememberme){
        localStorage.setItem('emailLogin', this.user.email);
      }
    }, (err)=>{
      alert(`User was not register ${err.error.error.message}`);
      console.log(err.error.error.message);
    });
  }
}
