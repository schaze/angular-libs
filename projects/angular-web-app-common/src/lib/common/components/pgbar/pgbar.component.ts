import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'awac-pgbar',
  templateUrl: './pgbar.component.html',
  styleUrls: ['./pgbar.component.scss']
})
export class PGBarComponent implements OnInit {

  @Input()
  set min(value: number | null) {
    this.mMin = value || 0
  }
  mMin = 0

  @Input()
  set max(value: number | null) {
    this.mMax=value || 0;
  }
  mMax = 100

  @Input()
  set value(value: number | null) {
    this.mValue = value || 0;
    this.width = Math.floor((this.mValue -this.mMin) / (this.mMax - this.mMin) * 100)
    // console.log(this.mValue, this.mMin, this.mMax, this.width)
  }
  mValue = 0

  @Input('bar-color')
  set barColor(value: string | null) {
    this.color = value || 'pgb-blue'
    this.bgcolor = ''; // value+'-bg';
  }
  color = 'pgb-blue'
  bgcolor = 'pgb-blue-bg'

  public width = 30;

  constructor() {
    // console.log("PGBAR Constructor")
   }

  ngOnInit() {
    // console.log("Value: ", this.mValue)
  }

}
