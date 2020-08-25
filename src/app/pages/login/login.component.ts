import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from '../../models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.user = new UserModel();
  }


  login(form: NgForm) {
    if (!form.invalid) {
      // Sweat allert
      Swal.fire(
        {
          allowOutsideClick: false,
          icon: 'info',
          text: 'Wait a moment, please',
        }
      );
      Swal.showLoading();

      console.log(form);
      this.auth.login(this.user).subscribe(res => {
        console.log("Successful");
        // Swal.close();

      }, (err) => {
        console.log("Error in credential try again", err.error.error.message);
        // Swal.fire(
        //   {
        //     allowOutsideClick: false,
        //     icon: 'info',
        //     text: 'Wait a moment, please',
        //   }
        // );
      });
    }

  }

}
