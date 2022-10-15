import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'awac-side-menu-profile',
  templateUrl: './side-menu-profile.component.html',
  styleUrls: ['./side-menu-profile.component.scss']
})
export class SideMenuProfileComponent implements OnInit {

  @Input()
  avatarUrl: string | null = '';

  @Input()
  name: string | null = "Anonymous";

  @Input()
  darkMode: boolean | null = false;

  @Output()
  darkModeChanged = new EventEmitter<boolean>();

  @Output()
  logout = new EventEmitter<void>();

  @Output()
  showProfile = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  setDarkMode($event: any) {
    this.darkModeChanged.next($event.checked);
  }

  logoutClick() {
    this.logout.next();
  }
  
  showProfileClick() {
    this.showProfile.next();
  }

}
