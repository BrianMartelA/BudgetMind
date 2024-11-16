import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent  implements OnInit {

  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() type!: string;
  @Input() autocomplete!: string;
  @Input() icon!: string;

  constructor() { }

  ngOnInit() {}

}
