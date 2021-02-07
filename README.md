## Why? 

`ChangeDetectorRef.detectChanges()` calls `RendererFactory2.begin()` method. 
So if we can proxy method we can detect `ChangeDetectorRef.detectChanges()` calls and debug performance problems related to rendering problems.

![giphy](./giphy2.gif)

## Where?

Check two three files:
* `src/app/app.module.ts` - I'm providing my own implementation of `RendererFactory2`. It's nothing new, `BrowserAnimationsModule` works in the same way.
* `src/app/DomRendererFactory2WithLogger.ts` - my proxy. Change detection is called when stack trace contains `detectChangesInternal`. This is original method called in `ViewRef.detectChanges()`. `ViewRef` is the object that you will receive when you inject `ChangeDetectorRef`. 
* `src/app/DefaultDomRenderer2.ts` - copy from angular sources

## Interesting lessons learned

From angular sources:
```
export declare abstract class RendererFactory2 {
    abstract begin?(): void;
    abstract createRenderer(hostElement: any, type: RendererType2 | null): Renderer2;
    abstract end?(): void;
    abstract whenRenderingDone?(): Promise<any>;
}
```

So we can use `whenRenderingDone` to get info when application is ready and visible? No.

```
@Injectable()
export class DomRendererFactory2 implements RendererFactory2 {
  private rendererByCompId = new Map<string, Renderer2>();
  private defaultRenderer: Renderer2;

  constructor(
      private eventManager: EventManager, private sharedStylesHost: DomSharedStylesHost,
      @Inject(APP_ID) private appId: string) {
    this.defaultRenderer = new DefaultDomRenderer2(eventManager);
  }

  createRenderer(element: any, type: RendererType2|null): Renderer2 { ... }

  begin() {}
  end() {}
}
```

`DomRendererFactory2` is default implementation for `PlatformBrowser`. There is no implementation of `whenRenderingDone` :(

`DomRendererFactory2` and `DefaultDomRenderer2` looks like proxy for native `document` global object. Maybe there is way to improve it.

Another interesting object is `EventManager` injected to `DefaultDomRenderer2`. It's another layer hiding native mechanisms of browser. 
It uses values behind `EVENT_MANAGER_PLUGINS` token to recognize and process events. So you can provide your own way of event handling. 

## Ok, what's next?
It's a good place to dig for some new information about angular view creations and rendering.
 
![giphy](./giphy1.gif)
