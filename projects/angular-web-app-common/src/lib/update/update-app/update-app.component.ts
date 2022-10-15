import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'hb-update-app',
  templateUrl: './update-app.component.html',
  styleUrls: ['./update-app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateAppComponent implements OnInit {

  constructor(private swUpdate: SwUpdate) { }

  ngOnInit() {
  }


  onClick() {
    this.swUpdate.activateUpdate().then(() => window.location.reload());
  }

}
