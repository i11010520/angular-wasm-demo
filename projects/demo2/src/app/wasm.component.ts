import {
  Component,
  EnvironmentInjector,
  inject,
  Injectable,
  NgZone,
  type OnInit,
  runInInjectionContext,
} from "@angular/core";
import { identity, merge, Observable } from "rxjs";

import * as wasm from "../../../../node_modules/@bitwarden/sdk-internal/bitwarden_wasm_internal_bg.wasm";

@Injectable({ providedIn: "root" })
export class bitclass {
  private item: Observable<any>;

  constructor(private injector: EnvironmentInjector) {
    this.item = runInInjectionContext(
      this.injector,
      () => this.getZoneInjectedObservable(),
    );
  }
  // Function to create the observable within Angular's zone
  private getZoneInjectedObservable = (): Observable<any> => {
    const ngZone = inject(NgZone); // Safe to use `inject()` here
    return merge().pipe(this.runInsideAngular(ngZone));
  };

  // Define the `runInsideAngular` function to use the injected `ngZone`
  private runInsideAngular(ngZone: NgZone) {
    if (ngZone.isStable) {
      console.log("ngzone stable");
      ngZone.onStable.pipe(identity);
    } else {
      console.log("ngzone not stable");
    }
    return (source: Observable<any>) =>
      new Observable((observer) => {
        return source.subscribe({
          next: (value) => ngZone.run(() => observer.next(value)),
          error: (err) => ngZone.run(() => observer.error(err)),
          complete: () => ngZone.run(() => observer.complete()),
        });
      });
  }

  getItem(): Observable<any> {
    return this.item;
  }
}

@Component({
  selector: "wasm-demo",
  template: `
    <p>{{this.p1}}</p>
    <p>{{this.p2}}</p>
  `,
  standalone: true,
})
export class WasmContent implements OnInit {
  constructor(private bit: bitclass) {
    console.log("init:", Object.keys(wasm));
  }

  p1 = "0";
  p2 = "no";
  ngOnInit(): void {
    this.bit.getItem().subscribe({
      next: (value: any) => {
        console.log("Received value:", value);
        this.p1 = value;
      },
      error: (err: any) => {
        console.error("Error:", err);
        this.p2 = err;
      },
      complete: () => {
        console.log("Observable complete");
      },
    });
  }

  //p3 = Object.keys(argon2);
}
