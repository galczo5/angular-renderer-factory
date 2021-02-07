import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  InjectionToken, Injector,
  OnDestroy,
  OnInit,
  PlatformRef,
  RendererFactory2
} from '@angular/core';
import {interval, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DomRendererFactory2WithLogger} from '../app/DomRendererFactory2WithLogger';

@Component({
  selector: 'app-automatic-counter',
  template: `
    app-automatic-counter {{ counter }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutomaticCounterComponent implements OnInit, OnDestroy {

  counter: number;

  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(readonly changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    interval(5000)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.counter = new Date().getTime();
        console.log('### automatic counter call');
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
