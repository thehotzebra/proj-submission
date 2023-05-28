
import { Component, Input, OnInit, Output, OnDestroy, SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import { Subject, Subscription, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleApiService, UserInfo } from '../google-api.service';
import { SqlServiceService } from '../sql-service.service';
import { newEntry } from '../models';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  userInfoSub!: Subscription
  userInfo?: UserInfo

  constructor (private route: ActivatedRoute, private fb: FormBuilder, private router: Router, public google: GoogleApiService, private SqlService: SqlServiceService) {
    this.userInfoSub = this.google.userProfileSubject.subscribe ( info => {
      this.userInfo = info
  })
  }

  ngOnInit(): void {
  }

  newEntry(): void {
    const user_email = JSON.stringify(this.userInfo?.info?.email);
    const googleEmail = user_email.replace(/\"/g, "");
    const user_givenName = JSON.stringify(this.userInfo?.info?.given_name);
    const googleGivenName = user_givenName.replace(/\"/g, "");
    const user_FamilyName = JSON.stringify(this.userInfo?.info?.family_name);
    const googleFamilyName = user_FamilyName.replace(/\"/g, "");
    sessionStorage.setItem("user_email", googleEmail);
    sessionStorage.setItem("given_name", googleGivenName);
    sessionStorage.setItem("family_name", googleFamilyName);
    this.router.navigate(["/newitem"])
  
  }

}
