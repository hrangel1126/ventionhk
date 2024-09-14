import { NgIf } from '@angular/common';
import { Component, Input,EventEmitter, type OnInit, Output  } from '@angular/core';
import Swal from 'sweetalert2' //external alert for beutifier
import type { Props,AstroGlobal } from 'astro';


interface AlertComponentProps {
    mensaje: string;
    icon: any;
    show: any;
  }
  
@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgIf],
  template: `
   <span *ngIf='showms' class="error-message"> <p>Error: Could not login. Please verify your credentials</p></span>
  `,
})


export class AlertComponent implements OnInit {
   constructor() {}
  
    showms:boolean = false;
    mierror:boolean = true;
    //inputs for component
    @Input() mensaje!:string;
    @Input() icon: any  = 'success';
    @Input() show?:boolean;
    @Output() logedin = new EventEmitter<boolean>();
   
    ngOnInit():void {
      console.log('error ', this.show);
      this.alerta();
    }
    
// emitter test with Astro
  emit(agreed: boolean) {
    this.logedin.emit(agreed);
  }
  
 //pretty error alert 
  alerta(){
    console.log('error ', this.show);
    if(this.show){
  
    Swal.fire({
        title: 'Error!',
        text: this.mensaje,
        icon: this.icon,
        confirmButtonText: 'OK'
      });
    }
  }
}  
