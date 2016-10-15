import { Component } from '@angular/core';

@Component({
  selector: 'rl-demo-app',
  template: require('./app.component.html')
})
export class AppComponent {
  public tags = ['Car', 'Bus', 'Train'];
  public autocompleteTags = [];
  public autocompleteItems = [
    'Banana',
    'Orange',
    'Apple',
    'Pear',
    'Grape',
    'Potato',
    'Peach'
  ];
}
