import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
/* Local */
import { UserModel } from '../../models/User.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel = new UserModel();
  rememberme = false;
  constructor(private auth: AuthService, private router : Router ) { }

  ngOnInit() {
    const recoveredemail: any = localStorage.getItem('emailLogin');
    if(recoveredemail){
      this.user.email = recoveredemail;
      this.rememberme = true;
    }
  }


  login(form: NgForm) {
    //Valida if form is not valid
    if (form.invalid) {return;}
      console.log(form);
      // Valid credentials
      this.auth.login(this.user).subscribe(res => {
        alert(`User was authenticated`);
        this.router.navigateByUrl('/home'); // rediredct to
        if(this.rememberme){
          localStorage.setItem('emailLogin', this.user.email);
        }
      }, (err) => {
        console.log("Error in credential try again", err.error.error.message);
        alert(`Error on authentication ${err.error.error.message}`);
      });
  }

}
