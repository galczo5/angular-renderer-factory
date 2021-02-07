import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit, RendererFactory2
} from '@angular/core';
import {interval, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-nested-counter',
  template: `
    <div>
      <button (click)="changeDetectorRef.detectChanges()">
        Call detectChanges()
      </button>
      app-nested-counter {{ counter }}
    </div>
    <div style="padding-left: 100px;">
      <app-counter></app-counter>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NestedCounterComponent implements OnInit, OnDestroy {

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
