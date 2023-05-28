import { Injectable } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin, 
  clientId: '761338588122-knfpj7dm1qifidv1njmqa4ldmnrhkatl.apps.googleusercontent.com', 
  scope: 'openid profile email'
}

export interface UserInfo {
  info: {
    email: string
    name: string
    given_name: string
    family_name: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  userProfileSubject = new Subject<UserInfo>();

  constructor(private readonly oAuthService: OAuthService) { 
    oAuthService.configure(oAuthConfig)
    oAuthService.logoutUrl = 'https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:4200';
    oAuthService.loadDiscoveryDocument().then( () => {
      oAuthService.tryLoginImplicitFlow().then( () => {
        if (!oAuthService.hasValidAccessToken()) {
          oAuthService.initLoginFlow()
        } else {
        oAuthService.loadUserProfile().then( (userProfile) => {
        this.userProfileSubject.next(userProfile as UserInfo);    
        console.log(JSON.stringify(userProfile))
        
        })
      }
      })
  })
}

  
isLoggedIn(): boolean {
  return this.oAuthService.hasValidAccessToken()
}

signOut() {
  this.oAuthService.logOut()
}

}
