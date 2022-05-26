import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''

  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  onLogin() {
    const { email, password } = this.user;
    this.authService.login(email, password).then(res => {
      console.log('se logeo --->', res);
      this.router.navigate(['/starships']);
    })
  }

  onLoginGoogle() {
    const { email, password } = this.user;
    this.authService.loginWithGoogle(email, password).then(res => {
      console.log('se logeo --->', res);
      this.router.navigate(['/starships']);
    })
  }


}
