import { Component, inject } from '@angular/core';
import { BG_IMG_URL, LOGO_URL } from '../../constants/config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginServiceService } from '../../services/login.service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  bgUrl = BG_IMG_URL

  email!:string;
  password!:string;
  loginService = inject(LoginServiceService)
  router = inject(Router)
  toasterService=inject(ToastrService)

  ngOnInit(){
    if(this.loginService.isLoggedIn){
      this.router.navigateByUrl('/browse')

    }
  }

  
  onSubmit(){
    if(!this.email|| !this.password){
      this.toasterService.error('please provide email or password')
      return
    }
    this.loginService.login(this.email,this.password)
    this.toasterService.success('logged in sucessfully') 
    this.router.navigateByUrl('/browse')
    console.log('login details entered correctly',this.email,this.password)
  }
  
 
}
