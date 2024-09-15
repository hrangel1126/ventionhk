// Module Hebert Rangel

import { Component, ElementRef, Input, ViewChild, type OnInit,Injectable, PLATFORM_ID, afterNextRender, inject, Injector} from '@angular/core';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';

import { CommonModule, NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { ToggleButtonComponent } from './toggle-button.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import Swal from 'sweetalert2' //external alert for beutifier
import { FormsModule } from '@angular/forms';

declare var webkitSpeechRecognition:any;
declare var webkitSpeechGrammarList:any;

declare var global:any;



@Component({
    selector: 'app-speach',
    standalone: true,
    templateUrl:'./AngSpeachtoText.html',
    styleUrls: ['./AngSpeachtoText.scss'],
  
    imports: [NgIf,CommonModule, NgFor, FormsModule, ToggleButtonComponent, CommonModule,MatFormFieldModule, MatSelectModule, MatInputModule, TextFieldModule],
  
  })
export class AngSpeachtoText  implements OnInit {
    @ViewChild('diagnostic') diagnostic!: ElementRef;
    @ViewChild('autosize') autosize: CdkTextareaAutosize;
    // start listening animations vars
  countd:boolean = false;
  wave:boolean = false;
  // injector to resize the textarea
    private _injector = inject(Injector);
    // delceare the speach synthesis
    vSearch: any;
    CanListening:boolean = false;
  synthesis = window.speechSynthesis;
  // listening results
  theScope:string = '';
  final_transcript:any;
  //listening vars to continue listening until end
  Listening_state = {
    listening: false
  }
  // Grammar to search for specific words incase some techs are not understaded by speach recognition HR
  // also achonyms can be added for better understanding atc..
  word = [ 'finalize' , 'DevOps' , 'Angular', 'Fintech', 'React', 'Pyhton', 'Agile', 'PMP', 'MongoDB' ];
  grammar = '#JSGF V1.0; grammar itwords; public <itwords> = ' + this.word.join(' | ') + ' ;'

  constructor(){
    if (typeof window === 'undefined') {
        global.window = {}
    }
   }
  ngOnInit():void {
    console.log('speach test');
    if ('webkitSpeechRecognition' in window) {
      this.CanListening = true;
      this.vSearch = new webkitSpeechRecognition();
    }

  }

  al(state:any){
    console.log('state ',state);
    if(state){

    }
  }
  change(state:any){
    if(state)
    Swal.fire({
      title: "Begin listening?",
      text: "System will take notes for you, to finish say finalize or press STOP button.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "continue"
    }).then((result) => {
      if (result.isConfirmed) {
        setTimeout(() => {
          this.countd = false;
          this.wave =true;
          this.Listening_state.listening = true;
          this.startListening();
        }, 3000);
        this.countd = true;
      }
    });
  }

  
  startListening() {
    // let voiceHandler = this.hiddenSearchHandler?.nativeElement;
    if ( this.CanListening ) {
      this.vSearch.continuous = true;
      this.vSearch.interimresults = true;
      this.vSearch.lang = 'en-US';
      this.vSearch.maxAlternatives = 1;
      let speechRecognitionList = new webkitSpeechGrammarList();
      speechRecognitionList.addFromString(this.grammar, 1);
      this.vSearch.grammars = speechRecognitionList;
      this.vSearch.start();
      this.vSearch.onresult = (e:any) => {
        console.log(e);
        // voiceHandler.value = e?.results[0][0]?.transcript;
        // this.results = e.results[0][0].transcript;
        // this.getResult();
        // console.log(this.final_transcript);
        this.vSearch.onerror = function (event:any) {
            this.diagnostic.textContent = "Error occurred in recognition: " + event.error;
          };
        this.vSearch.stop();
      };
      this.vSearch.onresult = (result:any) => {
        let interim_transcript = "";
        console.log('undesrsta ', result.results);
        // Loop through the results from the speech recognition object.
         this.final_transcript = '';
        // this.theScope += this.final_transcript;
        this.theScope += this.theScope;
        for (const res of result.results) {
           console.log('asdasd ', res[0].transcript);
          // this.final_transcript += res[0].transcript +'\r\n';
          this.final_transcript = res[0].transcript +'\r\n';

          

          // if (res.isFinal) {
          //       this.final_transcript = res[0].transcript +'\r\n';
          //       this.theScope = this.final_transcript
          //     } 
              // else {
              //   interim_transcript += res[0].transcript +'\r\n';
              // }
              let x:string = res[0].transcript;
             if(x.toLowerCase().search(/finalize/) !== -1){
              console.log("Stopped listening per voice command")
              this.Listening_state.listening = false;
              this.vSearch.stop();
              this.wave = false;
             }
        }
        this.theScope += this.final_transcript ;
        console.log('final ',  this.final_transcript );


    };
      this.vSearch.addEventListener('end', () => {
        console.log("Stopped checking")
        if(this.Listening_state.listening){
      try{
        this.vSearch.start();
      }catch(error){
        console.log('error ', error);
      }
        }
    });
    } else {
      Swal.fire({
        title: "Begin listening?",
        text: "Your browser does not support voice recognition, you'll have to type or paste the scope",
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "continue"
      })
    }
 
  }

  stopListening(){
    this.vSearch.stop();
    this.Listening_state.listening = false;
    this.wave = false;
   
    this.vSearch.onend = () => {
      if( !this.Listening_state.listening ){
      console.log("Stopped listening per click")
      }
    }
  }

  
speak(){
let utterThis = new SpeechSynthesisUtterance("Hello I'm your assistant, can you please let me know your exprience in react, declare your past projects, what stack you yoused and process or fucntions");
// this.synth.speak(utterThis);

}
// start(text?: string, rate = 1) {

//     text = "Hello I'm your assistant, can you please let me know your exprience in react, declare your past projects, what stack you yoused and process or fucntions";
//     const textToSpeech = new SpeechSynthesisUtterance(text);
//     textToSpeech.lang = "en-EN";
//     textToSpeech.text = text;
//     textToSpeech.rate = rate;
    

//     const voice = speechSynthesis.getVoices().filter((voice) => {
//       return voice.name === "Google English";
//     })[0];
//     textToSpeech.voice = voice;

//     this.synthesis.speak(textToSpeech);

//   }

  triggerResize() {
    // Wait for content to render, then trigger textarea resize.
    afterNextRender(
      () => {
        this.autosize.resizeToFitContent(true);
      },
      {
        injector: this._injector,
      },
    );
  }
}

