import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/User.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user: UserModel;
  constructor(private auth: AuthService) { }

  ngOnInit() { 
    this.user = new UserModel();
    this.user.email = 'rodrigogarciaavila26@gmail.com';
    this.user.name = 'Rodrigo';
    this.user.password = '';
  }

  sendData(form: NgForm) {
    if ( form.invalid) { return; }
    this.auth.signup(this.user).subscribe(res => {
      console.log(res);
    }, (err)=>{
      console.log(err.error.error.message);
    });
  }
}
