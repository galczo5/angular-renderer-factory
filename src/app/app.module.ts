import {BrowserModule, EventManager} from '@angular/platform-browser';
import {NgModule, RendererFactory2} from '@angular/core';

import { AppComponent } from './app.component';
import {TestModule} from '../test/test.module';
import {DomRendererFactory2WithLogger} from './DomRendererFactory2WithLogger';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        TestModule
    ],
  providers: [
    { provide: RendererFactory2, useClass: DomRendererFactory2WithLogger, deps: [EventManager] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
