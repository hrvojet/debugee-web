import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[focusAfterRender]'
})
export class FocusAfterRenderDirective implements OnInit{

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.elementRef.nativeElement.focus();
  }

}
