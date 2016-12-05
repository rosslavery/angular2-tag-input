import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'rl-tag-input-item',
  templateUrl: './tag-input-item.component.html',
  styleUrls: ['./tag-input-item.component.css']
})
export class TagInputItemComponent {
  @Input() selected: boolean;
  @Input() text: string;
  @Input() index: number;
  @Output() tagRemoved: EventEmitter<number> = new EventEmitter<number>();
  // @HostBinding('class.ng2-tag-input-item-selected') 'selected === true';

  constructor() { }

  removeTag(): void {
    this.tagRemoved.emit(this.index);
  }
}
