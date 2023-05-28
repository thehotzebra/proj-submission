import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, firstValueFrom, map } from 'rxjs';
import { NewSearch, Summary, newEntry } from './models';


@Injectable({
  providedIn: 'root'
})
export class SqlServiceService {

  constructor(private httpClient: HttpClient) { }

  private POST_URL = "/api/new02"
  private GET_URL = "/api/items"
  private GET_SUM_URL = "/api/itemsum"
  private DELETE_URL = "/api/delete"
  
  GetItems = new Subject<newEntry[]>();
  GetSummary = new Subject<Summary[]>();

  public postForm$(newEntry: newEntry) {
    return this.httpClient.post(this.POST_URL, newEntry);
  }

  public getForm$(newSearch: NewSearch, limit: number, offset: number) {

    const params = new HttpParams()
    .set('user_email', newSearch.user_email)
    .set('start_date', newSearch.start_date)
    .set('end_date', newSearch.end_date)
    .append("offset", offset)
    .append("limit", limit)

    firstValueFrom(this.httpClient.get<newEntry[]>(this.GET_URL, {params}))
      .then(data => {
      const r = data as newEntry[];
      console.info("Review array: ", r);
      return r;
    }).then(data => 
      this.GetItems.next(data));
  }

  public getSum$(newSearch: NewSearch):Observable<any> {

    const params = new HttpParams()
    .set('user_email', newSearch.user_email)
    .set('start_date', newSearch.start_date)
    .set('end_date', newSearch.end_date)

    return this.httpClient.get<String>(this.GET_SUM_URL, {params}).pipe(
      map(response => response)
    )
    
  
  }

  public DeleteForm$(idx: number, storageEmail: string): Observable<any> {

    // const params = new HttpParams()
    // .append("user_email", storageEmail)
    // .append("idx", idx)
    
    const url = `/api/delete/${storageEmail}/${idx}`;
    console.log("idx: ", idx);

    return this.httpClient.delete(url,{responseType: 'text'});
  }
}
