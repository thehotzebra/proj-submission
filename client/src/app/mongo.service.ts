import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonalData } from './models';
import { Observable, Subject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MongoService {

  GetData = new Subject<PersonalData>();

  private URL_POST = "/api/postData";
  private URL_GET = "/api/getData";
  constructor( private httpClient: HttpClient) { }

  public postData(data: PersonalData) {
    console.log(JSON.stringify(data));
    return this.httpClient.post(this.URL_POST, data);
  }

  public getData (user_email: string): Observable<PersonalData> {
    console.log("getData...");

    let params = new HttpParams()
                .append("user_email", user_email)

    return this.httpClient.get<PersonalData>(this.URL_GET, {params});
    //   firstValueFrom(this.httpClient.get<PersonalData>(this.URL_GET, {params}))
    //   .then(data => {
    //   const r = data as PersonalData;
    //   console.info("Review array: ", r);
    //   return r;
    // }).then(data => 
    //   this.GetData.next(data));

  }
}
