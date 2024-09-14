import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input, type OnInit } from '@angular/core';
import { OpenAiService } from '@/src/pages/api/ang.openai';
import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-openai',
  standalone: true,
  templateUrl:'./OpenAI.html',
  styleUrls: ['./OpenAI.scss'],

  imports: [NgIf,FormsModule, NgFor,CommonModule],
  providers: [OpenAiService],

})

export class OpenAIComponent implements OnInit{
promptText:any = '';
showSpinner:boolean =  true;
      requestData={
        model: 'text-davinci-003',
        prompt: this.promptText,
        temperature: 0.95,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stream: false
      }; 
    //           model: 'text-davinci-003',gpt-3.5-turbo'
    constructor(private myOAIService: OpenAiService){ }

    ngOnInit():void {
        console.log('OpenAI test');
 
      }

async chat(){
    
//    return await this.openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: [{"role": "user", "content": "Hello!"}],
//       });
    }
    //   apiResponse =  await this.openai.createCompletion(requestData);
GetAnswer(){
    this.showSpinner = true;
    console.log('run', this.promptText);
    OpenAiService
    this.myOAIService.ReqDataFromOpenAI(this.promptText).then((respose) =>{
        console.log('respose ', respose);
        this.showSpinner = false;

    })

}

}