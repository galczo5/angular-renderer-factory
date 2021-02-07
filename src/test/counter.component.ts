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
  selector: 'app-counter',
  template: `
    <button (click)="changeDetectorRef.detectChanges()">Call detectChanges()</button>
    app-counter {{ counter }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnInit, OnDestroy {

  counter: number;

  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(readonly changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    interval(1000)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.counter = new Date().getTime();
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
