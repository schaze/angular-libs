import { Directive, ViewContainerRef, TemplateRef, Input, OnInit } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngLet]'
})
export class NgLetDirective implements OnInit {
  private _context: NgLetContext = new NgLetContext();

  constructor(
      private _viewContainer: ViewContainerRef, private _templateRef: TemplateRef<NgLetContext>, ) {
  }

  @Input()
  set ngLet(value: any) { this._context.$implicit = this._context.ngLet = value; }

  ngOnInit() { this._viewContainer.createEmbeddedView(this._templateRef, this._context); }

}


export class NgLetContext {
  public $implicit: any = null;
  public ngLet: any = null;
}
