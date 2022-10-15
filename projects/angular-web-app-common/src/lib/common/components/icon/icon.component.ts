import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'awac-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @HostBinding('class.awac-icon') iconClass = true;

  viewBox = "0 0 24 24"

  @Input()
  set name(value: string) {
    const tokens = value.split('/', 3);
    // console.log('tokens: ', tokens);
    if (tokens.length === 1) {
      this.iconType = this.ICON_TYPE_FONT;
      this.fontSet = '';
      this.fontIcon = tokens[0];
    } else {
      if (tokens[0] === 'svg') {
        this.iconType = this.ICON_TYPE_SVG;

        if (tokens.length === 2) {
          this.svgPath = tokens[1];
        }else if (tokens.length === 3) {
          this.viewBox = tokens[1];
          this.svgPath = tokens[2];
        }

      } else {
        this.iconType = this.ICON_TYPE_FONT;
        this.fontSet = tokens[0];
        this.fontIcon = tokens[1];
      }
    }
  }

  ICON_TYPE_FONT = 'font';
  ICON_TYPE_SVG = 'svg';

  iconType = this.ICON_TYPE_FONT;

  svgPath: string = '';
  fontSet: string = '';
  fontIcon: string = '';

  constructor() { }

  ngOnInit() {
    // console.log("hb-icon init")
  }

}
