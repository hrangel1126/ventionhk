import { Component, ElementRef, Input, ViewChild, type OnInit,Injectable, PLATFORM_ID, afterNextRender, inject, Injector} from '@angular/core';
import { CommonModule, NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { StorageService, RequestData } from '../../services/storage.service';

@Component({
    selector: 'app-speach',
    standalone: true,
    templateUrl:'./Result.component.html',
    styleUrls: ['./Result.component.scss'],
 
    imports: [NgIf,CommonModule, NgFor, FormsModule, CommonModule,MatFormFieldModule, MatSelectModule, MatInputModule, TextFieldModule],
  
  })
export class ResultsComponent  implements OnInit {
    show = false;
    currentsaved: RequestData[] = [];
    loading = true;

    constructor(private storageService: StorageService) {}

    ngOnInit(): void {
        this.getsaved();
    }

    getsaved() {
        this.storageService.getData().subscribe(
            (data) => {
                if (data && data.ReqData.length > 0) {
                    this.currentsaved = data.ReqData;
                    this.show = false;
                } else {
                    this.show = true;
                }
                this.loading = false;
            },
            (error) => {
                console.error('Error fetching data:', error);
                this.show = true;
                this.loading = false;
            }
        );
    }

    viewreq(idenx:any){
               window.location.href = `/results?filter=${idenx}`;
        }
}