import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'awac-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit {

  // URL
  private readonly _avatarUrl = new BehaviorSubject<string>('');
  readonly avatarUrl$ = this._avatarUrl.asObservable().pipe(
    distinctUntilChanged(),
    map(url => `${url}?${(new Date()).getTime()}`)
  );

  get avatarUrl(): string {
    return this._avatarUrl.getValue()!;
  }

  @Input()
  set avatarUrl(value: string | null) {
    this._avatarUrl.next(value || '')
  }

  showImg$ = this.avatarUrl$.pipe(
    map(value => value != null)
  )

  constructor() { }

  ngOnInit(): void {
  }

}
