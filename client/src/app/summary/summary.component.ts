import { Component, OnInit, OnDestroy} from '@angular/core';
import { GoogleApiService, UserInfo } from '../google-api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SqlServiceService } from '../sql-service.service';
import { NewSearch, Summary, newEntry } from '../models';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  newSearch!:FormGroup
  userInfo?: UserInfo
  items!: newEntry[]
  itemsSub!: Subscription
  summarySub!: Subscription
  private page = 0;
  private limit = 20;
  private offset = 0;
  isPreviousDisabled = true;
  isNextDisabled = false;
  userEmail?: any;
  summary!: Summary
  paywave_total:String = "";
  buttonPressed: boolean = false;

  constructor (private fb: FormBuilder, private SqlService: SqlServiceService, public google: GoogleApiService) {
    google.userProfileSubject.subscribe ( info => {
      this.userInfo = info
  })
  }

  ngOnInit(): void {
    this.newSearch = this.fb.group({
	      start_date: this.fb.control<string>('2023-01-01'),
        end_date: this.fb.control<string>(this.dateToString(new Date())),
        user_email: new FormControl(this.userInfo?.info.email)
        })

    this.itemsSub = this.SqlService.GetItems.subscribe(
      data => this.items = data
    )

  }

  private dateToString(date : Date) {
    return "".concat(date.getFullYear().toString(), "-", (date.getMonth()+1).toString().padStart(2, "0"), "-", date.getDate().toString())
  }

  getItems(): void {
    const storageEmail = sessionStorage.getItem("user_email");
    this.newSearch.get("user_email")?.setValue(storageEmail);
    // this.userEmail = this.userInfo?.info?.email;
    // this.newSearch.get("user_email")?.setValue(this.userEmail);
    const newSearch = this.newSearch.value as NewSearch;
    console.log("email >>>" , newSearch);
    this.SqlService.getForm$(newSearch, this.limit, this.offset + (this.page * this.limit));
  }

  getSummary(): void {
  
    console.log("items >>" , this.items);
  }

  onPrevious() {
    console.log("previous");
    this.page = Math.max(0, this.page - 1)

    if (this.page <= 0 && !this.isPreviousDisabled) {
      this.isPreviousDisabled = true;
    }

    if(this.isNextDisabled) {
      this.isNextDisabled = false;
    }

    this.getItems();
  }

  onNext() {
    console.log("next");
    this.page++;
    console.log("length >>", this.items.length);
    if (this.isPreviousDisabled) {
      this.isPreviousDisabled = false;
    }

    if (this.items.length < this.limit && !this.isNextDisabled) {
      this.isNextDisabled = true;
    }


    this.getItems();
  }

  onDelete(idx: number) {
    const deleteIdx = this.items[idx].entry_id;
    const storageEmail = sessionStorage.getItem("user_email")!;
    this.newSearch.get("user_email")?.setValue(storageEmail);
    console.log("Deleting index:", deleteIdx);
    // this.SqlService.DeleteForm$(deleteIdx, storageEmail);
    
    this.SqlService.DeleteForm$(deleteIdx, storageEmail).subscribe(
      
      data => {
        console.log('Result:', data);
      }
      
    )
    alert("Entry has been deleted.")
  }

  findsum(){    
    this.buttonPressed = true;
    const storageEmail = sessionStorage.getItem("user_email");
    this.newSearch.get("user_email")?.setValue(storageEmail);
    const newSearch = this.newSearch.value as NewSearch;
    console.log("email >>>" , newSearch);
    // this.SqlService.getSum$(newSearch);

    this.SqlService.getSum$(newSearch).subscribe(
      x => this.paywave_total = x
    )
  } 
}
