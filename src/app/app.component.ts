import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-nested-counter></app-nested-counter>
    <app-counter></app-counter>
    <app-automatic-counter></app-automatic-counter>
  `
})
export class AppComponent {
}
