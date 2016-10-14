import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'rl-tag-input-item',
  template: require('./tag-input-item.component.html'),
  styles: [require('./tag-input-item.component.scss').toString()]
})
export class TagInputItemComponent {
  @Input() selected: boolean;
  @Input() text: string;
  @Input() index: number;
  @Output() tagRemoved: EventEmitter<number> = new EventEmitter<number>();
  @HostBinding('class.ng2-tag-input-item-selected') 'selected === true';

  constructor() { }

  removeTag(): void {
    this.tagRemoved.emit(this.index);
  }
}
