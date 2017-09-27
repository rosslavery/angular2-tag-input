import { Component } from '@angular/core';

@Component({
  selector: 'rl-demo-app',
  template: require('./app.component.html')
})
export class AppComponent {
  public tags = ['jill@yahoo.com', 'mary@gmail.com', 'bill@hotmail.com'];
  public tagRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
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
  
  private log(name, value) {
    console.log(name, value);
  }
}
