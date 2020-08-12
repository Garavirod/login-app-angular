import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/User.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user: UserModel;
  constructor() { }

  ngOnInit() { 
    this.user = new UserModel();
    this.user.email = 'rodrigogarciaavila26@gmail.com';
    this.user.name = 'Rodrigo';
    this.user.password = 'garavirod14040';
  }

  sendData(form: NgForm) {
    if ( form.invalid) { return; }
    console.log(form);
  }
}
