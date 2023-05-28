import { Component, OnInit } from '@angular/core';
import { GoogleApiService, UserInfo } from './google-api.service';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'miniproj';

  userInfo?: UserInfo
  userInfoSub!: Subscription

  constructor (private fb: FormBuilder, private google: GoogleApiService) {
    this.userInfoSub = this.google.userProfileSubject.subscribe ( info => {
      this.userInfo = info
  })
  }

  ngOnInit(): void {
  }
  
  isLoggedIn(): boolean {
    
    return this.google.isLoggedIn()
  }
  
  logout() {
    return this.google.signOut()
  }
}


