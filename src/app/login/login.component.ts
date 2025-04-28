import { Component, inject } from '@angular/core';
import { User } from '../app.component';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isLogin = true;

  service = inject(UserService);
  router = inject(Router);

  onClick() {
    this.isLogin = !this.isLogin;
  }

  user: User = new User();

  onSignUp(userData: User) {
    this.service.onSignUp(userData).subscribe((res) => {
      if (res) {
        this.isLogin = true;
        this.user = new User();
        alert('User created successfully!');
      }
    });
  }

  onLogin(name: string, pass: string) {
    this.service.onLogin(name, pass).subscribe((res) => {
      if (res.length == 1) {
        if (res[0].email == 'vivekdudhatra13@gmail.com') {
          alert('Admin login success.');
          this.router.navigate(['/admin']);
        } else {
          alert('User login success.');
          this.router.navigate(['home']);
          localStorage.setItem('id', res[0].id);
        }
      }
    });
  }
}
