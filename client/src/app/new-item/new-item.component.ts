
import { Component, Input, OnInit, Output, OnDestroy, SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import { Subject, Subscription, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleApiService, UserInfo } from '../google-api.service';
import { SqlServiceService } from '../sql-service.service';
import { newEntry } from '../models';



@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  newItem!:FormGroup
  itemsArray!: FormArray
  userInfo?: UserInfo
  user_email!: string
  newEntry!: newEntry
  newEntry1!: newEntry
  itemsSub!: Subscription

  constructor ( private fb: FormBuilder, private router: Router, public google: GoogleApiService, private SqlService: SqlServiceService) {
  }

  ngOnInit(): void {
  
    this.itemsArray = this.fb.array([]);
		this.newItem = this.fb.group({
	      payment: this.fb.control<string>('dbs-paywave', [Validators.required]),
        entry_date: this.fb.control<string>(this.dateToString(new Date())),
        location: this.fb.control<string>('test', [Validators.required]),
        user_email: new FormControl(this.userInfo?.info?.email),
        given_name: new FormControl(this.userInfo?.info?.given_name),
        family_name: new FormControl(this.userInfo?.info?.family_name),
        items:this.itemsArray
        })
    const grp = this.fb.group({
          item_name: this.fb.control<string>('Fried Rice', [Validators.required]),
          item_category: this.fb.control<string>('Food', [Validators.required]),
          item_quantity:this.fb.control<number>(1, [Validators.required]),
          item_price: this.fb.control<string>('8.88', [Validators.required, Validators.pattern(/^\d+(?:\.\d{0,2})?$/)] ),
          item_owner:this.fb.control<string>('Me', [Validators.required])
        })

      this.itemsArray.push(grp);

  }
  
  
  private dateToString(date : Date) {
    return "".concat(date.getFullYear().toString(), "-", (date.getMonth()+1).toString().padStart(2, "0"), "-", date.getDate().toString())
  }

  onAdd(): void {
    const grp = this.fb.group({
      item_name: this.fb.control<string>('Fried Rice', [Validators.required]),
      item_category: this.fb.control<string>('Entertainment', [Validators.required]),
      item_quantity:this.fb.control<number>(1, [Validators.required]),
      item_price: this.fb.control<string>('8.88', [Validators.required]),
      item_owner:this.fb.control<string>('Me', [Validators.required])
    })

    this.itemsArray.push(grp);
  }
  

  onDelete(idx: number) {
    this.itemsArray.removeAt(idx);
  }

  setUserData(): void {

  const storageEmail = sessionStorage.getItem("user_email");
  this.newItem.get("user_email")?.setValue(storageEmail);
  const userGivenName = sessionStorage.getItem("given_name");
  this.newItem.get("given_name")?.setValue(userGivenName);
  const userFamilyName = sessionStorage.getItem("family_name");
  this.newItem.get("family_name")?.setValue(userFamilyName);
  }

  processForm(): void {
    this.setUserData();
    this.newEntry1 = this.newItem.value as newEntry;
    console.log("string format>>>>", this.newEntry1);
    this.SqlService.postForm$(this.newEntry1)
    .pipe(map(x => x as newEntry))
    .subscribe(data => this.newEntry);
    console.log("string format>>>>", this.newEntry1);
}

  sendTelegram(idx: number): void {

      let api = new XMLHttpRequest();
      var token = process.env['NG_APP_TELEGRAM_TOKEN'];
      var chat_id = -973673192;
      var ownerString = this.newEntry1.items[idx].item_owner;
      var nameString = this.newEntry1.items[idx].item_name;
      var totalprice = this.newEntry1.items[idx].item_price * this.newEntry1.items[idx].item_quantity
      var photoUrl = 'https://alexnusiss.sgp1.digitaloceanspaces.com/QRcode.png';
      
      var my_text = `Dear ${ownerString}, Just a gentle reminder for you to transfer me back $${totalprice} for the ${nameString}. Thank you!`;
      var url = `https://api.telegram.org/bot${token}/sendPhoto?chat_id=${chat_id}&photo=${photoUrl}&caption=${my_text}`;
      api.open("GET", url, true);
      api.send();
      console.log("Message sent")

  }
  
}
