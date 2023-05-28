
import { Component, Input, OnInit, Output, OnDestroy, SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import { Subject, Subscription, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleApiService, UserInfo } from '../google-api.service';
import { SqlServiceService } from '../sql-service.service';
import { PersonalData, newEntry } from '../models';
import { OpenAiService } from '../open-ai.service';
import { MongoService } from '../mongo.service';


@Component({
  selector: 'app-advisor',
  templateUrl: './advisor.component.html',
  styleUrls: ['./advisor.component.css']
})
export class AdvisorComponent {


  newEntry!:FormGroup
  newEntry1!: PersonalData
  text?: string;
  updateDataSub!: Subscription
  response!: any;
  newResponse!: string;
  button: boolean = false
  userEmail!: any;
  formSub!: Subscription
  data!: PersonalData

  constructor ( private fb: FormBuilder, private router: Router, public google: GoogleApiService, private SqlService: SqlServiceService, private openAiService: OpenAiService, public mongoService: MongoService) {
  }

  ngOnInit(): void {
  
    
		this.newEntry = this.fb.group({
	      age: ['', Validators.required],
        gender: this.fb.control<string>('male', [Validators.required]),
        weight: ['', Validators.required],
        weight_goal: ['', Validators.required],
        period_weeks: ['', Validators.required],
        height: ['', Validators.required],
        diet: this.fb.control<string>('No Preference', [Validators.required]),
        workout_per_wk: ['', Validators.required],
        duration: ['', Validators.required],
        user_email: new FormControl()
        })

    this.updateDataSub = this.openAiService.updateData.subscribe(
          data => { this.response = data }
    )
    
    this.button = false;

    this.userEmail = sessionStorage.getItem("user_email");

    this.formSub = this.mongoService.getData(this.userEmail).subscribe(x => {
      this.newEntry.patchValue({
        age: x.age,
        gender: x.gender,
        weight: x.weight,
        weight_goal: x.weight_goal,
        period_weeks: x.period_weeks,
        height: x.height,
        diet: x.diet,
        workout_per_wk: x.workout_per_wk,
        duration: x.duration,
      })});
    
    
  }

  processForm(): void {

    const storageEmail = sessionStorage.getItem("user_email");
    this.newEntry.get("user_email")?.setValue(storageEmail);
    this.newEntry1 = this.newEntry.value as PersonalData;
    console.log(this.newEntry1)
    this.mongoService.postData(this.newEntry1).subscribe(data => data);
    alert("Info has been saved.")
  }
  
  getRecipe(): void {
    this.button = true;
    this.newEntry1 = this.newEntry.value as PersonalData;
    this.text = `i am a ${this.newEntry1.age} years old ${this.newEntry1.gender}. My weight is ${this.newEntry1.weight}kg and height is ${this.newEntry1.height}cm. My goal is to reach ${this.newEntry1.weight_goal}kg in ${this.newEntry1.period_weeks} weeks.
    My diet is ${this.newEntry1.diet}. I work out ${this.newEntry1.workout_per_wk} times a week for ${this.newEntry1.duration} minutes. Inform me on my recommended daily protein and calories intake. 
    Recommend me a recipe best suitable for me.`
    console.log(this.text);
    this.openAiService.getDataFromOpenAI(this.text!);
    
  }

  getWorkout(): void {
    this.button = true;
    this.newEntry1 = this.newEntry.value as PersonalData;
    this.text = `i am a ${this.newEntry1.age} years old ${this.newEntry1.gender}. My weight is ${this.newEntry1.weight}kg and height is ${this.newEntry1.height}cm. My goal is to reach ${this.newEntry1.weight_goal}kg in ${this.newEntry1.period_weeks} weeks.
    Design ${this.newEntry1.workout_per_wk} ${this.newEntry1.duration} minutes workout that is best suited for me.`
    console.log(this.text); 
    this.openAiService.getDataFromOpenAI(this.text!);
  }

}
