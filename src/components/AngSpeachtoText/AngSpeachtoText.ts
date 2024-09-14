import { Component, ElementRef, Input, ViewChild, type OnInit,Injectable, PLATFORM_ID, Inject } from '@angular/core';

import { CommonModule, NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';

declare var webkitSpeechRecognition:any;
declare var global:any;



@Component({
    selector: 'app-speach',
    standalone: true,
    templateUrl:'./AngSpeachtoText.html',
    styleUrls: ['./AngSpeachtoText.scss'],
  
    imports: [NgIf,CommonModule, NgFor],
  
  })
export class AngSpeachtoText  implements OnInit {
    @ViewChild('diagnostic') diagnostic!: ElementRef;
  synthesis = window.speechSynthesis;
  results:any;
  constructor(){
    if (typeof window === 'undefined') {
        global.window = {}
    }
   }
  ngOnInit():void {
    console.log('speach test');

  }
  startListening() {
    // let voiceHandler = this.hiddenSearchHandler?.nativeElement;
    if ('webkitSpeechRecognition' in window) {
      const vSearch = new webkitSpeechRecognition();
      vSearch.continuous = true;
      vSearch.interimresults = true;
      vSearch.lang = 'en-US';
      vSearch.maxAlternatives = 1;
      vSearch.
      vSearch.start();
      vSearch.onresult = (e:any) => {
        console.log(e);
        // voiceHandler.value = e?.results[0][0]?.transcript;
        this.results = e.results[0][0].transcript;
        this.getResult();
        console.log(this.results);
        vSearch.onerror = function (event:any) {
            this.diagnostic.textContent = "Error occurred in recognition: " + event.error;
          };
        vSearch.stop();
      };
    } else {
      alert('Your browser does not support voice recognition!');
    }
 
  }
speak(){
let utterThis = new SpeechSynthesisUtterance("Hello I'm your assistant, can you please let me know your exprience in react, declare your past projects, what stack you yoused and process or fucntions");
// this.synth.speak(utterThis);

}
start(text?: string, rate = 1) {

    text = "Hello I'm your assistant, can you please let me know your exprience in react, declare your past projects, what stack you yoused and process or fucntions";
    const textToSpeech = new SpeechSynthesisUtterance(text);
    textToSpeech.lang = "en-EN";
    textToSpeech.text = text;
    textToSpeech.rate = rate;
    

    const voice = speechSynthesis.getVoices().filter((voice) => {
      return voice.name === "Google English";
    })[0];
    textToSpeech.voice = voice;

    this.synthesis.speak(textToSpeech);

  }
  getResult() {
    console.log(this.results);
  }
}

