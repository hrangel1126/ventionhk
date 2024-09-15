import { Component, ElementRef, Input, ViewChild, type OnInit,Injectable, PLATFORM_ID, afterNextRender, inject, Injector} from '@angular/core';
import { CommonModule, NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';




@Component({
    selector: 'app-speach',
    standalone: true,
    templateUrl:'./Result.component.html',
    styleUrls: ['./Result.component.scss'],
 
    imports: [NgIf,CommonModule, NgFor, FormsModule, CommonModule,MatFormFieldModule, MatSelectModule, MatInputModule, TextFieldModule],
  
  })
export class ResultsComponent  implements OnInit {
    show?:boolean = false;
    currentsaved:any[]=[];
    loading:boolean = true;
    ngOnInit():void {
        this.getsaved();

    }

// retrive data
    getsaved(){

        let newObject:any = localStorage.getItem("ReqData");
        console.log('new ', newObject);
        if(newObject == null){
            this.show = true;
            return
        }

        this.currentsaved.push(JSON.parse(newObject));
        console.log( 'initia ', this.currentsaved[0].ReqData);
        // this.loading = false;
        }

        viewreq(idenx:any){
               window.location.href = `/results?filter=${idenx}`;
        }
}