import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'toggle-button',
  standalone: true,
  template: `
    <input type="checkbox" id="toggle-button-checkbox"
     [(ngModel)]="checked" (change)="changed.emit($any($event.target)?.checked)">
    <label class="toggle-button-switch"  
      for="toggle-button-checkbox"></label>
    <div class="toggle-button-text">
      <div class="toggle-button-text-on">ON</div>
      <div class="toggle-button-text-off">OFF</div>
    </div>
  `,
  imports: [FormsModule],
  styles: [`
    :host {
      display: block;
      position: relative;
      width: 100px;
      height: 50px;
    }
    
    input[type="checkbox"] {
      display: none; 
    }

/* Circle inside the toggle button. Links with the hidden checkbox. */
    .toggle-button-switch {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 46px;
      height: 46px;
      background-color: #fff;
      border-radius: 100%;
      cursor: pointer;
      z-index: 100;
      transition: left 0.3s;
    }

/* background of toggle button */
    .toggle-button-text {
      overflow: hidden;
      background-color: #fc3164;
      border-radius: 25px;
      box-shadow: 2px 2px 5px 0 rgba(50, 50, 50, 0.75);
      transition: background-color 0.3s;
    }

   /* Text of the toggle button */
    .toggle-button-text-on,
    .toggle-button-text-off {
      float: left;
      width: 50%;
      height: 100%;
      line-height: 50px;
      font-family: Lato, sans-serif;
      font-weight: bold;
      color: #fff;
      text-align: center;
    }

/* If the checkbox is checked, move the circle inside the toggle button 52px to the right */
    input[type="checkbox"]:checked ~ .toggle-button-switch {
      left: 52px;
    }

/* Change the background color of the toggle button when the checkbox is checked */
    input[type="checkbox"]:checked ~ .toggle-button-text {
      background-color: #3dbf87;
    }
  `]
})
export class ToggleButtonComponent  {
  @Output() changed = new EventEmitter<any>();
  @Input() checked:boolean = false;
}
