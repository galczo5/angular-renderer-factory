import {Injectable, Renderer2, RendererFactory2, RendererType2} from '@angular/core';
import {DefaultDomRenderer2} from './DefaultDomRenderer';
import {EventManager} from '@angular/platform-browser';

@Injectable()
export class DomRendererFactory2WithLogger implements RendererFactory2 {

  constructor(private readonly eventManager: EventManager) {
  }

  createRenderer(hostElement: any, type: RendererType2 | null): Renderer2 {
    return new DefaultDomRenderer2(this.eventManager);
  }

  end(): void {
    this.checkIfCalledFromDetectChangesAndPrintMessage();
  }

  private checkIfCalledFromDetectChangesAndPrintMessage(): void {
    try {
      throw new Error();
    } catch (e: unknown) {
      const error = e as Error;
      if (error.stack.includes('detectChangesInternal')) {
        console.log('%cdetectChanges called', 'background: red; color: white; padding: 2px 5px;');
      }
    }
  }
}
