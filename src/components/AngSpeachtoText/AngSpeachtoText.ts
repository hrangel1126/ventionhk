// Module Hebert Rangel

import { Component, ElementRef, Input, ViewChild, type OnInit, inject, Injector } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';

import { CommonModule, NgFor, NgIf } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { ToggleButtonComponent } from './toggle-button.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import Swal from 'sweetalert2' //external alert for beutifier
import { FormsModule } from '@angular/forms';
import { notice } from '.././../shared/shared';
declare var webkitSpeechRecognition:any;
declare var webkitSpeechGrammarList:any;
declare var document: Document;

declare var global:any;



@Component({
    selector: 'app-speach',
    standalone: true,
    templateUrl:'./AngSpeachtoText.html',
    styleUrls: ['./AngSpeachtoText.scss'],
  
  imports: [
    NgIf,
    CommonModule,
    NgFor,
    FormsModule,
    ToggleButtonComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    TextFieldModule,
  ],
})
export class AngSpeachtoText implements OnInit {
  @ViewChild('diagnostic') diagnostic!: ElementRef;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @ViewChild('speachtxt', { read: ElementRef }) speachtxt: ElementRef;

  // start listening animations vars
  countd: boolean = false;
  wave: boolean = false;
  save: boolean = true;

  // injector to resize the textarea
  private _injector = inject(Injector);
  // declare the speech synthesis
  vSearch: any;
  CanListening: boolean = false;
  synthesis = window.speechSynthesis;
  // listening results
  theScope: string = '';
  final_transcript: any;
  // listening vars to continue listening until end
  Listening_state = {
    listening: false,
  };
  // save local
  dbindex: number = 0;
  currentsaved: any[] = [];
  // Grammar to search for specific words in case some techs are not understood by speech recognition HR
  // also acronyms can be added for better understanding etc..
  word = [
    'finalize',
    'DevOps',
    'Angular',
    'Fintech',
    'React',
    'Pyhton',
    'Agile',
    'PMP',
    'MongoDB',
  ];
  grammar =
    '#JSGF V1.0; grammar itwords; public <itwords> = ' +
    this.word.join(' | ') +
    ' ;';

  private storageService = inject(StorageService);

  constructor() {
    if (typeof window === 'undefined') {
      global.window = {};
    }
  }
  ngOnInit(): void {
    // check if previous saved session to get new index
    this.getsaved();

    if ('webkitSpeechRecognition' in window) {
      this.CanListening = true;
      this.vSearch = new webkitSpeechRecognition();
    }
  }
  // toggle to use dictation speech recognition
  change(state: any) {
    if (state)
      Swal.fire({
        title: 'Begin listening?',
        text: 'System will take notes for you, to finish say finalize or press STOP button.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'continue',
      }).then((result) => {
        if (result.isConfirmed) {
          setTimeout(() => {
            this.countd = false;
            this.wave = true;
            this.Listening_state.listening = true;
            this.startListening();
          }, 3000);
          this.countd = true;
        }
      });
  }

  // start listening calling handler
  startListening() {
    // let voiceHandler = this.hiddenSearchHandler?.nativeElement;
    if (this.CanListening) {
      this.vSearch.continuous = true;
      this.vSearch.interimresults = true;
      this.vSearch.lang = 'en-US';
      this.vSearch.maxAlternatives = 1;
      let speechRecognitionList = new webkitSpeechGrammarList();
      speechRecognitionList.addFromString(this.grammar, 1);
      this.vSearch.grammars = speechRecognitionList;
      this.vSearch.start();
      this.vSearch.onresult = (e: any) => {
        console.log(e);
        // voiceHandler.value = e?.results[0][0]?.transcript;
        // this.results = e.results[0][0].transcript;
        // this.getResult();
        // console.log(this.final_transcript);
        this.vSearch.onerror = function (event: any) {
          this.diagnostic.textContent =
            'Error occurred in recognition: ' + event.error;
        };
        this.vSearch.stop();
      };
      this.speachtxt.nativeElement.value == 0
        ? (this.speachtxt.nativeElement.value = '')
        : (this.speachtxt.nativeElement.value = + ' ');
      this.vSearch.onresult = (result: any) => {
        let interim_transcript = '';
        console.log('undesrsta ', result.results);
        this.speachtxt.nativeElement.value +=
          result.results[result.results.length - 1][0].transcript + '\r\n';
        let x: string =
          result.results[result.results.length - 1][0].transcript;
        if (x.toLowerCase().search(/finalize/) !== -1) {
          console.log('Stopped listening per voice command');
          this.Listening_state.listening = false;
          this.vSearch.stop();
          this.wave = false;
          this.save = false;
          notice.set(true);

          console.log(this.save);
        }
      };
      this.vSearch.addEventListener('end', () => {
        console.log('Stopped checking');
        if (this.Listening_state.listening) {
          try {
            this.vSearch.start();
          } catch (error) {
            console.log('error ', error);
          }
        }
      });
    } else {
      Swal.fire({
        title: 'Begin listening?',
        text: "Your browser does not support voice recognition, you'll have to type or paste the scope",
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'continue',
      });
    }
  }
  // stop listening
  stopListening() {
    this.vSearch.stop();
    this.Listening_state.listening = false;
    this.wave = false;
    this.vSearch.onend = () => {
      if (!this.Listening_state.listening) {
        this.save = false;
        notice.set(true);

        console.log(this.save);

        console.log('Stopped listening per click');
      }
    };
  }

  // resize the textbox with the speech recognition results
  triggerResize() {
    // Wait for content to render, then trigger textarea resize.
    afterNextRender(
      () => {
        this.autosize.resizeToFitContent(true);
      },
      {
        injector: this._injector,
      }
    );
  }

  getsaved() {
    const newObject = this.storageService.getData();
    console.log(newObject);
    if (newObject) {
      this.currentsaved.push(newObject);
    }
  }
  // save to local storage tests
  //   saverequest(){
  //     var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');

  //         const ReqData = {
  //         id: this.currentsaved?.length,
  //         data: this.speachtxt.nativeElement.value,
  //         processed: true,
  //         timestamp:utc
  //     };
  //     this.currentsaved.push(ReqData);
  //     // Store the object into storage
  // localStorage.setItem("ReqData", JSON.stringify(ReqData));
  //   }
  // testsave(){
  //   let newObject:any = localStorage.getItem("ReqData");
  //   console.log(JSON.parse(newObject));
  // if(newObject == null){
  //   newObject = '{"ReqData":[]}';

  // }
  // var obj = JSON.parse(newObject);
  // obj['ReqData'].push({"teamId":"09","status":"pending"});
  // newObject = JSON.stringify(obj);
  // localStorage.setItem("ReqData", newObject);
  // }
  telo() {
    Swal.fire({
      title: 'Processing...',
      imageUrl: '/loading.gif',
      imageWidth: 300,
      imageHeight: 350,
      imageAlt: 'Processing...',
      showCancelButton: false,
      showConfirmButton: false,
    });
  }
  run() {
    if ((this.speachtxt.nativeElement.value || '').trim().length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Hmmmm...',
        text: 'We\'re sorry, but we cannot process empty requests',
      });

      return;
    }
    Swal.fire({
      title: 'Processing...',
      imageUrl: '/loading.gif',
      imageWidth: 300,
      imageHeight: 350,
      imageAlt: 'Processing...',
      showCancelButton: false,
      showConfirmButton: false,
    });
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcription: this.speachtxt.nativeElement.value }),
    };

    fetch('/api/analytics', options)
      .then((response) => {
        const fdata = response.json();
        console.log('priemr then ', fdata);
        return fdata;
      })
      .then((response) => {
        console.log('priemr sec ', response);

        let newObject: any = localStorage.getItem('ReqData');
        console.log(JSON.parse(newObject));
        if (newObject == null) {
          newObject = '{"ReqData":[]}';
        }
        var obj = JSON.parse(newObject);
        response.inquery = this.speachtxt.nativeElement.value;
        obj['ReqData'].push(response);
        newObject = JSON.stringify(obj);
        localStorage.setItem('ReqData', newObject);
        console.log(response);
        Swal.close();
        setTimeout(() => {
          window.location.href = '/results';
        }, 1000);
      })
      .catch((err) => {
        console.error(err);
        Swal.close();
      });
  }
}

