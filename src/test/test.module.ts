import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NestedCounterComponent} from './nested-counter.component';
import {CounterComponent} from './counter.component';
import {AutomaticCounterComponent} from './automatic-counter.component';

@NgModule({
  declarations: [NestedCounterComponent, CounterComponent, AutomaticCounterComponent],
  exports: [
    NestedCounterComponent,
    CounterComponent,
    AutomaticCounterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TestModule {
}
