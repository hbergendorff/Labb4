import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  credentials = {
    username: '',
    password: ''
  };
  isError = false;
  friends;

  constructor(protected authService: AuthService) {}

  login() {
    this.authService.login(this.credentials);
    this.credentials = {username: '', password: ''}
  }

  logout() {
    this.authService.logout();
    this.friends =  [];
  }

  testApi() {
    this.authService.getResource('/friends').subscribe((result) =>{
      this.friends = result.friends;
    }, (error) =>{
      console.log('error', error)
    })
  }

  validForm(){
    return this.credentials.username.length < 3 || this.credentials.password.length < 5
  }
}
