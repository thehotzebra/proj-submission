import { Injectable } from '@angular/core';
import { Component, Input, OnInit, Output, OnDestroy, SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subject, from, filter, map } from 'rxjs';
import { Configuration, OpenAIApi } from 'openai';
import { ResponseData } from './models';

import { environment } from '../environment.prod';


@Injectable({
  providedIn: 'root'
})
export class OpenAiService {

  

  readonly configuration = new Configuration({
    //replace OPENAI_API_KEY with the actual key
    apiKey: 'OPENAI_API_KEY'
  });
  readonly openai = new OpenAIApi(this.configuration);

  updateData = new Subject<any>();

  getDataFromOpenAI(text: string) {
    from(this.openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      max_tokens: 512
    })).pipe(
      filter(resp => !!resp && !!resp.data),
      map(resp => resp.data),
      filter((data: any) => data.choices && data.choices.length > 0 && data.choices[0].text),
      map(data => data.choices[0].text)
    ).subscribe(data => {
        this.updateData.next(data);
    });
  }
  constructor() { }
}
